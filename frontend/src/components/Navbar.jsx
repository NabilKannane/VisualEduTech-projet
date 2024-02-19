import React, { useEffect } from "react";
import { AiOutlinePoweroff, AiOutlineMenu } from "react-icons/ai";
import { useNavigate , useLocation } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {

  const navigate = useNavigate();

  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  if (location.pathname !== "/login") {
    return (
      <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <div className="flex">
          <NavButton
             customFunc={()=>{
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              // sessionStorage.clear();
              navigate("/login", { replace: true });
            }}

            title="Logout"
            dotColor="red"
            color="black"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          }
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
