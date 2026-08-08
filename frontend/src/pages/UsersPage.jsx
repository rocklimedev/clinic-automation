import { Users, UserCheck, Shield, Stethoscope, Plus } from "lucide-react";

import { Button } from "../components/ui/Button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";

import UsersTable from "../features/user-rbac/UsersTable";
import RolesTable from "../features/user-rbac/RolesTable";

export default function UsersPage() {
  return (
    <div className="w-full space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Users & Roles
          </h1>

          <p className="mt-1 text-sm text-zinc-500 sm:mt-2">
            Manage dashboard users, roles and permissions.
          </p>
        </div>

        <Button className="w-full bg-brand-600 hover:bg-brand-700 sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          title="Total Users"
          value="18"
          subtitle="+2 this month"
        />

        <StatCard
          icon={<UserCheck className="h-5 w-5" />}
          title="Active Users"
          value="15"
          subtitle="83% Active"
        />

        <StatCard
          icon={<Shield className="h-5 w-5" />}
          title="Administrators"
          value="2"
          subtitle="Full Access"
        />

        <StatCard
          icon={<Stethoscope className="h-5 w-5" />}
          title="Doctors"
          value="7"
          subtitle="Patient Access"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="w-full space-y-5 sm:space-y-6">
        {/* Responsive Tabs */}
        <div className="w-full overflow-x-auto">
          <TabsList className="grid h-10 w-full min-w-[220px] max-w-sm grid-cols-2">
            <TabsTrigger value="users" className="text-sm">
              Users
            </TabsTrigger>

            <TabsTrigger value="roles" className="text-sm">
              Roles
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users" className="mt-0 w-full overflow-hidden">
          <UsersTable />
        </TabsContent>

        <TabsContent value="roles" className="mt-0 w-full overflow-hidden">
          <RolesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        {icon}
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-zinc-500">{title}</h3>

        <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {value}
        </p>

        <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
}
