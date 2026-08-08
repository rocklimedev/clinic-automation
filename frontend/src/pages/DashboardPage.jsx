import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";
import { StatsGrid } from "../features/dashboard/StatsGrid";
import { FeedbackTrendChart } from "../features/dashboard/FeedbackTrendChart";
import { MessagesSentChart } from "../features/dashboard/MessagesSentChart";
import { ReviewConversionChart } from "../features/dashboard/ReviewConversionChart";
import { RecentActivity } from "../features/dashboard/RecentActivity";
import { Download, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of patient feedback automation performance"
        actions={
          <>
            <Button variant="secondary" size="md">
              <Download className="h-4 w-4" />
              Export report
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              Add patient
            </Button>
          </>
        }
      />

      <StatsGrid />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <FeedbackTrendChart />
        </div>
        <ReviewConversionChart />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MessagesSentChart />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
