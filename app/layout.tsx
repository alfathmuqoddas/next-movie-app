import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

export const metadata = {
  title: "ALEFAST",
  description:
    "Alefast Discover the latest trending movies and TV series. Get information, reviews, and recommendations on the hottest entertainment.",
  keywords:
    "trending movies, trending TV series, latest movies, popular TV shows, movie reviews, TV series recommendations, entertainment news",
  image: "https://alefast.vercel.app/images/alefast-logo.png",
};

const Layout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="mx-auto pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
