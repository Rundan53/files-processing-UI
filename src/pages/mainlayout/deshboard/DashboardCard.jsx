import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

function DashboardCard({ carddata }) {
  const { title, icon, revenue, smtitle } = carddata


  return (

    <Card className="bg-primary text-primary-foreground w-[16rem]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-1">{revenue}</p>
        <p className="text-xs text-muted-foreground">
          {smtitle}
        </p>
      </CardContent>
    </Card>

  );
}

export default DashboardCard;