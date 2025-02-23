"use client"; // ضروري لأن `ThemeProvider` يستخدم `useTheme()`

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
