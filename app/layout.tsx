import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { ReactNode } from "react";

export const generateMetadata = ({ children }: { children: ReactNode }) => {
  return {
    title: "ALEFAST",
    description: "Movie and TV App",
    openGraph: {
      title: "ALEFAST",
      description: "Movie and TV App",
      images: [
        {
          url: "https://alefast.vercel.app/favicon.ico",
          width: 342,
          height: 513,
          alt: "ALEFAST",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ALEFAST",
      description: "Movie and TV App",
      images: [
        {
          url: "https://alefast.vercel.app/favicon.ico",
          width: 342,
          height: 513,
          alt: "ALEFAST",
        },
      ],
    },
  };
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="mx-auto py-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
