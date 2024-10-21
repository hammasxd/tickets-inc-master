
import localFont from "next/font/local";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { NextUIProvider } from "@nextui-org/react";
export const thirdWebClient = createThirdwebClient({ clientId: 'f76f50283af21db4ef0e6eec33b378eb' });
import Header from "./Header";
import { createThirdwebClient } from "thirdweb";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen dark bg-background font-sans antialiased`}
      >
         <NextUIProvider>
         <ThirdwebProvider>
        <div className="relative flex flex-col pb-10">
				<Header />
				<main className="relative">
					<div className="bg-radial-red w-full blur-3xl max-w-[500px] h-[500px] absolute top-0 left-12 opacity-50"></div>
					<div className="bg-radial-yellow w-full blur-3xl max-w-[500px] h-[500px] absolute top-4 left-0 right-0 mx-auto opacity-50"></div>
					<div className="bg-radial-green w-full blur-3xl max-w-[500px] h-[500px] absolute top-0 right-12 opacity-50"></div>
					<div className="container mx-auto max-w-7xl px-6 relative">
						{children}
					</div>
				</main>
			</div>
        </ThirdwebProvider>
        </NextUIProvider>
      </body>
     
    </html>
  );
}
