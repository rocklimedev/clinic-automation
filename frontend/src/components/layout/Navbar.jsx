import { Bell, Menu, Moon, Sun, ChevronDown } from 'lucide-react'
import { SearchInput } from '@/components/common/SearchInput'
import { Avatar } from '@/components/ui/Avatar'
import { DropdownMenu, DropdownItem } from '@/components/ui/DropdownMenu'
import { useState } from 'react'
import { useDarkMode } from '@/hooks/useDarkMode'

export function Navbar({ onOpenMobile, clinicName = 'Sunrise Multispeciality Clinic' }) {
  const [search, setSearch] = useState('')
  const [dark, setDark] = useDarkMode()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]/85 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onOpenMobile}
        className="rounded-lg p-2 text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/60 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden items-center gap-2 lg:flex">
        <p className="text-sm font-medium text-[rgb(var(--fg))]">{clinicName}</p>
      </div>

      <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:flex-initial sm:gap-3">
        <div className="hidden w-64 sm:block">
          <SearchInput value={search} onChange={setSearch} placeholder="Search patients, logs…" />
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/60"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[rgb(var(--muted-fg))] hover:bg-[rgb(var(--border))]/60">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
        </button>

        <DropdownMenu
          trigger={
            <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-[rgb(var(--border))]/60">
              <Avatar name="Anjali Rawat" size="sm" />
              <div className="hidden text-left leading-tight sm:block">
                <p className="text-xs font-medium text-[rgb(var(--fg))]">Anjali Rawat</p>
                <p className="text-[11px] text-[rgb(var(--muted-fg))]">Front Desk Admin</p>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-[rgb(var(--muted-fg))] sm:block" />
            </button>
          }
        >
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Team members</DropdownItem>
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </div>
    </header>
  )
}
