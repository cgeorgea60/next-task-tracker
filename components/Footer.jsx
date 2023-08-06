import  Link  from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright &copy; 2023</p>
      <Link href="/about">About</Link>
    </footer>
  );
};

export default Footer;
