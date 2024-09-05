import Header from "@/components/Header";
import { LeftSideBar } from "@/components/leftSideBar/LeftSideBar";
import { sideBarData } from "@/components/leftSideBar/constant";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";

function Mainlayout() {
  const optimizedSideBarData = useMemo(()=>[...sideBarData],[]);
  return (
    <div className=" w-full pb-10 fixed h-screen">
      <Header path={"TEAM_LEAD"}/>
      <div className="w-full bg-muted flex h-full">
        <LeftSideBar sideBarData={optimizedSideBarData} />

        <div className="w-[calc(100%-18%)] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Mainlayout;
