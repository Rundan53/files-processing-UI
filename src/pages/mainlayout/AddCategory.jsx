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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showToastMessage } from "@/utils/showToastNavigate";
import { ClipLoader } from "react-spinners";
import BtnLoader from "@/common/BtnLoader";

function AddCategory() {
  const categoryTypes = ["TEMPLATE"];
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryType: categoryTypes[0],
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

    try {
      const response = await axios.post(
        `${config.API_URL}/categories`,
        formData,
        {
          withCredentials: true,
        }
      );

      showToastMessage(response?.data);
      setFormData({ categoryName: "" });
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
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="categoryName">
                  Category Name <span className="text-red-500 ">*</span>
                </Label>
                <Input
                  id="categoryName"
                  name="categoryName"
                  type="text"
                  className="w-full"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  placeholder="Category Name"
                />
              </div>

              <div className="flex gap-3 items-center">
                <div className="grid w-full gap-3">
                  <Label htmlFor="category">
                    Category Type <span className="text-red-500 ">*</span>
                  </Label>
                  <Select
                    value={formData.categoryType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryType: value })
                    }
                    placeholder="Select Category Type"
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Category Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryTypes?.map((category, index) => (
                        <SelectItem key={index} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={!formData.categoryName || !formData.categoryType}
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

export default AddCategory;
