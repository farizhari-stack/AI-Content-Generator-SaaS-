"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// We can't use ComponentProps because of mismatch in types in some versions, 
// so we define a simpler interface or use any if needed, but let's try strict.
// Actually, next-themes provider props are standard.

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
