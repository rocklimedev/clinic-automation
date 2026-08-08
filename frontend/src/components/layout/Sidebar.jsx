import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  MessageSquareText,
  Workflow,
  ScrollText,
  Settings,
  MessageCircle,
  X,
  User,
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/templates", label: "Templates", icon: MessageSquareText },
  { to: "/automations", label: "Automations", icon: Workflow },
  { to: "/logs", label: "Message Logs", icon: ScrollText },
  { to: "/users", label: "Users", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ mobileOpen, onCloseMobile }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-[rgb(var(--border))] bg-[rgb(var(--sidebar))] transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-soft">
              <MessageCircle className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-[rgb(var(--fg))]">
                FeedbackFlow
              </p>
              <p className="text-[11px] text-[rgb(var(--muted-fg))]">
                Patient Engagement
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="text-[rgb(var(--muted-fg))] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                    : "text-[rgb(var(--sidebar-fg))] hover:bg-[rgb(var(--border))]/60",
                )
              }
            >
              <item.icon className="h-4.5 w-4.5" strokeWidth={2} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[rgb(var(--border))] p-4">
          <div className="rounded-lg bg-[rgb(var(--border))]/40 p-3">
            <p className="text-xs font-medium text-[rgb(var(--fg))]">
              Meta Cloud API
            </p>
            <p className="mt-0.5 text-[11px] text-[rgb(var(--muted-fg))]">
              Not connected yet — configure in Settings.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
