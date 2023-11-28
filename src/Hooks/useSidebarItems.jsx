import { FaRegCalendar, FaUsers } from "react-icons/fa";
import { LiaFileMedicalAltSolid, LiaFileMedicalSolid } from "react-icons/lia";
import { PiFlagBannerBold } from "react-icons/pi";
import { TbClearAll } from "react-icons/tb";
import { CiMedicalClipboard } from "react-icons/ci";
import { MdOutlineUpcoming } from "react-icons/md";

const useSidebarItems = () => {

    const adminSidebarItems = [
        { label: "All Users", to: "/dashboard/allUsers", icon: <FaUsers />},
        { label: "Add A Test", to: "/dashboard/addATest", icon: <LiaFileMedicalSolid />},
        { label: "All Tests", to: "/dashboard/allTests", icon: <LiaFileMedicalAltSolid /> },
        { label: "Reservation", to: "/dashboard/reservation" , icon: <FaRegCalendar />},
        { label: "Add Banner", to: "/dashboard/addBanner", icon: <PiFlagBannerBold />},
        { label: "All Banners", to: "/dashboard/allBanners", icon: <TbClearAll />},
      ];
    
      const userSidebarItems = [
        { label: "Test Results", to: "/dashboard/testResults", icon: <CiMedicalClipboard /> },
        {
          label: "Upcoming Appointments",
          to: "/dashboard/upcomingAppointments", icon: <MdOutlineUpcoming />
        },
      ];

    return [adminSidebarItems, userSidebarItems]
};

export default useSidebarItems;