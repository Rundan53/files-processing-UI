import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetClientsTemplatesQuery } from "@/store/apiSlice/templateApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import TemplateCard from "@/common/templatecard/TemplateCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetClientsQuery } from "@/store/apiSlice/clientApi";
import { Search } from "lucide-react";
import TemplateSkeleton from "@/common/templatecard/TemplateSkeleton";

const ClientTemplates = () => {
  const { data: response, isLoading } = useGetClientsTemplatesQuery();
  const { data: clientsData } = useGetClientsQuery();
  // const [searchQuery, setSearchQuery] = useState("");
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    if (response) {
      setUpdatedData(response?.data?.clients);
    }
  }, [response]);

  function handleSearch(e) {
    const filterdData = response?.data?.clients?.filter((client) =>
      client?.businessName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
    setUpdatedData(filterdData);
  }

  function handleSelectChange(value) {
    const filterdData = response?.data?.clients?.filter((client) =>
      client?.businessName
        .toLocaleLowerCase()
        .includes(value.trim().toLocaleLowerCase())
    );
    setUpdatedData(filterdData);
  }

  return (
    <ScrollArea className="w-full h-full ">
      <div className="m-6 mb-[5rem] h-full">
        <div className="flex items-center justify-between">
          <p className="text-[2rem] font-medium">Client Templates</p>
          <div className="flex items-center justify-end gap-5">
            <div className="relative ml-auto w-[20rem]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by business name..."
                className="w-full rounded-lg bg-background pl-8"
                onChange={handleSearch}
              />
            </div>
            <div>
              <Select onValueChange={handleSelectChange} defaultValue="">
                <SelectTrigger className="w-[9rem]">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All</SelectItem>
                  {clientsData?.data?.clients?.map((clientInfo) => (
                    <SelectItem
                      value={clientInfo?.businessName}
                      key={clientInfo?._id}
                    >
                      {clientInfo?.businessName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {!updatedData.length ? (
          <div className="w-full h-full grid place-items-center mt-[6rem]">
            <h5 className="text-center text-[2rem] font-medium text-slate-400">
              No result found!
            </h5>
          </div>
        ) : (
          <div className="">
            {updatedData?.map((client, index) => {
              return (
                <div className="mt-[3rem]" key={client?._id}>
                  <p className="text-xl ml-[2rem] font-medium px-4 py-2 rounded-lg bg-blue-500 inline-block">
                    {client?.businessName}
                  </p>
                  <div className="flex flex-wrap justify-center items-start gap-6 mt-5">
                    {client?.drafts?.map((draft) => {
                      const { darftUrl, templateId, templateName } = draft;
                      return (
                        <TemplateCard
                          type={"image"}
                          template={{
                            templateURL: darftUrl,
                            templateName,
                            templateId,
                          }}
                          key={draft?._id}
                          reEdit={true}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ClientTemplates;
