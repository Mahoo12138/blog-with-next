import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microfrontends - Docs",
  description: "Example demonstrating vertical microfrontends on Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
