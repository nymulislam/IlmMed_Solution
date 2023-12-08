import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Sidebar2 from "../Components/Sidebar/Sidebar2";
import useSidebarItems from "../Hooks/useSidebarItems";
import useSidebarItems2 from "../Hooks/useSidebarItems2";
import useAdmin from "../Hooks/useAdmin";
import useUserStatus from "../Hooks/useUserStatus";
import { toast } from "sonner";
import Loading from "../Components/Loading/Loading";
import { Tooltip } from "react-tooltip";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [adminSidebarItems, userSidebarItems] = useSidebarItems();
  const [adminSidebarItems2, userSidebarItems2] = useSidebarItems2();

  const [isAdmin, isAdminLoading] = useAdmin();
  const [isActive, isStatusLoading] = useUserStatus();
  const navigate = useNavigate();


  const sidebarItems = isAdmin
    ? adminSidebarItems
    : isActive
    ? userSidebarItems
    : [];

  const sidebarItems2 = isAdmin
    ? adminSidebarItems2
    : isActive
    ? userSidebarItems2
    : [];

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isAdminLoading && !isStatusLoading && !isAdmin && !isActive) {
      toast.error(
        "Your account is not active. Contact support for assistance.",
        {
          position: "top-right",
          style: {
            fontSize: "1rem",
          },
        }
      );

      navigate("/");
    }
  }, [isAdminLoading, isStatusLoading, isAdmin, isActive, navigate]);

  if (isAdminLoading || isStatusLoading) {
    return <Loading />;
  }

  return (
    <div className="flex bg-[#d6f5e3]">
      {isSidebarOpen ? (
        <>
          {/* Pass the necessary props to SidebarComponent */}
          <Sidebar title="Dashboard" items={sidebarItems} />
        </>
      ) : (
        <Sidebar2 items={sidebarItems2}></Sidebar2>
      )}
      <button onClick={handleToggleSidebar}>
        {isSidebarOpen ? (
          <IoIosArrowBack
            className="text-4xl"
            data-tooltip-id="toggle-tooltip"
            data-tooltip-content="Close Sidebar"
            data-tooltip-place="right"
          />
        ) : (
          <IoIosArrowForward
            className="text-4xl"
            data-tooltip-id="toggle-tooltip"
            data-tooltip-content="Open Sidebar"
            data-tooltip-place="right"
          />
        )}
      </button>
      <div className="flex-1">
        <Outlet />
      </div>
      <Tooltip id="toggle-tooltip" />
    </div>
  );
};

export default Dashboard;
