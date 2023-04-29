import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className={`relative min-h-screen`}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
