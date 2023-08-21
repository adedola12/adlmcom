import "../globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Buttombar from "@/components/shared/Buttombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Threads App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <Topbar />

            <main className="flex flex-row">
              <LeftSidebar />

              <section className="main-container">
                <div className="w-full max-w-4xl">{children}</div>
              </section>

              <RightSidebar />
            </main>
            <Buttombar />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}