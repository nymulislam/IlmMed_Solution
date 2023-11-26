import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <footer className=" bg-[#d6f5e3] mt-[500px] md:mt-20 overflow-x-hidden">
        <div>
          <footer className="footer footer-center p-10 bg-[#d6f5e3] text-base-content rounded">
            <nav className="grid md:grid-flow-col gap-4 text-xl font-medium">
              <Link to="/" className="link link-hover">Home</Link>
              <Link className="link link-hover">Contact</Link>
              <Link to="/" className="link link-hover">About Us</Link>
              <Link to="/" className="link link-hover">Terms&Policy</Link>
            </nav>
            <nav>
              <div className="grid grid-flow-col gap-4">
                <Link to="/">
                  <FaTwitter className="text-3xl"></FaTwitter>
                </Link>
                <Link to="/">
                  <FaYoutube className="text-3xl"></FaYoutube>
                </Link>
                <Link to="/">
                  <FaFacebook className="text-3xl"></FaFacebook>
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
