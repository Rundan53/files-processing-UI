import { BriefcaseBusiness, PlusCircle, Search } from "lucide-react";

export const sideBarData = [
  {
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    sectionName: "Dashboard",
    url: "/dashboard",
  },
  // {
  //   icon: <Search className="h-4 w-4" />,
  //   sectionName: "Search",
  //   url: "/search",
  // },
  {
    icon: <PlusCircle className="h-4 w-4" />,
    sectionName: "Add Category",
    url: "/addCategories",
  },
  {
    icon: <PlusCircle className="h-4 w-4" />,
    sectionName: "Add Events",
    url: "/addEvents",
  },
  {
    icon: <PlusCircle className="h-4 w-4" />,
    sectionName: "Image Templates",
    url: "/imageTemplates",
  },
  {
    icon: <PlusCircle className="h-4 w-4" />,
    sectionName: "Video Templates",
    url: "/videoTemplates",
  },
  {
    icon: <PlusCircle className="h-4 w-4" />,
    sectionName: "Add Client",
    url: "/addClient",
  },
  {
    icon: <PlusCircle className="h-4 w-4" />,
    sectionName: "Client Templates",
    url: "/clientTemplates",
  },
];


export const vdSidebarData = [
  {
    sectionName: "Upload templates",
    url: "/vd/newTemplates",
  },
  {
    sectionName: "All Templates",
    url: "/vd/allTemplates",
  },
];
export const gdSidebarData = [
  {
    sectionName: "Upload templates",
    url: "/gd/newTemplates",
  },
  {
    sectionName: "All Templates",
    url: "/gd/allTemplates",
  },
];
