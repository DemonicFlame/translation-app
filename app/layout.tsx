import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Cheap translator",
  description: "Please gib me moneh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <div className="max-w-6xl mx-auto">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
