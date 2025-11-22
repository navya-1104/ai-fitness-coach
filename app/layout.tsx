export const metadata = {
  title: "AI Fitness Coach",
  description: "Personalized AI Powered Plans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
