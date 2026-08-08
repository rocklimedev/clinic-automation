import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { dashboardApi } from "@/services/dashboard.api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";

export function FeedbackTrendChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "feedback-trend"],
    queryFn: dashboardApi.getFeedbackTrend,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback trend</CardTitle>
        <CardDescription>
          Patient feedback submissions over the last 14 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-56 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={data}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="feedbackFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity={0.32}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgb(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "rgb(var(--muted-fg))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "rgb(var(--muted-fg))" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid rgb(var(--border))",
                  background: "rgb(var(--card))",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="feedback"
                stroke="var(--color-brand-600)"
                strokeWidth={2}
                fill="url(#feedbackFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
