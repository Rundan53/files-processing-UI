import Initial from "@/common/Initial";
import { DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
// import Initial from "@/components/Initials";
// import { getInitials } from "@/utils";

const RecentSection = ({ recentSales }) => {
  function getInitials(name) {
    return name[0]?.[0]?.toUpperCase()||"B";
  }
  return (
    <div className="w-[23rem] h-full border-2 rounded-md p-4 bg-primary text-primary-foreground">
      <div>
        <h3 className="text-lg font-bold">Recent Uploads</h3>
        <p className="font-semibold text-gray-500">
          You made 120 uploads this month.
        </p>
      </div>
      {recentSales.map((recentsale, id) => {
        const initials = getInitials(recentsale.clientname);
        return (
          <div key={id} className="w-full flex gap-3 space-y-4 items-center">
            <Initial text={initials} />
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col">
                <h2 className="font-bold">{recentsale.clientname}</h2>
                <h3 className="text-gray-500">{recentsale.email}</h3>
              </div>
              <span className="flex items-center text-sm font-semibold">
                {recentsale.Sales}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentSection;