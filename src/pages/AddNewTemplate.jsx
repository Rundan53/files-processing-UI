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
import { useEffect, useRef, useState } from "react";
import config from "../config/default.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "react-toastify";

// import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClipLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { showToastMessage } from "@/utils/showToastNavigate";
import BtnLoader from "@/common/BtnLoader";
import { server } from "@/config";

function AddNewTemplate({ role }) {
  const [category, setCategory] = useState([]);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const catrgoryTypes = ["TEMPLATE"];
  const [types, setTypes] = useState(catrgoryTypes[0]);
  const [date, setDate] = useState(new Date());
  const [isUploading, setIsUploading] = useState(false);
  const [TempTemplate, setTempTemplate] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [formData, setFormData] = useState({
    templateType: role,
  });
  const [isLoading, setIsLoading] = useState(false);
  const templateref = useRef(null);

  const getEvents = async () => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ("0" + selectedDate.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    try {
      const response = await axios.get(
        `${config.API_URL}/events?date=${formattedDate}`,
        {
          withCredentials: true,
        }
      );

      console.log("Response:", response.data); // Log the response data for debugging
      if (response.data.success) {
        setEvents(response.data.data.events);
      }
    } catch (err) {
      console.log("Error:", err); // Log the error for debugging
    }
  };

  const getCatagories = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/categories?type=${types}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCategory(response.data.data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!!uploadedFileUrl) {
      handleCompressFile(uploadedFileUrl).then((res) => {
        setFormData((prev) => ({
          ...prev,
          templateURL: uploadedFileUrl,
          compressedURL: res?.data?.compressedURL,
          gifURL: res?.data?.gifURL,
        }));
        showToastMessage(res && res);
      });
    }
  }, [uploadedFileUrl]);

  async function handleCompressFile(uploadedFileUrl) {
    const fileData = { fileURL: uploadedFileUrl };
    setIsUploading(true);
    try {
      const response = await axios.post(
        `${server}/templates/${role}/compress`,
        fileData,
        {
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      showToastMessage(error?.response?.data);
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    getCatagories();
  }, [types]);

  useEffect(() => {
    setEvents([]);
    if (date && show) {
      getEvents();
    }
  }, [date, show]);

  const handleFileChange = (e) => {
    setTempTemplate(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (value) => {
    const fData = category.filter((item) => item.id === value);

    setFormData({
      ...formData,
      categoryId: value,
      categoryName: fData[0].categoryName,
    });
  };

  const handleEventChange = (value) => {
    setFormData({
      ...formData,
      eventId: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${config.API_URL}/templates?templateType=${role}`,
        formData,
        {
          withCredentials: true,
        }
      );
      showToastMessage(response?.data);
      setFormData({
        templateType: role,
        templateURL: "",
        templateName: "",
        categoryId: "",
        eventId: "",
      });
      setDate(new Date());
      setShow(false);
      setTempTemplate(null);
      if (templateref.current) {
        templateref.current.value = null;
      }
    } catch (error) {
      showToastMessage(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvenet = () => {
    setShow(!show);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const response = await axios.post(
        `${config.API_URL}/templates/upload?templateType=${role}`,
        { template: TempTemplate },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        if (role === "IMAGE") {
          setFormData((prev) => ({
            ...prev,
            templateURL: response?.data?.data?.url,
            file: response?.data?.data?.file,
          }));
        } else {
          setUploadedFileUrl(response?.data?.data?.url);
        }
      }
      showToastMessage(response?.data);
    } catch (error) {
      showToastMessage(error?.response?.data);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollArea className="w-full flex justify-center items-center p-4 h-full ">
      <Card x-chunk="dashboard-07-chunk-0" className="w-[60%]">
        <CardHeader>
          <CardTitle>Add New Template</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent>
            <div className="grid gap-3 space-y-3">
              <div className="grid gap-3">
                <Label htmlFor="template">
                  Template <span className="text-red-500 ">*</span>
                </Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="template"
                    name="template"
                    type="file"
                    accept={role === "IMAGE" ? "image/*" : "video/*"}
                    className="w-full "
                    placeholder="Select file"
                    ref={templateref}
                    onChange={handleFileChange}
                    disabled={formData.templateURL}
                  />
                  <Button
                    type="button"
                    onClick={handleUploadImage}
                    disabled={
                      isUploading || !TempTemplate || formData.templateURL
                    }
                  >
                    {isUploading && !uploadedFileUrl ? (
                      <BtnLoader text="Uploading" />
                    ) : isUploading && uploadedFileUrl ? (
                      <BtnLoader text="Compressing" />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="templateName">
                  Template Name <span className="text-red-500 ">*</span>
                </Label>
                <Input
                  id="templateName"
                  name="templateName"
                  type="text"
                  className="w-full"
                  value={formData.templateName}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </div>

              <div className="flex gap-3 items-center">
                <div className="grid w-full gap-3">
                  <Label htmlFor="category">
                    Category Type <span className="text-red-500 ">*</span>
                  </Label>
                  <Select
                    value={types}
                    onValueChange={(value) => setTypes(value)}
                    placeholder="Select Category Type"
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Category Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {catrgoryTypes?.map((category, index) => (
                        <SelectItem key={index} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full gap-3">
                  <Label htmlFor="category">
                    Category <span className="text-red-500 ">*</span>
                  </Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value, name) =>
                      handleCategoryChange(value, name)
                    }
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category?.map((category) => (
                        <SelectItem key={category.id} value={category._id}>
                          {category.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="event">
                  Is this template for event ?{" "}
                  <span className="text-red-500 ">*</span>
                </Label>
                <RadioGroup
                  className="flex gap-4"
                  onValueChange={(value) => handleEvenet(value)}
                  defaultValue="false"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="ture" />
                    <Label htmlFor="true">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false">No</Label>
                  </div>
                </RadioGroup>
              </div>
              {show && (
                <div className="flex gap-3 *:w-full items-center">
                  <div className="grid gap-3 ">
                    <Label htmlFor="eventName">Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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

                  <div className="grid w-full gap-3">
                    <Label htmlFor="category">Event</Label>
                    <Select
                      value={formData.eventId}
                      onValueChange={(value, name) =>
                        show && handleEventChange(value, name)
                      }
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events?.map((event) => (
                          <SelectItem key={event.id} value={event._id}>
                            {event.eventName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={
                !formData.templateURL ||
                !formData.templateName ||
                !formData.categoryName ||
                !formData.categoryId ||
                (show && !formData.eventId)
              }
              type="submit"
            >
              {isLoading ? <BtnLoader /> : "Add Template"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </ScrollArea>
  );
}

export default AddNewTemplate;
