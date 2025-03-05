import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BidMaster AI - Win More Bids with AI",
  description: "Optimize bidding with BidMaster AI's tender tracking tools. Book your consultation today.",
  keywords: "bid management, tender tracking, AI bidding, B2B solutions, bid optimization, consultation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Add Chart.js for interactive graphs --> */}
        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
        {/* <!-- Calendly integration script --> */}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        <Script id="calendly-inline-styles">
          {`
            window.onload = function() {
              // Add custom styles for Calendly iframe to allow scrolling
              const style = document.createElement('style');
              style.innerHTML = \`
                .calendly-inline-widget { height: 400px; min-height: 400px; overflow-y: auto; }
                @media (max-width: 768px) { .calendly-inline-widget { height: 300px; min-height: 300px; } }
              \`;
              document.head.appendChild(style);
            }
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
