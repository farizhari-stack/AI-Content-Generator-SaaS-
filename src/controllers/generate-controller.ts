
import { NextResponse } from "next/server";
import { geminiService } from "@/services/gemini-service";
import { ApiResponse, GeneratedContent } from "@/types";

export class GenerateController {
    async generate(req: Request): Promise<NextResponse<ApiResponse<GeneratedContent>>> {
        try {
            const formData = await req.formData();
            const file = formData.get("image") as File;

            if (!file) {
                return NextResponse.json(
                    { success: false, error: "No image provided" },
                    { status: 400 }
                );
            }

            // [NEW] Check credits
            const { checkCredits, deductCredit } = await import("@/services/credit-service");
            const creditCheck = await checkCredits();

            if (!creditCheck.success) {
                const status = creditCheck.error === "Unauthorized" ? 401 : 403;
                return NextResponse.json(
                    { success: false, error: creditCheck.error || "Insufficient credits" },
                    { status }
                );
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Get options
            const tone = (formData.get("tone") as string) || "professional";
            const platform = (formData.get("platform") as string) || "general";

            const result = await geminiService.generateDescription(buffer, file.type, tone, platform);

            // [NEW] Deduct credit on success
            const deduction = await deductCredit();
            if (!deduction.success) {
                console.error("Failed to deduct credit after generation", deduction.error);
                // We still return the result, but log the error. 
                // Ideally we transaction this, but for now this is okay.
            }

            // [NEW] Save to history
            // We need the user ID for this.
            const { createClient } = await import("@/lib/supabase/server");
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                await supabase.from("generations").insert({
                    user_id: user.id,
                    title: result.title,
                    description: result.description,
                    features: result.features
                    // image_url: we are not uploading to storage yet to save time, but normally we would.
                });
            }

            return NextResponse.json({ success: true, data: result, creditsRemaining: deduction.remaining });
        } catch (error) {
            console.error("Controller Error:", error);
            return NextResponse.json(
                { success: false, error: "Internal Server Error" },
                { status: 500 }
            );
        }
    }
}

export const generateController = new GenerateController();
