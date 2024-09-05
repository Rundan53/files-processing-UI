import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useState } from "react";
import config from "../../config/default.json";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { showToastMessage } from "@/utils/showToastNavigate";
import BtnLoader from "@/common/BtnLoader";

function AddEvents() {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: date,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const date2 = new Date(date);

    const year = date2.getFullYear();
    const month = ("0" + (date2.getMonth() + 1)).slice(-2);
    const day = ("0" + date2.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    const data = {
      eventName: formData.eventName,
      eventDate: formattedDate,
    };
    try {
      const response = await axios.post(`${config.API_URL}/events`, data, {
        withCredentials: true,
      });
      setFormData((prev) => ({
        ...prev,
        eventName: "",
      }));
      showToastMessage(response?.data);
    } catch (error) {
      showToastMessage(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollArea className="w-full p-4 h-full ">
      <Card x-chunk="dashboard-07-chunk-0" className="w-[60%]">
        <CardHeader>
          <CardTitle>Add New Events</CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="eventName">
                  Event Name <span className="text-red-500 ">*</span>
                </Label>
                <Input
                  id="eventName"
                  name="eventName"
                  type="text"
                  className="w-full"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="Event Name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="eventName">
                  Event Date <span className="text-red-500 ">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={!formData.eventName || !formData.eventDate}
              type="submit"
            >
              {loading ? <BtnLoader /> : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </ScrollArea>
  );
}

export default AddEvents;
