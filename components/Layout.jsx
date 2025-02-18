import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <Navbar />
        <main className="mx-auto pt-16">{children}</main>
      </>
      <Footer />
    </>
  );
};

export default Layout;
