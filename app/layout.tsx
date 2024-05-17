import Navigation from "@/components/global/Navigation";
import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
import Head from "next/head";
=======
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import NavigationBeforeAuth from "@/components/global/NavigationBeforeAuth";
>>>>>>> signin-frontend_anthony

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
<<<<<<< HEAD
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
=======
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <header>
                        <SignedOut>
                            <NavigationBeforeAuth />
                        </SignedOut>
                    </header>
                    <SignedIn>
                        <Navigation />
                        <UserButton />
                    </SignedIn>
                    <main>{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
>>>>>>> signin-frontend_anthony
}
