import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

export default function DashboardWraper() {
  const { activeMenu } = useStateContext();
  return (
    <>
     <div className="flex relative dark:bg-main-dark-bg">
     
     <div className={`${activeMenu? "w-72": "w-0"} fixed sidebar bg-white transition-all duration-300`}>
      <Sidebar />
    </div>

      <div
        className={
          activeMenu
            ? "bg-main-bg min-h-screen md:ml-72 w-full  "
            : "bg-main-bg w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-main-bg  navbar w-full ">
          <Navbar />
        </div>

        <Outlet />
      </div>
      </div>
    </>
  );
}
