import { createClient } from "@/lib/supabase/server";

export async function checkCredits() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Unauthorized" };

    const { data: credits } = await supabase
        .from("user_credits")
        .select("credits_remaining")
        .eq("user_id", user.id)
        .single();

    if (!credits || credits.credits_remaining <= 0) {
        return { success: false, error: "Insufficient credits" };
    }

    return { success: true, credits: credits.credits_remaining };
}

export async function deductCredit() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Unauthorized" };

    // RPC or direct update. Direct update for simplicity now, but RPC is safer for concurrency.
    // We'll use a direct decrement for now.

    // First get current credits to be safe
    const { data: credits } = await supabase
        .from("user_credits")
        .select("credits_remaining")
        .eq("user_id", user.id)
        .single();

    if (!credits || credits.credits_remaining <= 0) {
        return { success: false, error: "Insufficient credits" };
    }

    const { error } = await supabase
        .from("user_credits")
        .update({ credits_remaining: credits.credits_remaining - 1 })
        .eq("user_id", user.id);

    if (error) return { success: false, error: error.message };

    return { success: true, remaining: credits.credits_remaining - 1 };
}
