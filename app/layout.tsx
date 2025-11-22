import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "AI Fitness Coach",
  description: "Personalized AI fitness assistant",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
