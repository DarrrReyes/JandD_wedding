import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
  Great_Vibes,
} from "next/font/google";
import { Flex, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { theme } from "./config/theme";
import AOSProvider from "./provider/AOSProvider";
import { ReactNode } from "react";

import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "J & D",
  description: "Created By FJD Studio",
};

interface IRootLayout {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body>
        <MantineProvider theme={theme}>
          <Notifications />

          <ModalsProvider>
            <AOSProvider />

            <Flex
              direction="column"
              style={{
                width: "100%",
                minHeight: "100vh",
              }}
            >
              {children}
            </Flex>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
