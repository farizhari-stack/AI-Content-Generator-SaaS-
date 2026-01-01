"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DemoPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8">
            <div className="max-w-3xl space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Experience the Power of AI
                </h1>
                <p className="text-xl text-muted-foreground">
                    Try our interactive demo to see how VisionCommerce transforms your product images into converting copy.
                </p>
            </div>

            <div className="w-full max-w-4xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden aspect-video relative group">
                {/* Mock Interface or Video placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-muted/30 group-hover:bg-muted/20 transition-colors">
                    <div className="text-center p-8 bg-background/80 backdrop-blur-sm rounded-xl border border-border shadow-lg">
                        <p className="font-semibold text-lg mb-4">Interactive Demo Loading...</p>
                        <div className="animate-pulse space-y-2">
                            <div className="h-2 bg-muted rounded w-48 mx-auto"></div>
                            <div className="h-2 bg-muted rounded w-32 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8">
                    <Link href="/login">
                        Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8">
                    <Link href="/pricing">
                        View Pricing
                    </Link>
                </Button>
            </div>
        </div>
    );
}
