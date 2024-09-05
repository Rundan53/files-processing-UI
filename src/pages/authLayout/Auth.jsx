import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="w-full ">
      <Outlet />
    </div>
  );
}

export default Auth;
