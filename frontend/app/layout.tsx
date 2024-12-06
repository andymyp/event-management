import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

import "./globals.css";
import ReduxProvider from "@/components/providers/redux-provider";
import LoadingBar from "@/components/customs/loading-bar";
import { Toaster } from "@/components/ui/toaster";

export async function generateMetadata() {
  return {
    title: "Event Management",
    description: "Event Management App by github.com/andymyp",
  };
}

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <ReduxProvider>
          <LoadingBar />
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
