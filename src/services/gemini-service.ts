
import { model } from "@/lib/gemini";
import { GeneratedContent } from "@/types";

export class GeminiService {
    /**
     * Generates product description from an image.
     * @param imageParts - Array of image parts (inline data).
     * @param mimeType - Mime type of the image.
     */
    async generateDescription(imageBuffer: Buffer, mimeType: string, tone: string = "professional", platform: string = "general"): Promise<GeneratedContent> {
        const prompt = `
            Analyze this product image and generate a high-converting e-commerce description.
            
            Settings:
            - Tone: ${tone}
            - Platform: ${platform}

            Return ONLY a JSON object with this exact schema:
            {
                "title": "SEO optimized product title",
                "priceEstimate": "Estimated price range (e.g., $50 - $80)",
                "description": "Engaging product description (2-3 paragraphs) suitable for ${platform} in ${tone} tone.",
                "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
                "tags": ["tag1", "tag2", "tag3", "tag4"]
            }
        `;

        const imagePart = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType,
            },
        };

        try {
            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            const text = response.text();

            // Clean up markdown if Gemini returns it despite instructions
            const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

            return JSON.parse(cleanText) as GeneratedContent;
        } catch (error) {
            console.error("Gemini Generation Error:", error);
            throw new Error("Failed to generate content from AI.");
        }
    }
}

export const geminiService = new GeminiService();
