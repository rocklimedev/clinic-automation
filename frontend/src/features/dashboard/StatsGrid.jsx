import { useQuery } from "@tanstack/react-query";
import {
  Users,
  UserPlus,
  Send,
  CheckCheck,
  MessageSquareHeart,
  Star,
  Clock,
  AlertOctagon,
} from "lucide-react";
import { dashboardApi } from "../../services/dashboard.api";
import { StatsCard } from "../../components/common/StatsCard";
import { formatNumber } from "../../lib/utils";

export function StatsGrid() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardApi.getStats,
  });

  const cards = [
    {
      key: "totalPatients",
      label: "Total Patients",
      icon: Users,
      trend: 4.2,
      trendLabel: "vs last month",
    },
    {
      key: "todaysPatients",
      label: "Today's Patients",
      icon: UserPlus,
      trend: 12,
      trendLabel: "vs yesterday",
    },
    {
      key: "messagesSent",
      label: "Messages Sent",
      icon: Send,
      trend: 8.1,
      trendLabel: "vs last week",
    },
    {
      key: "messagesDelivered",
      label: "Messages Delivered",
      icon: CheckCheck,
      trend: 6.4,
      trendLabel: "delivery rate",
    },
    {
      key: "feedbackReceived",
      label: "Feedback Received",
      icon: MessageSquareHeart,
      trend: 15,
      trendLabel: "response rate",
    },
    {
      key: "googleReviews",
      label: "Google Reviews",
      icon: Star,
      trend: 9.3,
      trendLabel: "conversion",
    },
    {
      key: "pendingMessages",
      label: "Pending Messages",
      icon: Clock,
      trend: -3.1,
      trendLabel: "vs last week",
      tone: "warning",
    },
    {
      key: "failedMessages",
      label: "Failed Messages",
      icon: AlertOctagon,
      trend: -2.4,
      trendLabel: "vs last week",
      tone: "danger",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <StatsCard
          key={c.key}
          label={c.label}
          icon={c.icon}
          tone={c.tone}
          trend={c.trend}
          trendLabel={c.trendLabel}
          value={isLoading ? "—" : formatNumber(stats[c.key])}
          loading={isLoading}
        />
      ))}
    </div>
  );
}
