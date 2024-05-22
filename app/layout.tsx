import type { Metadata } from "next";
import Navigation from "@/components/global/Navigation";
import NavigationFooter from "@/components/global/NavigationFooter";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head";
import NavigationBeforeAuth from "@/components/global/NavigationBeforeAuth";

export const metadata: Metadata = {
  title: {
    template: "%s | My Body Buddy",
    default: "My Body Buddy",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/favicon.ico" />
        <body>
          <header>
            <SignedOut>
              <NavigationBeforeAuth />
            </SignedOut>
            <SignedIn>
              <Navigation />
              <UserButton />
            </SignedIn>
          </header>

          <main>{children}</main>

          <footer>
            <NavigationFooter />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
