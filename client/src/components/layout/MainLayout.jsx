import Header from "./Header";
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden   ">
        <SideBar />

        <div className="flex-1 overflow-y-scroll ">
          <Header />
          <div className="h-[calc(100vh-96px)] overflow-x-scroll bg-[#21212d] ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
