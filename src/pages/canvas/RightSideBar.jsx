import React, { useEffect, useMemo, useRef } from "react";

import { bringElement, modifyShape } from "@/lib/shapes";

import Text from "@/components/settings/Text";
import Color from "@/components/settings/Color";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Dimensions from "@/components/settings/Dimensions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetClientsQuery } from "@/store/apiSlice/clientApi";
import { useSendEditedTemplateMutation } from "@/store/apiSlice/templateApi";
import { dataURLToFile } from "@/utils/getFileFromDataUrl";
import { showToastMessage } from "@/utils/showToastNavigate";
import BtnLoader from "@/common/BtnLoader";
import { useNavigate } from "react-router-dom";
// import Export from "./settings/Export";
// import Dimensions from "./settings/Dimensions";

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  setClientInfo,
  clientInfo,
  templateId,
}) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);
  const navigate = useNavigate();
  const { data: clientsData } = useGetClientsQuery();
  const [sendEditedTemplate, { error, isLoading }] = useSendEditedTemplateMutation();

  useEffect(() => {
    if (error) {
      showToastMessage(error?.data);
    }
  }, [error]);

  // temp client data
  // const clientData = [
  //   {
  //     label: "Mohit bansal",
  //     value: "mohit surana",
  //   },
  //   {
  //     label: "Devika Sundar",
  //     value: "devika sundar",
  //   },
  // ];

  const handleInputChange = (property, value) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current,
      property,
      value,
      activeObjectRef,
    });
  };

  function handleClientSelect(selectedClientData) {
    setClientInfo(selectedClientData);
  }

  async function handleSaveCanvasEdit() {
    const canvas = fabricRef?.current;
    const dataUrl = canvas?.toDataURL({
      format: "png",
      quality: 1.0,
    });

    const jsonOfCurrentCanvas = JSON.stringify(canvas.toJSON());

    const file = dataURLToFile(dataUrl,"editedimage");

    const fileData = new FormData();
    fileData.append("image",file);
    fileData.append("templateId",templateId);
    fileData.append("clientId",clientInfo._id);
    fileData.append("metadata",jsonOfCurrentCanvas);
    const {data:response} = await sendEditedTemplate(fileData);
    if(response?.success){
      showToastMessage(response);
      navigate("/clientTemplates");
    }
  }

  // memoize the content of the right sidebar to avoid re-rendering on every mouse actions
  const memoizedContent = useMemo(
    () => (
      <ScrollArea className="w-1/4 h-full">
        <section className="flex w-full h-full pb-[4rem] flex-col bg-slate-800 dark:bg-slate-900 select-none">
          <h3 className=" px-5 pt-4 text-lg font-bold uppercase text-white">
            Design
          </h3>
          <span className="text-xs mt-2 px-5 pb-4 text-white">
            Make changes to canvas as you like
          </span>
          {/* <Dimensions
            isEditingRef={isEditingRef}
            width={elementAttributes.width}
            height={elementAttributes.height}
            handleInputChange={handleInputChange}
          /> */}

          <Text
            fontFamily={elementAttributes.fontFamily}
            fontSize={elementAttributes.fontSize}
            fontWeight={elementAttributes.fontWeight}
            handleInputChange={handleInputChange}
          />

          <div className="w-full flex gap-3 items-center justify-center px-5 py-6">
            <Color
              inputRef={colorInputRef}
              attribute={elementAttributes.fill}
              placeholder="color"
              attributeType="fill"
              handleInputChange={handleInputChange}
            />

            <Color
              inputRef={strokeInputRef}
              attribute={elementAttributes.stroke}
              placeholder="stroke"
              attributeType="stroke"
              handleInputChange={handleInputChange}
            />
          </div>
          {/* adding client */}
          <div className=" px-5 pt-3 pb-5 ">
            <Label
              htmlFor="client"
              className="text-white text-[.7rem] font-normal uppercase"
            >
              Client*
            </Label>
            <Select id="client" onValueChange={handleClientSelect}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select Business" />
              </SelectTrigger>
              <SelectContent>
                {clientsData?.data?.clients?.map((client) => (
                  <SelectItem value={client} key={client?._id}>
                    {client?.businessName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-[2rem] w-full flex items-center gap-5 justify-center">
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleSaveCanvasEdit}
            >
              {isLoading ? <BtnLoader text="Saving" /> : "Save changes"}
            </Button>
            <Button onClick={()=>{navigate("/imageTemplates")}}>Cancel</Button>
          </div>
        </section>
      </ScrollArea>
    ),
    [elementAttributes, clientsData, clientInfo,isLoading]
  );

  return memoizedContent;
};

export default RightSidebar;
