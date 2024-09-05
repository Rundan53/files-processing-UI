import { InviteModal } from "@/common/InviteModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../config/default.json";
import barcadly from "./../assets/barcadly_no_bg.png";
import darkBarcadly from "./../assets/dark.png";
import { ToggleBtn } from "./themeProvider/ToggleBtn";
import { Button } from "./ui/button";
import { useGetUserDataQuery } from "@/store/apiSlice/authApi";
import { showToastMessage } from "@/utils/showToastNavigate";
import { navElements } from "@/constants";
import NavMenu from "./NavMenu";


function Header({ path, handleActiveElement, activeElement, handleImageUpload, imageUploadRef, setIsNavMenuUp, isNavMenuUp}) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUserDataQuery("check-auth");
  const user = data?.data?.user;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursString = hours.toString().padStart(2, "0");

      const day = now.toLocaleString("en", { weekday: "short" });
      const month = now.toLocaleString("en", { month: "short" });
      const date = now.getDate();
      const year = now.getFullYear();

      setCurrentTime(`${hoursString}:${minutes} ${ampm}`);
      setCurrentDate(`${day}, ${date} ${month} ${year}`);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = async () => {
    const response = await axios.post(
      `${config.API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    showToastMessage(response?.data, navigate, "/");
    localStorage.clear()
  };

  const handleChangeRole = (value) => {
    switch (value) {
      case "GRAPHIC_DESIGNER":
        navigate("/gd/newTemplates");
        break;
      case "VIDEO_EDITOR":
        navigate("/vd/newTemplates");
        break;
      case "TEAM_LEADER":
        navigate("/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  function isActive (value){
    return (value === activeElement?.value) || (Array.isArray(value) && value.some((ele)=> ele?.value === activeElement?.value))
  }

  return (
    <nav className="w-full h-[5rem] px-6 relative flex justify-between items-center bg-background border-b">
      <img
        src={barcadly}
        alt="logo"
        className=" w-[160px] dark:block hidden "
      />
      <img
        src={darkBarcadly}
        alt="logo"
        className=" dark:hidden w-[160px] visible "
      />
      <div className="flex justify-center gap-4 items-center">
        {
          user?.roleIds?.some((role) => role.roleTag === "TEAM_LEAD") && <InviteModal isOpen={isOpen} setIsOpen={setIsOpen} />
        }

        {user?.roleIds.length > 1 && (
          <Select value={path} onValueChange={handleChangeRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {user?.roleIds?.map((role) => (
                <SelectItem key={role._id} value={role?.roleTag}>
                  {role.roleName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <ToggleBtn />
        <div className="main-header-date-time  text-right">
          <h3 className="text-xl">
            <span>{currentTime}</span>
          </h3>
          <span className="text-sm">
            <span id="date">{currentDate}</span>
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full dark:bg-slate-600 bg-slate-300 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* canvas edit menu */}
      <ul className={`flex bg-slate-900 absolute left-1/2 -translate-x-1/2 transition-transform duration-300 rounded-b-xl overflow-hidden ${location.pathname.includes("editTemplate") && !isNavMenuUp ? "bottom-0 translate-y-full z-20": isNavMenuUp ? "translate-y-0 -translate-x-[20rem] z-20 bg-slate-950 rounded-t-xl":"-z-10"}`}>
        {
          navElements.map((element) => {
            return (
              <li className={`w-[4.5rem] h-[4rem] px-7 py-3 grid place-items-center cursor-pointer ${isActive(element?.value)&& "bg-blue-500"}`} key={element.name} onClick={()=>{
                if(Array.isArray(element?.value)) return;
                handleActiveElement(element)}
              }>
                {
                  Array.isArray(element.value) ?
                    (
                      <NavMenu
                        element={element}
                        handleActiveElement={handleActiveElement}
                        activeElement={activeElement}
                        handleImageUpload={handleImageUpload}
                        imageUploadRef = {imageUploadRef}
                      />
                    ) : (
                      <img src={element.value === "up_navmenu" && isNavMenuUp ? element.iconTwo : element.icon} alt={element.name} className="w-full h-full object-contain object-center" />
                    )
                }
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}

export default Header;
