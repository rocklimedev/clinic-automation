import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardApi } from "../../services/dashboard.api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import { Skeleton } from "../../components/ui/Skeleton";

const COLORS = [
  "var(--color-brand-600)",
  "var(--color-brand-300)",
  "rgb(var(--border-strong))",
];

export function ReviewConversionChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "review-conversion"],
    queryFn: dashboardApi.getReviewConversion,
  });

  const total = data?.reduce((s, d) => s + d.value, 0) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review conversion</CardTitle>
        <CardDescription>Where delivered messages end up</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-56 w-full" />
        ) : (
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={2}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid rgb(var(--border))",
                    background: "rgb(var(--card))",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {data.map((d, i) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2 text-[rgb(var(--muted-fg))]">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    {d.name}
                  </span>
                  <span className="font-medium text-[rgb(var(--fg))]">
                    {total ? Math.round((d.value / total) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
