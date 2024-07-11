import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AutoGuardian",
  description:
    "AutoGuardian is a solution to enhance the customer's vehicle ownership experience by predicting vehicle maintenance beforehand and notifying the same to the customer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
