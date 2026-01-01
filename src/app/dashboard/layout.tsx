"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Zap,
    History,
    Settings,
    LogOut,
    Menu,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Generator", href: "/dashboard" },
    { icon: History, label: "History", href: "/dashboard/history" },
    { icon: Zap, label: "Pricing", href: "/pricing" }, // Pricing is public but accessible from here
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Mobile Sidebar Toggle */}
            <div className="fixed left-4 top-4 z-50 md:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform duration-200 ease-in-out md:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center justify-center border-b border-border">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            VisionCommerce
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-1 p-4">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-border">
                        <div className="mb-4 px-3 py-2 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground font-medium uppercase mb-2">Credits</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold">3 Free</span>
                                <Link href="/pricing" className="text-xs text-primary hover:underline">Upgrade</Link>
                            </div>
                            {/* Progress bar mock */}
                            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-3/5 rounded-full" />
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                            onClick={handleSignOut}
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 px-4 py-8 md:ml-64 md:p-8">
                <div className="mx-auto max-w-6xl">{children}</div>
            </main>
        </div>
    );
}
