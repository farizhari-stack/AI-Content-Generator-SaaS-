
import { generateController } from "@/controllers/generate-controller";

export async function POST(req: Request) {
    return generateController.generate(req);
}
