import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import { useState } from "react";

const Nav = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const userProfileImg =
    user?.photoURL

  const handleLogout = () => {
    logout();
  };

  const navItems = (
    <>
      <li>
        <Link
          to="/"
          className="text-lg hover:text-[#354a5f] text-gray-500"
          aria-current="page"
        >
          Home
        </Link>
      </li>
      <li className="text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5 current-fill"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </li>
      <li>
        <Link to="/allTestsPage" className="text-lg text-gray-500 hover:text-[#354a5f]">
          All Tests
        </Link>
      </li>
      <li className="text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5 current-fill"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </li>
      <li>
        <Link to="/blogs" className="text-lg text-gray-500 hover:text-[#354a5f]">
          Blogs
        </Link>
      </li>
      <li className="text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5 current-fill"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </li>
      <li>
        <Link to="/pricing" className="text-lg text-gray-500 hover:text-[#354a5f]">
          Pricing
        </Link>
      </li>
    </>
  );

  return (
    <>
      {/* start nav */}
      <div className="">
        <nav className="relative px-4 py-4 flex shadow-xl justify-between items-center bg-[#d6f5e3]">
          <Link className="text-3xl font-bold leading-none py-2" to="/">
            <h2 className="bg-gradient-to-r from-[#2ecc70] to-[#3398db] bg-clip-text text-transparent">
              IlmMed Solution
            </h2>
          </Link>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="navbar-burger flex items-center text-[#3398db] p-3"
            >
              <svg
                className="block h-6 w-6 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
            {navItems}
          </ul>

          {/* conditionally show button start*/}

          {user ? (
            <>
              <div className="lg:flex items-center ml-40 gap-3 hidden">
                {/* dashboard button */}
                <Link
                  to={
                    isAdmin ? "/dashboard/allUsers" : "/dashboard/testResults"
                  }
                >
                  <button className="btn btn-outline text-[#354a5f] btn-sm hover:bg-gradient-to-r from-[#2ecc70] to-[#3398db] border-[#2ecc70] hover:border-[#3398db]">
                    Dashboard
                  </button>
                </Link>
                {/* user profile */}
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="avatar">
                    <div className="w-16 hover:border rounded-full cursor-pointer">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={userProfileImg}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <div className="px-4">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user.displayName}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                    <div className="divider"></div>
                    <li>
                      <Link
                        to="/dashboard/myProfile"
                        className="justify-between"
                      >
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <Link>Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="hidden lg:flex gap-5 ml-20">
                {/* register button */}
                <Link to="/register" className="hidden lg:inline-block ">
                  <button className="btn btn-primary btn-sm bg-gradient-to-r from-[#2ecc70] to-[#3398db] border-[#2ecc70] text-white hover:border-[#3398db]">
                    Register
                  </button>
                </Link>

                {/* login button */}
                <Link
                  to="/login"
                  className="hidden lg:inline-block lg:ml-auto lg:mr-3"
                >
                  <button className="btn btn-outline text-[#354a5f] btn-sm hover:bg-gradient-to-r from-[#2ecc70] to-[#3398db] border-[#2ecc70] hover:border-[#3398db]">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}

          {/* conditionally show button end*/}
        </nav>
        <div
          className={`navbar-menu relative z-50 ${isMenuOpen ? "" : "hidden"}`}
        >
          <div
            onClick={closeMenu}
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <a
                className="mr-auto text-2xl py-3 bg-gradient-to-r from-[#2ecc70] to-[#3398db] bg-clip-text text-transparent font-bold leading-none"
                href="#"
              >
                IlmMed Solution
              </a>
              <button onClick={closeMenu} className="navbar-close">
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <Link
                    to="/"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-[#d6f5e3] hover:text-[#3398db] rounded"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/allTestsPage"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-[#d6f5e3] hover:text-[#3398db] rounded"
                  >
                    All Tests
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/blogs"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-[#d6f5e3] hover:text-[#3398db] rounded"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/pricing"
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-[#d6f5e3] hover:text-[#3398db] rounded"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              {/* conditionally showing button start */}
              {user ? (
                <>
                  <div className="flex items-center flex-col-reverse gap-3">
                    {/* dashboard button */}
                    <Link
                      to={
                        isAdmin
                          ? "/dashboard/allUsers"
                          : "/dashboard/testResults"
                      }
                    >
                      <button className="btn btn-outline text-[#354a5f] btn-sm hover:bg-gradient-to-r from-[#2ecc70] to-[#3398db] border-[#2ecc70] hover:border-[#3398db] px-20 text-lg">
                        Dashboard
                      </button>
                    </Link>
                    {/* user profile */}
                    <div className="dropdown dropdown-top">
                      <label tabIndex={0} className="avatar">
                        <div className="bg-red-500 w-24 hover:border rounded-full cursor-pointer">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src={userProfileImg}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                      >
                        <div className="px-4">
                          <span className="block text-sm text-gray-900 dark:text-white">
                            {user.displayName}
                          </span>
                          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                            {user.email}
                          </span>
                        </div>
                        <div className="divider"></div>
                        <li>
                          <Link
                            to="/dashboard/myProfile"
                            className="justify-between"
                          >
                            Profile
                            <span className="badge">New</span>
                          </Link>
                        </li>
                        <li onClick={handleLogout}>
                          <Link>Logout</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    {/* register button */}
                    <Link
                      to="/register"
                      className="block mb-2 leading-loose text-xs text-center "
                    >
                      <button className="btn btn-primary btn-sm bg-gradient-to-r from-[#2ecc70] to-[#3398db] border-[#2ecc70] text-white hover:border-[#3398db] px-20">
                        Register
                      </button>
                    </Link>

                    {/* login button */}
                    <Link
                      to="/login"
                      className="block py-3 mb-3 text-xs text-center font-semibold leading-none"
                    >
                      <button className="btn btn-outline text-[#354a5f] btn-sm hover:bg-gradient-to-r from-[#2ecc70] to-[#3398db] border-[#2ecc70] hover:border-[#3398db] px-20">
                        Login
                      </button>
                    </Link>
                  </div>
                </>
              )}

              {/* conditionally showing button end */}

              <p className="my-4 text-xs text-center text-gray-400">
                <span>© {currentYear} IlmMed Solution</span>
              </p>
            </div>
          </nav>
        </div>
      </div>
      {/* end nav */}
    </>
  );
};

export default Nav;
