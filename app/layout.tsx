import "./globals.css";
import Particles from "@/components/Particles";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "AI Fitness Coach",
  description: "Personalized workout and diet plans powered by LLMs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // optional handler for history from sidebar—we will keep it simple: no-op here
  const noOp = () => {};

  return (
    <html lang="en">
      <body>
        {/* particles behind everything */}
        <Particles />

        {/* sidebar (fixed) */}
        <Sidebar/>

        {/* content */}
        <div style={{ marginLeft: 300, position: "relative", zIndex: 10 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
