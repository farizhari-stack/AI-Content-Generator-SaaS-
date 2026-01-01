"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Zap,
    History,
    Settings,
    Menu,
    Sparkles,
    CreditCard,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/dashboard/user-nav";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Generator", href: "/dashboard" },
    { icon: History, label: "History", href: "/dashboard/history" },
    { icon: CreditCard, label: "Billing", href: "/pricing" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar Toggle */}
            <div className="fixed left-4 top-4 z-50 md:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="bg-background shadow-md"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 transform border-r border-border bg-card/50 backdrop-blur-xl transition-transform duration-300 ease-in-out md:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col p-4">
                    {/* Logo Area */}
                    <div className="flex h-16 items-center px-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                VisionCommerce
                            </span>
                        </Link>
                    </div>

                    <Separator className="my-4 opacity-50" />

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1.5 px-2">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Area */}
                    <div className="mt-auto space-y-4 px-2">
                        {/* Credits Card */}
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold text-primary">Pro Plan</span>
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">Active</span>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-muted-foreground">Credits used</span>
                                    <span className="font-medium">3 / 100</span>
                                </div>
                                <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[3%] rounded-full" />
                                </div>
                            </div>
                            <Button variant="secondary" size="sm" className="w-full text-xs h-8" asChild>
                                <Link href="/pricing">Upgrade Plan</Link>
                            </Button>
                        </div>

                        <Separator className="opacity-50" />

                        {/* User Profile */}
                        <UserNav />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 min-h-screen transition-all duration-300">
                {/* Top Header (Mobile mainly, but can be useful for breadcrumbs) */}
                <div className="h-16 border-b border-border/40 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-end px-6 md:hidden">
                    <div className="font-semibold">Dashboard</div>
                </div>

                <div className="p-6 md:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
