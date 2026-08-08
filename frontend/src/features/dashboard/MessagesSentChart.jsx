import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
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

export function MessagesSentChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "messages-trend"],
    queryFn: dashboardApi.getMessagesTrend,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages sent</CardTitle>
        <CardDescription>
          Sent vs delivered over the last 14 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-56 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={data}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              barGap={3}
            >
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
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                iconType="circle"
                iconSize={8}
              />
              <Bar
                dataKey="sent"
                name="Sent"
                fill="var(--color-brand-200)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="delivered"
                name="Delivered"
                fill="var(--color-brand-600)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
