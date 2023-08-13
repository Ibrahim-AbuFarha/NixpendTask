import React, { useState } from "react";
import { NavLink } from "react-router-dom";
function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const links = [
    { name: "PlatForm Launch", link: "/" },
    { name: "Marketing Plan", link: "/marketingPlan" },
  ];
  return (
    <>
      <aside
        className={`
      ${isOpen ? "w-[260px]" : "hidden"}
        bg-[#2c2c38] border-r-2 border-gray-700  overflow-y-hidden pt-20  shrink-0 max-sm:hidden`}
      >
        <h3 className="text-gray-400 px-8 py-3">All BOARDS (1)</h3>
        <ul className="flex flex-col gap-3 text-gray-400">
          {links.map((item) => {
            return (
              <NavLink
                to={item.link}
                key={item.name}
                className={({ isActive }) => (isActive ? " text-white font-bold " : "")}
              >
                <li className=" w-[240px] px-8 py-3 hover:bg-[#645fc5]  rounded-r-full hover:text-white ">
                  <i className="fa-brands fa-trello mr-2"></i> {item.name}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </aside>
      {isOpen ? (
        <button
          className="text-gray-400  absolute max-sm:hidden bottom-10 left-4 hover:text-[#645fc5]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fa-regular fa-eye-slash"></i> Hide Sidebar
        </button>
      ) : (
        <button
          className="text-white bg-[#645fc5] rounded-r-xl max-sm:hidden  absolute bottom-20 left-0 w-24"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i class="fa-regular fa-eye-slash"></i>
        </button>
      )}
    </>
  );
}

export default SideBar;
