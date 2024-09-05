import { ScrollArea } from "@/components/ui/scroll-area";
import CategorySection from "./CategorySection";
import EventSection from "./EventSection";

const VideoTemplates = () => {

  return (
    <ScrollArea className="w-full h-full">
        <CategorySection type="video"/>
        <EventSection type="video"/>
    </ScrollArea>
  );
};

export default VideoTemplates;
