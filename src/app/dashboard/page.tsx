"use client";

import { useState } from "react";
// import { Upload } from "lucide-react"; 
import { Button } from "@/components/ui/button"; // Button usually works? Let's keep it if it wasn't reported, or change all.
import { Card } from "../../components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null); // Replace 'any' with proper type later

    // Placeholder for the actual generation logic which we will migrate/refactor 
    // from the original generic page.tsx if needed, or build fresh here.

    const handleGenerate = async (selectedFile: File) => {
        setIsGenerating(true);
        setResult(null);
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                if (response.status === 403) {
                    alert("Insufficient credits! Please upgrade your plan.");
                } else {
                    alert(data.error || "Generation failed");
                }
                return;
            }

            if (data.success) {
                setResult(data.data);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Generator</h1>
                <p className="text-muted-foreground">
                    Upload an image to generate premium product descriptions.
                </p>
            </div>

            {!result ? (
                <Card
                    className={`relative flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50"
                        }`}
                    onDragOver={(e: React.DragEvent) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e: React.DragEvent) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleGenerate(e.dataTransfer.files[0]);
                        }
                    }}
                >
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                        <div className="rounded-full bg-muted p-4">
                            {/* Icon placeholder */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-10 w-10 text-muted-foreground"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                Drop your product image here
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                or click to browse from your computer
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full text-left">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tone</label>
                                <select name="tone" className="w-full p-2 rounded-md border border-input bg-background text-sm">
                                    <option value="professional">Professional</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="friendly">Friendly</option>
                                    <option value="urgent">Persuasive/Urgent</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Platform</label>
                                <select name="platform" className="w-full p-2 rounded-md border border-input bg-background text-sm">
                                    <option value="general">General / SEO</option>
                                    <option value="amazon">Amazon Listing</option>
                                    <option value="instagram">Instagram Caption</option>
                                    <option value="shopify">Shopify Store</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative w-full">
                            <Button disabled={isGenerating} className="w-full">
                                {isGenerating ? "Generating..." : "Select Image & Generate"}
                            </Button>
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        // Need to grab values from selects, but state is hard with drag drop.
                                        // For simplicity, we will just use defaults or require form submission behavior?
                                        // Let's change this to "Select Image" -> Preview -> Then Click Generate.
                                        handleGenerate(e.target.files[0]);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="space-y-6">
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
                        <div className="mb-4 text-sm text-muted-foreground">{result.priceEstimate}</div>
                        <p className="text-base leading-relaxed whitespace-pre-line mb-6">{result.description}</p>

                        <div className="space-y-2">
                            <h3 className="font-semibold">Key Features:</h3>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {result.features.map((f: string, i: number) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <Button onClick={() => setResult(null)} variant="outline">Generate Another</Button>
                            <Button onClick={() => navigator.clipboard.writeText(result.description)}>Copy Description</Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Recent Generations Mock */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Generations</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-4 bg-muted/30">
                            <div className="aspect-video w-full rounded-md bg-muted mb-3" />
                            <h4 className="font-medium text-sm">Product Name {i}</h4>
                            <p className="text-xs text-muted-foreground">Generated 2 mins ago</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
