import { FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <footer className=" bg-[#d6f5e3] shadow-xl mt-0 md:mt-20 overflow-x-hidden">
        <div className="divider"></div>
        <div>
          <footer className="footer footer-center p-10 bg-[#d6f5e3] text-base-content rounded">
            <nav className="grid md:grid-flow-col gap-4 text-xl font-medium">
              <Link to="/" className="link link-hover">
                Home
              </Link>
              <Link to="/" className="link link-hover">Contact</Link>
              <Link to="/" className="link link-hover">
                About Us
              </Link>
            </nav>
            <nav>
              <div className="grid grid-flow-col gap-4">
                <Link to="/">
                  <FaFacebook className="text-3xl"></FaFacebook>
                </Link>
                <Link to="https://www.linkedin.com/in/nymulislam/" target="_black">
                  <FaLinkedinIn className="text-3xl"></FaLinkedinIn>
                </Link>
                <Link to="/">
                  <FaYoutube className="text-3xl"></FaYoutube>
                </Link>
              </div>
            </nav>
            <aside>
              <p className="md:text-lg">
                &copy; {currentYear} <Link to="/">IlmMed Solution.</Link> All
                Rights Reserved.{""}
              </p>
            </aside>
          </footer>
        </div>
      </footer>
    </>
  );
};

export default Footer;
