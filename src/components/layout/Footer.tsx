"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-card">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            VisionCommerce
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Empowering e-commerce with AI-driven content generation.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/#features">Features</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/demo">Demo</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#">Privacy Policy</Link></li>
                            <li><Link href="#">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Settings</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 border border-border rounded-md w-fit cursor-pointer hover:bg-muted">
                            <Globe className="h-4 w-4" />
                            <span>English (US)</span>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} VisionCommerce AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
