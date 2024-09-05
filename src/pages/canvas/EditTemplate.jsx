import Header from "@/components/Header";
import { defaultNavElement } from "@/constants";
import {
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleCanvasObjectMoving,
  handleCanvasObjectScaling,
  handleCanvasSelectionCreated,
  handleCanvaseMouseMove,
  initializeFabric,
} from "@/lib/canvas";
import { handleDelete, handleReset } from "@/lib/helpers";
import { handleImageUpload } from "@/lib/shapes";
import {
  useGetTemplatesByCategoriesQuery,
  useGetTemplatesByEventsQuery,
} from "@/store/apiSlice/templateApi";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import RightSidebar from "./RightSideBar";
import Loader from "@/common/Loader";

const EditTemplate = () => {
  const { contentType, templateType, templateId, mainId } = useParams();
  const { data: templatesData, isLoading } =
    templateType === "event"
      ? useGetTemplatesByEventsQuery({ eventId: mainId, type: contentType })
      : useGetTemplatesByCategoriesQuery({
          categoryId: mainId,
          type: contentType,
        });
  const currentTemplate = templatesData?.data?.templates?.find(
    (template) => template?._id === templateId
  );
  const currentTemplateUrl = currentTemplate?.templateURL;

  const canvasRef = useRef();
  const fabricRef = useRef();
  const isDrawing = useRef(false);
  const shapeRef = useRef();
  const selectedShapeRef = useRef();
  const activeObjectRef = useRef();
  const isEditingRef = useRef(false);

  const [clientInfo, setClientInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isNavMenuUp, setIsNavMenuUp] = useState(false);
  const [activeElement, setActiveElement] = useState({
    name: "",
    icon: "",
    value: "",
  });
  const [elementAttributes, setElementAttributes] = useState({
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });
  const imageUploadRef = useRef();

  function handleActiveElement(element) {
    setActiveElement(element);
    switch (element?.value) {
      case "reset":
        handleReset(fabricRef?.current);
        setActiveElement(defaultNavElement);
        break;
      case "delete":
        handleDelete(fabricRef?.current);
        setActiveElement(defaultNavElement);
        break;
      case "image":
        imageUploadRef.current?.click();
        isDrawing.current = false;
        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false;
        }
        break;
      case "up_navmenu":
        setIsNavMenuUp((prev) => !prev);

      default:
        selectedShapeRef.current = element?.value;
        break;
    }
  }

  useEffect(() => {
    if (currentTemplateUrl) {
      const canvas = initializeFabric({
        canvasRef,
        fabricRef,
        currentTemplateUrl,
        setLoading,
      });
      canvas.on("mouse:down", (options) => {
        handleCanvasMouseDown({
          options,
          canvas,
          isDrawing,
          shapeRef,
          selectedShapeRef,
        });
      });

      canvas.on("mouse:move", (options) => {
        handleCanvaseMouseMove({
          options,
          canvas,
          isDrawing,
          selectedShapeRef,
          shapeRef,
        });
      });

      canvas.on("mouse:up", () => {
        handleCanvasMouseUp({
          canvas,
          isDrawing,
          shapeRef,
          activeObjectRef,
          selectedShapeRef,
          setActiveElement,
        });
      });

      canvas.on("object:modified", (options) => {
        handleCanvasObjectModified({
          options,
          canvas: fabricRef?.current,
        });
      });

      canvas?.on("object:moving", (options) => {
        handleCanvasObjectMoving({
          options,
        });
      });

      canvas.on("selection:created", (options) => {
        handleCanvasSelectionCreated({
          options,
          isEditingRef,
          setElementAttributes,
        });
      });

      canvas.on("object:scaling", (options) => {
        handleCanvasObjectScaling({
          options,
          setElementAttributes,
        });
      });

      return () => {
        canvas.dispose();
      };
    }
  }, [canvasRef, currentTemplateUrl]);

  return (
    <div className="w-full relative h-screen">
      <Header
        path={"TEAM_LEAD"}
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
        handleImageUpload={(e) => {
          e.stopPropagation();
          handleImageUpload({
            file: e.target.files[0],
            canvas: fabricRef,
            shapeRef,
          });
        }}
        imageUploadRef={imageUploadRef}
        setIsNavMenuUp={setIsNavMenuUp}
        isNavMenuUp={isNavMenuUp}
      />
      <div className="w-full h-[calc(100%-5rem)] flex flex-row relative">
        {/* <div
          className={`h-full w-[20rem] absolute z-10 top-0 bg-red-500 p-[1rem] ${
            Object.values(clientInfo).length ? "left-0" : "-left-full"
          }`}
        >
          <div className="w-[3rem] h-[3rem]">
            <img
              src={clientInfo.logoURL}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div> */}
        <div className="h-full w-3/4 py-4 bg-slate-600 dark:bg-slate-800 relative">
          {loading && (
            <Loader className={"absolute top-1/2 -translate-y-1/2 left-0"} />
          )}
          {
            <div
              className="h-full w-full flex items-center justify-center"
              id="canvas"
            >
              <canvas className="" ref={canvasRef} />
            </div>
          }
        </div>
        <RightSidebar
          elementAttributes={elementAttributes}
          setElementAttributes={setElementAttributes}
          fabricRef={fabricRef}
          activeObjectRef={activeObjectRef}
          isEditingRef={isEditingRef}
          setClientInfo={setClientInfo}
          templateId={templateId}
          clientInfo={clientInfo}
        />
      </div>
    </div>
  );
};

export default EditTemplate;
