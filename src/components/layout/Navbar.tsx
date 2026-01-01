"use client";

import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            VisionCommerce
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                        Features
                    </Link>
                    <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                        Pricing
                    </Link>
                    <Link href="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
                        Demo
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    {user ? (
                        <Button asChild variant="default" className="rounded-full">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium hover:text-primary">
                                Log in
                            </Link>
                            <Button asChild variant="default" className="rounded-full">
                                <Link href="/login">Get Started</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-border p-4 space-y-4 bg-background">
                    <Link href="/#features" className="block text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
                        Features
                    </Link>
                    <Link href="/pricing" className="block text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
                        Pricing
                    </Link>
                    <Link href="/demo" className="block text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
                        Demo
                    </Link>
                    <div className="pt-4 flex items-center justify-between border-t border-border mt-4">
                        <ThemeToggle />
                        {user ? (
                            <Button asChild variant="default" size="sm">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <Button asChild variant="default" size="sm">
                                <Link href="/login">Get Started</Link>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
