import { Navigate, Route, Routes } from "react-router-dom";
import GdLayout from "./pages/GdLayout/GdLayout";
import Auth from "./pages/authLayout/Auth";
import Login from "./pages/authLayout/Login";
import Register from "./pages/authLayout/Register";
import Mainlayout from "./pages/mainlayout/Mainlayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewTemplate from "./pages/AddNewTemplate";
import VdLayout from "./pages/VdLayout/VdLayout";
import AddCategory from "./pages/mainlayout/AddCategory";
import AddEvents from "./pages/mainlayout/AddEvents";
import ImageTemplates from "./pages/mainlayout/allTemplates/ImageTemplates";

import VideoTemplates from "./pages/mainlayout/allTemplates/VideoTemplates";
import EventWiseTemplates from "./pages/mainlayout/allTemplates/EventWiseTemplates";
import EditTemplate from "./pages/canvas/EditTemplate";
import AddClient from "./pages/mainlayout/AddClient";
import ClientTemplates from "./pages/mainlayout/clientTemplates/ClientTemplates";
import Dashboard from "./pages/mainlayout/deshboard/Dashboard";

function App() {
  return (
    <div className=" w-full  h-screen">
      <div className="w-full flex h-full">
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<Mainlayout />}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/addCategories" element={<AddCategory />} />
            <Route path="/addEvents" element={<AddEvents />} />
            <Route path="/imageTemplates" element={<ImageTemplates />} />
            <Route path="/videoTemplates" element={<VideoTemplates />} />
            <Route
              path="/eventTemplates/:eventId/:type"
              element={<EventWiseTemplates />}
            />
            <Route path="/addClient" element={<AddClient />} />
            <Route path="/clientTemplates" element={<ClientTemplates />} />
          </Route>
          <Route
            path="/editTemplate/:contentType/:templateType/:mainId/:templateId"
            element={<EditTemplate />}
          />
          <Route path="/gd" element={<GdLayout path="GRAPHIC_DESIGNER" />}>
            <Route
              path="/gd/newTemplates"
              element={<AddNewTemplate role="IMAGE" />}
            />
          </Route>{" "}
          <Route path="/vd" element={<VdLayout />}>
            <Route
              path="/vd/newTemplates"
              element={<AddNewTemplate role="VIDEO" />}
            />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
