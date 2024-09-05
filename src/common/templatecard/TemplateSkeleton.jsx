import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TemplateSkeleton = () => {
  return (
    <div className="w-[20rem] h-[16rem]">
      <Skeleton className="w-[20rem] h-[14rem] rounded-xl bg-background" />
      <Skeleton className="w-[8rem] h-[1.4rem] mt-2 ml-[5.5rem] bg-background" />
    </div>
  );
};

export default TemplateSkeleton;