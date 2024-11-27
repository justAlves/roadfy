import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IsAuth from "@/components/IsAuth";

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

export const metadata: Metadata = {
  title: 'RoadFy - Planeje sua viagem com IA',
  description: 'Crie roteiros personalizados para sua viagem com IA generativa. Escolha cidade, orçamento e dias para obter um planejamento perfeito.',
  openGraph: {
    title: 'RoadFy - Planeje sua viagem com IA',
    description: 'Transforme seus planos de viagem com inteligência artificial.',
    url: 'https://roadfy.vercel.app',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'Planeje sua viagem com RoadFy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@roadfy',
    title: 'RoadFy - Planeje sua viagem com IA',
    description: 'Crie roteiros personalizados para sua viagem.',
    images: ['/banner.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main
            className="min-h-screen h-auto main-background text-white w-full"
          >
            <IsAuth/>
            <Header/>
            {children}
            <Footer/>
          </main>
        </body>
      </html>
    </SessionWrapper>
  );
}
