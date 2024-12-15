import "./globals.css";
import BlogHeader from "./components/BlogHeader";
import { pageTitle } from "./lib/const";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: pageTitle,
  description: "Manus Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BlogHeader />
        <SessionProvider>
          <ThemeProvider
            themes={["travel", "photography", "music", "other", "food", "computer", "robotics"]}
            defaultTheme="other"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
