import Header from "@/components/Header";
import { LeftSideBar } from "@/components/leftSideBar/LeftSideBar";
import { gdSidebarData } from "@/components/leftSideBar/constant";
import { Outlet, useLocation } from "react-router-dom";

function GdLayout() {
  return (
    <div className=" w-full pb-20 fixed h-screen">
      <Header path="GRAPHIC_DESIGNER" />
      <div className="w-full bg-muted flex h-full">
        <LeftSideBar sideBarData={gdSidebarData} />
        <Outlet />
      </div>
    </div>
  );
}

export default GdLayout;
