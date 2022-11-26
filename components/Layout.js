import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
