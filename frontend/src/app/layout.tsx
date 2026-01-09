import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MiniTask - Premium Task Management",
  description: "Organize your life with MiniTask. A premium, secure, and modern task management application for professionals.",
  keywords: ["task management", "productivity", "todo list", "minitask", "nextjs"],
  openGraph: {
    title: "MiniTask - Premium Task Management",
    description: "Organize your life with MiniTask. A premium, secure, and modern task management application for professionals.",
    url: "https://minitask.vercel.app",
    siteName: "MiniTask",
    images: [
      {
        url: "https://via.placeholder.com/1200x630?text=MiniTask", // Replace with actual OG image if available
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniTask - Premium Task Management",
    description: "Organize your life with MiniTask.",
    // images: ["https://via.placeholder.com/1200x630?text=MiniTask"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
