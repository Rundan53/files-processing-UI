import { ScrollArea } from "@/components/ui/scroll-area";
import CategorySection from "./CategorySection";
import EventSection from "./EventSection";


const ImageTemplates = () => {
 
  return (
    <ScrollArea className="w-full h-full ">
        <CategorySection type="image"/>
        <EventSection type="image"/>
    </ScrollArea>
  );
};

export default ImageTemplates;
