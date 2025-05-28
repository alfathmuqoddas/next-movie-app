import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { ReactNode } from "react";

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
