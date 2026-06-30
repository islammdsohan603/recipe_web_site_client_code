import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recipe Website - Discover Delicious Recipes",
  description: "Find the best recipes for every occasion. Discover delicious and easy to make recipes.",
  keywords: ["recipes", "food", "cooking", "delicious", "healthy"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastContainer />
          <div> <Navbar /></div>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}