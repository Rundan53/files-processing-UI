import { CircleUser, DollarSign, PanelTop, Users } from "lucide-react";
// import DashGraph from "./DashGraph";
// import RecentSection from "./RecentSection";
import DashboardCard from "./DashboardCard";
import RecentSection from "./RecentSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashGraph from "./DashGraph";

const Dashboard = () => {
    const recentSales = [
      { icon: <CircleUser className="w-7 h-7" />, clientname: "Olivia Martin", email: "olivia@barcadlyservices.in", Sales: 9 },
      { icon: <CircleUser className="w-7 h-7" />, clientname: "Jackson Lee", email: "treloo@barcadlyservices.in", Sales: 11 },
      { icon: <CircleUser className="w-7 h-7" />, clientname: "Isabella Nguyen", email: "july@barcadlyservices.in", Sales: 48 },
      { icon: <CircleUser className="w-7 h-7" />, clientname: "William Kim", email: "boomli@barcadlyservices.in", Sales: 20 },
  
    ]
    const cardData = [
      // {
      //   title: "Total Revenue",
      //   icon: <DollarSign className="w-4 h-4" />,
      //   revenue: 123141,
      //   smtitle: "+20.1% from last month",
      // },
      {
        title: "Total Clients",
        icon: <Users className="w-4 h-4" />,
        revenue: 490,
        smtitle: "+20.1% from last month",
      },
      {
        title: "Total Uploads",
        icon: <PanelTop className="w-4 h-4" />,
        revenue: 570,
        smtitle: "+20.1% from last month",
      },
    ];
  
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: 'Customer',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: "hsla(214, 100%, 41%, 1)",
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };
  
    return (
      <ScrollArea className="w-full h-full">
        <div className="relative mt-[2rem] mx-[1rem] mb-[5rem]">
        <h2 className="text-3xl font-bold mb-[2rem] mt-5">Dashboard</h2>
        <div className="flex items-center justify-start gap-6 flex-wrap">
          {cardData.map((carddata, id) => (
            <DashboardCard key={id} carddata={carddata} />
          ))}
        </div>
        <div className="flex mt-10 items-center justify-between gap-6 flex-wrap">
          <DashGraph data={data} options={options} />
          <RecentSection recentSales={recentSales} />
        </div>
      </div>
      </ScrollArea>
    );
  };
  
  export default Dashboard;