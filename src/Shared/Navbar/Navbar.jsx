import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";


const Nav = () => {
  const {user, logout} = useAuth();
  const [isAdmin] = useAdmin();

  const userProfileImg = user?.photoURL || `https://ui-avatars.com/api/?${user?.email}?background=random}`
  
  const handleLogout = () => {
    logout()
  }

  const navItems = (
    <>
      <li>
        <Link to="/" className="" aria-current="page">
          Home
        </Link>
      </li>
      <li>
        <Link to="/" className="">
          All Tests
        </Link>
      </li>
      <li>
        <Link to="" className="">
          Services
        </Link>
      </li>
      <li>
        <Link to="" className="">
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <Navbar className="navbar bg-[#d6f5e3] glass max-w-screen-xl mx-auto border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex flex-row-reverse mr-48 ml-0">
          <Link to="/" className="md:flex md:items-center md:space-x-3 hidden">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="IlmMed Solution Logo"
            />
            <span className="self-center text-2xl font-semibold dark:text-white">
              IlmMed Solution
            </span>
          </Link>

          {/* mobile navItems */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
        </div>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
          {user ? (
            <>
              <div className="flex items-center ml-40 gap-3">
                {/* dashboard button */}
                <Link to={ isAdmin ? "/dashboard/allUsers" : "/dashboard/testResults"}>
                  <button className="btn btn-primary btn-outline btn-sm">
                    Dashboard
                  </button>
                </Link>
                {/* user profile */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
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
              <div className="flex gap-5 ml-20">
                {/* register button */}
                <Link to="/register">
                  <button className="btn btn-primary btn-outline btn-sm">
                    Register
                  </button>
                </Link>

                {/* login button */}
                <Link to="/login">
                  <button className="btn btn-outline btn-primary btn-sm">
                    Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* navItems for lg device */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4  rounded-lg bg-[#d6f5e3] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-[#d6f5e3] md:bg-opacity-30 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems}
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default Nav;
