import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
    const cookieStore = await cookies();

    return createServerClient(
        "https://whnzulxwaltehzdpbxyc.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indobnp1bHh3YWx0ZWh6ZHBieHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzg4MDQsImV4cCI6MjA4Mjg1NDgwNH0.947pMwC2DgGD7gzfceb6wNAJ4P2gtyy8EwoMSPLktoY",
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
};
