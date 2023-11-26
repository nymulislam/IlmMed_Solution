
import { useState } from "react"; // If you need state

const Test = () => {
  const [sidebarWidth, setSidebarWidth] = useState("16rem");
  const [mainContentMargin, setMainContentMargin] = useState("16rem");
  const [sidebarClass, setSidebarClass] = useState("text-left px-6");

  const expandSidebar = () => {
    if (sidebarWidth === "16rem") {
      setSidebarWidth("4rem");
      setMainContentMargin("4rem");
      setSidebarClass("text-center px-0");
    } else {
      setSidebarWidth("16rem");
      setMainContentMargin("16rem");
      setSidebarClass("text-left px-6");
    }
  };

  const highlightSidebarItem = (element) => {
    const buttons = document.querySelectorAll("#sidebar button");
    buttons.forEach((btn) => {
      btn.classList.remove(
        "bg-gradient-to-r",
        "from-cyan-400",
        "to-cyan-500",
        "text-white",
        "w-48",
        "ml-0"
      );
      btn.firstChild.nextSibling.classList.remove("text-white");
    });
    element.classList.add(
      "bg-gradient-to-r",
      "from-cyan-400",
      "to-cyan-500",
      "w-56",
      "h-10",
      "ml-0"
    );
    element.firstChild.nextSibling.classList.add("text-white");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-300">
        <div className="flex justify-between items-center px-6">
          {/* Menu Icon (cyan) */}
          <button id="menu-button" onClick={expandSidebar}>
            <i className="fas fa-bars text-cyan-500 text-lg"></i>
          </button>
          {/* Logo (centered) */}
          <div className="mx-auto">
            <img
              src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
              alt="logo"
              className="h-20 w-28"
            />
          </div>
          {/* Notification and Profile Icons */}
          <div className="space-x-4">
            <button>
              <i className="fas fa-bell text-cyan-500 text-lg"></i>
            </button>
            {/* Profile Button */}
            <button>
              <i className="fas fa-user text-cyan-500 text-lg"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`w-28 bg-white h-screen fixed rounded-none border-none transition-all duration-200 ease-in-out overflow-hidden ${sidebarClass}`}
      >
        {/* Items */}
        <div className="p-2 space-y-4">
          {/* Home */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={() => highlightSidebarItem(this)}
          >
            <i className="fas fa-home text-lg"></i>
            <span className="font-medium transition-all duration-200 opacity-0">
              Home
            </span>
          </button>

          {/* Authorizations */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={() => highlightSidebarItem(this)}
          >
            <i className="fas fa-check-circle"></i>
            <span className="font-medium transition-all duration-200 opacity-0">
              Authorizations
            </span>
          </button>

          {/* Users */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={() => highlightSidebarItem(this)}
          >
            <i className="fas fa-users"></i>
            <span className="font-medium transition-all duration-200 opacity-0">
              Users
            </span>
          </button>

          {/* Businesses */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={() => highlightSidebarItem(this)}
          >
            <i className="fas fa-store"></i>
            <span className="font-medium transition-all duration-200 opacity-0">
              Businesses
            </span>
          </button>

          {/* Transactions */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={() => highlightSidebarItem(this)}
          >
            <i className="fas fa-exchange-alt"></i>
            <span className="font-medium transition-all duration-200 opacity-0">
              Transactions
            </span>
          </button>

          {/* Log Out */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={() => highlightSidebarItem(this)}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span className="font-medium transition-all duration-200 opacity-0">
              Log Out
            </span>
          </button>
        </div>
      </div>

      {/* Gray Container Next to Sidebar */}
      <div
        className={`ml-16 bg-gray-100 h-screen fixed w-full lg:w-3/4 transition-all duration-200 ease-in-out ${mainContentMargin}`}
      >
        {/* Search with Icon */}
        <div className="flex items-center w-full mt-2 p-4">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-search text-gray-200"></i>
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full text-sm placeholder-gray-400"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Container for the 4 sections */}
        <div className="grid grid-cols-2 gap-4 mt-2 p-4">
          {/* Section 1 - Users Chart */}
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">Users</h2>
            <div
              className="chart-container"
              style={{ position: "relative", height: "200px", width: "200px" }}
            >
              {/* Canvas for the chart */}
              <canvas id="usersChart"></canvas>
            </div>
          </div>

          {/* Section 2 - Businesses Chart */}
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Businesses
            </h2>
            <div
              className="chart-container"
              style={{ position: "relative", height: "200px", width: "200px" }}
            >
              {/* Canvas for the chart */}
              <canvas id="commercesChart"></canvas>
            </div>
          </div>

          {/* Section 3 - Table of Pending Authorizations */}
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Pending Authorizations
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Photo
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Name
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="rounded-full h-10 w-10"
                    />
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    Juan Pérez
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">
                    Administrator
                  </td>
                </tr>
                {/* Add more rows here like the above for each pending authorization */}
              </tbody>
            </table>
          </div>

          {/* Section 4 - Table of Transactions */}
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Transactions
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Name
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Date
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    Carlos Sánchez
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    27/07/2023
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">
                    $1500
                  </td>
                </tr>
                {/* Add more rows here like the above for each transaction */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
