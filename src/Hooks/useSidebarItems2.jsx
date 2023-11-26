import { FaRegCalendar, FaUsers } from "react-icons/fa";
import { LiaFileMedicalAltSolid, LiaFileMedicalSolid } from "react-icons/lia";
import { PiFlagBannerBold } from "react-icons/pi";
import { TbClearAll } from "react-icons/tb";
import { CiMedicalClipboard } from "react-icons/ci";
import { MdOutlineUpcoming } from "react-icons/md";


const useSidebarItems2 = () => {
  const adminSidebarItems2 = [
    {
      label: <FaUsers className="text-3xl" />,
      to: "/dashboard/allUsers",
      tooltip: "All Users",
    },
    {
      label: <LiaFileMedicalSolid className="text-4xl" />,
      to: "/dashboard/addATest",
      tooltip: "Add A Test",
    },
    {
      label: <LiaFileMedicalAltSolid className="text-4xl" />,
      to: "/dashboard/allTests",
      tooltip: "All Tests",
    },
    {
      label: <FaRegCalendar className="text-3xl" />,
      to: "/dashboard/reservation",
      tooltip: "Reservation",
    },
    {
      label: <PiFlagBannerBold className="text-4xl" />,
      to: "/dashboard/addBanner",
      tooltip: "Add Banner",
    },
    {
      label: <TbClearAll className="text-4xl" />,
      to: "/dashboard/allBanners",
      tooltip: "All Banners",
    },
  ];

  const userSidebarItems2 = [
    { label: <CiMedicalClipboard className="text-4xl" />, to: "/dashboard/testResults" },
    {
      label: <MdOutlineUpcoming className="text-4xl" />,
      to: "/dashboard/upcomingAppointments",
    },
  ];
  return [adminSidebarItems2, userSidebarItems2];
};

export default useSidebarItems2;
