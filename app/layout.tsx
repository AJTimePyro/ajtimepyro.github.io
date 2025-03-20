import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "AJTimePyro | Portfolio",
  description: "Portfolio of AJTimePyro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider defaultTheme="dark" forcedTheme="dark">
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
