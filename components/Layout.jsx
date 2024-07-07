import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative">
        <div className="fixed min-w-full z-50">
          <Navbar />
        </div>
        <div className="mx-auto pt-16">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
