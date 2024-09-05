import { memo, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarButton from "./SideBarButton";

export const LeftSideBar = memo(({ sideBarData }) => {
  const location = useLocation();
  const isRouteConsistInSidebar = sideBarData.some(ele => ele.url === location.pathname);
  const [active, setActive] = useState({url:"/dashboard"});

  if(isRouteConsistInSidebar && active.url !== location.pathname){
    setActive({url:location.pathname});
  }
  return (
    <section className={`w-[18%] bg-background pt-2  h-screen`}>
      <div className="p-2 overflow-y-auto scroller">

        {
          sideBarData.map((ele,index) => {
            return (
              <SideBarButton {...ele} setActive={setActive} active={active} key={index}/>
            )
          })
        }
      </div>
    </section>
  );
});
