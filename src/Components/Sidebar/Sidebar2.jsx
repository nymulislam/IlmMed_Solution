import { NavLink } from "react-router-dom";
import { RiHome8Line } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { CgProfile } from "react-icons/cg";

const Sidebar2 = ({ items }) => {
  return (
    <div className="w-24 p-2 min-h-screen bg-[#2ecc70]">
      <ul className="menu text-lg font-semibold">
        {items.map((item, index) => (
          <li key={index}>
            <NavLink 
            to={item.to}
            data-tooltip-id="home-tooltip"            data-tooltip-content={item.tooltip}
            data-tooltip-place="right"
            >
              {item.label}
            </NavLink>
          </li>
        ))}

        <div className="divider mb-2 mt-7"></div>
        <li>
          <NavLink
            to="/"
            data-tooltip-id="home-tooltip"
            data-tooltip-content="Home"
            data-tooltip-place="right"
          >
            <RiHome8Line className="text-4xl" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            data-tooltip-id="home-tooltip"
            data-tooltip-content="My Profile"
            data-tooltip-place="right"
          >
            <CgProfile className="text-4xl" />
          </NavLink>
        </li>
      </ul>

      <Tooltip id="home-tooltip" />
    </div>
  );
};

export default Sidebar2;
