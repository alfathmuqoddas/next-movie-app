const Footer = () => {
  return (
    <footer className="container mx-auto py-8">
      <div className="text-center">
        <>Alfath Muqoddas ©{new Date().getFullYear()}</>
        <br />
        API from{" "}
        <a href="https://themoviedb.org" target="_blank" rel="noreferrer">
          TMDB
        </a>
      </div>
    </footer>
  );
};

export default Footer;
