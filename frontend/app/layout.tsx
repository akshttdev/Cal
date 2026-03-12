import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-sans",
  weight: "600",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Cal.com",
    default: "Cal.com - Open Scheduling Infrastructure",
  },
  description: "Open-source scheduling platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={calSans.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}