"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Card } from "../../../components/ui/card";
import { Loader2, Calendar } from "lucide-react";

export default function HistoryPage() {
    const [generations, setGenerations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchHistory = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from("generations")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching history:", error);
            } else {
                setGenerations(data || []);
            }
            setLoading(false);
        };

        fetchHistory();
    }, [supabase]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">History</h1>
                <p className="text-muted-foreground">
                    View your past generated descriptions.
                </p>
            </div>

            {generations.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed text-center">
                    <h3 className="mb-2 text-lg font-semibold">No history found</h3>
                    <p className="text-sm text-muted-foreground">
                        You haven't generated any descriptions yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {generations.map((item) => (
                        <Card key={item.id} className="flex flex-col overflow-hidden">
                            <div className="aspect-video w-full bg-muted/50 p-4 flex items-center justify-center text-muted-foreground text-sm">
                                {/* Image placeholder or fetch from storage if we had it */}
                                Product Image
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="mb-4 text-xs text-muted-foreground line-clamp-3">
                                    {item.description}
                                </p>
                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {item.features?.slice(0, 2).map((f: string, i: number) => (
                                            <span key={i} className="bg-secondary px-2 py-0.5 rounded text-[10px] text-secondary-foreground">
                                                {f.substring(0, 20)}...
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
