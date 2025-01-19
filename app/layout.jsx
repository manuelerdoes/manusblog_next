import "./globals.css";
import BlogHeader from "./components/BlogHeader";
import { description, pageTitle } from "./lib/const";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: pageTitle,
  description: description,
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
