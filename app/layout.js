export const metadata = {
  title: "ModerateAI - AI Content Moderation for Indian Marketplaces",
  description: "AI-powered content moderation API that understands Hindi, Malayalam, Tamil, Hinglish and Indian cultural context.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
