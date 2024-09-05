import Header from "@/components/Header";
import { LeftSideBar } from "@/components/leftSideBar/LeftSideBar";
import {vdSidebarData } from "@/components/leftSideBar/constant";
import { Outlet } from "react-router-dom";

function VdLayout() {
  return (
    <div className=" w-full pb-20 fixed h-screen">
      <Header path="VIDEO_EDITOR" />
      <div className="w-full bg-muted flex h-full">
        <LeftSideBar sideBarData={vdSidebarData} />
        <Outlet />
      </div>
    </div>
  );
}

export default VdLayout;
