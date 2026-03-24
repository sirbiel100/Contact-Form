import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const metadata: Metadata = {
  title: "Contact Form | GC",
  description: "'Contact Form' solution made by Gabriel Crispim and challenged by 'Frontend Mentor'!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${karla.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
