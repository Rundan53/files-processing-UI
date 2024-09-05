import BtnLoader from "@/common/BtnLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { server } from "@/config";
import { useAddClientMutation } from "@/store/apiSlice/clientApi";
import { addClientSchema } from "@/utils/schema";
import { showToastMessage } from "@/utils/showToastNavigate";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const AddClient = () => {
  const form = useForm({
    resolver: zodResolver(addClientSchema),
    defaultValues: {
      clientName: "",
      businessName: "",
      phoneNumber: "",
      email: "",
      logoURL: "",
      address: "",
    },
  });
  const [fileSelected, setIsFileSelected] = useState(null);
  const [addClient, { error, isLoading }] = useAddClientMutation();
  const fileInputRef = useRef("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (error) {
      showToastMessage(error?.data);
    }
  }, [error]);

  async function handleLogoUpload() {
    setIsUploading(true);
    try {
      const { data: response } = await axios.post(
        `${server}/clients/upload_logo`,
        { logo: fileSelected },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.success) {
        form.setValue("logoURL", response?.data.url, { shouldValidate: true });
        setIsFileSelected(null);
      }
      showToastMessage(response);
    } catch (error) {
      showToastMessage(error?.response?.data);
    }finally{
      setIsUploading(false);
    }
  }

  async function handleClientAdd(data) {
    if(!data.address.length){
      delete data.address;
    }
    if(!data.logoURL.length){
      delete data.logoURL;
    }
    if(!data.phoneNumber.length){
      delete data.phoneNumber;
    }
    const { data: response } = await addClient(data);
    if (response?.success) {
      form.reset();
      if(!!fileInputRef.current.value){
        fileInputRef.current.value=""
      }
      showToastMessage(response);
    }
  }

  return (
    <ScrollArea className="h-screen">
      <Card className="w-[600px] m-2 h-full mb-[5rem]">
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleClientAdd)}>
            <CardContent className="pb-1">
              <div className="space-y-2">
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Client Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[16rem]"
                            type="text"
                            placeholder="Enter Client Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone No.
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[16rem]"
                            type="tel"
                            placeholder="Enter Client Phone No."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Business Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[16rem]"
                            type="text"
                            placeholder="Enter Business Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[16rem]"
                            type="email"
                            placeholder="Enter Client Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="logoURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-5">
                        Logo URL
                      </FormLabel>
                      <div className="flex space-x-2">
                        <div className="grid-cols-1">
                          <FormControl className="flex-1">
                            <Input
                              className="w-[26rem]"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                setIsFileSelected(e.target.files[0]);
                              }}
                              ref={fileInputRef}
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                        <Button
                          type="button"
                          onClick={handleLogoUpload}
                          disabled={form.getValues().logoURL.length || !fileSelected}
                        >
                          {isUploading ? <BtnLoader text="Uploading"/>:"Upload"}
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mt-3 pb-2">
                      <FormLabel>
                        Address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Client Address"
                          {...field}
                          className="max-h-[15vh]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={fileSelected}>{isLoading ? <BtnLoader text="Submitting"/>:"Submit"}</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </ScrollArea>
  );
};

export default AddClient;
