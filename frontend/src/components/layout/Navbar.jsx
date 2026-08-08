import { Bell, Menu, Moon, Sun, ChevronDown } from "lucide-react";
import { SearchInput } from "../../components/common/SearchInput";
import { Avatar } from "../../components/ui/Avatar";
import { DropdownMenu, DropdownItem } from "../../components/ui/DropdownMenu";
import { useState } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuth } from "../../hooks/AuthContext";
export function Navbar({
  onOpenMobile,
  clinicName = "Sunrise Multispeciality Clinic",
}) {
  const [search, setSearch] = useState("");
  const [dark, setDark] = useDarkMode();

  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 lg:px-6">
      <button
        onClick={onOpenMobile}
        className="mr-3 rounded-lg p-2 hover:bg-[rgb(var(--border))]/60 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden items-center gap-2 lg:flex">
        <p className="text-sm font-medium text-[rgb(var(--fg))]">
          {clinicName}
        </p>
      </div>

      <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:flex-initial sm:gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/60"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <Sun className="h-4.5 w-4.5" />
          ) : (
            <Moon className="h-4.5 w-4.5" />
          )}
        </button>

        <DropdownMenu
          trigger={
            <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-[rgb(var(--border))]/60">
              <Avatar name={user?.name || user?.fullName || "User"} size="sm" />

              <div className="hidden text-left leading-tight sm:block">
                <p className="text-xs font-medium text-[rgb(var(--fg))]">
                  {user?.name || user?.fullName || "User"}
                </p>

                <p className="text-[11px] text-[rgb(var(--muted-fg))]">
                  {user?.role?.name ||
                    user?.role ||
                    user?.designation ||
                    "Staff"}
                </p>
              </div>

              <ChevronDown className="hidden h-3.5 w-3.5 text-[rgb(var(--muted-fg))] sm:block" />
            </button>
          }
        >
          <DropdownItem onClick={logout}>Sign out</DropdownItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
