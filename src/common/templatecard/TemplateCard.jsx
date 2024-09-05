import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { showToastMessage } from "@/utils/showToastNavigate";
import { SquarePenIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LazyImg from "../LazyImg";

const TemplateCard = ({
  template,
  type,
  eventId,
  categoryId,
  reEdit = false,
}) => {
  const navigate = useNavigate();

  function handleOpenEditTemplate(type, templateId) {
    if (type === "video") {
      showToastMessage({
        success: false,
        message: "Functionality not developed till now!",
      });
      return;
    }
    if (eventId) {
      navigate(`/editTemplate/${type}/event/${eventId}/${templateId}`);
    } else {
      navigate(`/editTemplate/${type}/category/${categoryId}/${templateId}`);
    }
  }
  return (
    <div key={template?._id} className="relative w-[20rem]">
      <div className="shadow-xl w-full h-[12rem] flex flex-col bg-background justify-center items-center rounded-xl overflow-hidden">
        {type === "image" ? (
          <LazyImg
            className="w-full h-full object-cover object-center"
            src={template?.templateURL}
            alt={template?.templateName}
          />
        ) : (
          <video
            className="w-full rounded-lg h-full object-cover object-center"
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
          >
            <source src={template.templateURL} type="video/mp4" />
          </video>
        )}
        {!reEdit && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="absolute -top-2 -right-2 p-2 rounded-full bg-primary">
                <SquarePenIcon
                  className="text-primary-foreground"
                  onClick={() => {
                    handleOpenEditTemplate(type, template?._id);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex pt-3 items-center justify-center ">
        <h2 className="font-bold text-xl">{template?.templateName}</h2>
      </div>
    </div>
  );
};

export default TemplateCard;
