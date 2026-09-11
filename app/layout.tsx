import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJTIMEPYRO | Fullstack Developer Portfolio",
  description: "Abhijeet Gupta, a fullstack developer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
