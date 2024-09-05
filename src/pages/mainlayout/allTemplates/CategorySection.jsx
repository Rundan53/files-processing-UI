import Loader from "@/common/Loader";
import TemplateCard from "@/common/templatecard/TemplateCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCategories, handleChangeCategory } from "@/store/apiSlice/axiosApi";
import {
  useGetCategoriesQuery,
  useGetTemplatesByCategoriesQuery,
  useLazyGetTemplatesByCategoriesQuery,
} from "@/store/apiSlice/templateApi";
import { useEffect, useState } from "react";

const CategorySection = ({ type }) => {
  const [categoryId, setCategoryId] = useState("");
  const [templates, setTemplates] = useState([]);
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategoriesQuery(type);
  const [
    getTemplatesByCategory,
    { data: templatesData, isLoading: templatesLoading },
  ] = useLazyGetTemplatesByCategoriesQuery();


  useEffect(() => {
    const categoryId = categoriesData?.data?.categories[0]?._id;
    setCategoryId(categoryId);
    if (categoryId) {
      getTemplatesByCategory({
        categoryId,
        type,
      });
    }
  }, [categoriesData]);

  useEffect(() => {
    setTemplates(templatesData?.data?.templates);
  }, [templatesData]);

  function handleChangeCategory(categoryId) {
    getTemplatesByCategory({ categoryId, type });
    setCategoryId(categoryId);
  }


  return (
    <section className="p-4 w-full">
      <h3 className="text-[2rem] font-medium text-center mt-2">Categories</h3>
      {
        <div className="flex justify-center w-full">
            {categoryLoading && <Loader/>}
          {!categoryLoading && (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="max-w-[55rem]">
                {categoriesData?.data?.categories.map((category) => (
                  <CarouselItem
                    key={category?._id}
                    className="basis-1/5 flex flex-shrink justify-center items-center"
                  >
                    <div className="p-1">
                      <span className="flex aspect-square items-center justify-center ">
                        <Button
                          key={category?._id}
                          onClick={() => {
                            handleChangeCategory(category?._id);
                          }}
                          className={`h-[3rem] w-[7rem] ${
                            category?._id === categoryId
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-primary"
                          }`}
                        >
                          {category?.categoryName || "category name"}
                        </Button>
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      }
      <div className="flex flex-wrap justify-center items-start gap-6 mt-5">
        {templates?.length ? (
          templates?.map((template) => (
            <TemplateCard template={template} key={template?._id} type={type} categoryId={categoryId}/>
          ))
        ) : !categoryLoading && !templatesLoading && (
          <h1 className="text-[2rem] text-muted-foreground">
            {`No ${type} tamplates available.`}
          </h1>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
