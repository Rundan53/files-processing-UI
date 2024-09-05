import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { CirclePlus } from "lucide-react";

const CustomAccordian = ({ active, setActive, sideBarData }) => {
  const Navigate = useNavigate();

  function buttonClickHandler(name, url, sectionName) {
    setActive({ name, sectionName });
    url && Navigate(url);
  }

  function addNewHandler(buttonClickUrl) {
    Navigate(buttonClickUrl);
  }
  return (
    <>
      {sideBarData.map(({ sectionName, icon, url, subSection }, index) => {
        return (
          <Accordion type="single" key={index} collapsible>
            <AccordionItem value={`item-${index}`}>
              {subSection ? (
                <AccordionTrigger
                  className={`px-3 ${
                    active.sectionName === sectionName && "text-blue-500"
                  }`}
                >
                  <div className="flex  items-center gap-2">
                    {icon} {sectionName}
                  </div>
                </AccordionTrigger>
              ) : (
                <div
                  onClick={() => {
                    buttonClickHandler(sectionName, url, sectionName);
                  }}
                  className={`px-3 flex gap-2  items-center mb-1 py-2 text-[0.875rem] font-normal cursor-pointer
                   ${
                     active.sectionName !== sectionName &&
                     "hover:bg-[#e1e7ef] dark:hover:bg-[#344256]"
                   } rounded-md ${
                    active.sectionName === sectionName && "bg-blue-500"
                  }`}
                >
                  {sectionName}
                </div>
              )}
              <AccordionContent>
                {subSection?.map(({ name, url, buttonClickUrl }, index) => {
                  return (
                    <Button
                      variant="ghost"
                      className={`w-full pl-8 font-normal justify-between ${
                        active.name !== name &&
                        "hover:bg-[#e1e7ef] dark:hover:bg-[#344256]"
                      } ${active.name === name && "bg-blue-500 text-slate-50"}`}
                      onClick={() => {
                        buttonClickHandler(name, url, sectionName);
                      }}
                      key={index}
                    >
                      {name}
                      {buttonClickUrl && (
                        <CirclePlus
                          onClick={(e) => {
                            addNewHandler(buttonClickUrl);
                            e.stopPropagation();
                          }}
                          className="h-4 w-4"
                        />
                      )}
                    </Button>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
};

export default CustomAccordian;
