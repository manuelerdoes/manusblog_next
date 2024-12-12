import "./globals.css";
import BlogHeader from "./components/BlogHeader";
import { pageTitle } from "./lib/const";
import { SessionProvider } from "next-auth/react";

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
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
