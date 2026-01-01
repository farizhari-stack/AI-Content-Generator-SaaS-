import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
    // Hardcoded credentials to bypass environment variable loading issues
    const url = "https://whnzulxwaltehzdpbxyc.supabase.co";
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indobnp1bHh3YWx0ZWh6ZHBieHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzg4MDQsImV4cCI6MjA4Mjg1NDgwNH0.947pMwC2DgGD7gzfceb6wNAJ4P2gtyy8EwoMSPLktoY";

    if (!url || !key) {
        console.error("Supabase URL or Key missing!");
        return createBrowserClient(
            "https://placeholder.supabase.co",
            "placeholder-key"
        );
    }

    return createBrowserClient(url, key);
};
