import { Users, UserCheck, Shield, Stethoscope, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <div className="space-y-8 animate-[var(--animate-in)]">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Users & Roles
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage dashboard users, roles and permissions.
          </p>
        </div>

        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>

          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTable />
        </TabsContent>

        <TabsContent value="roles">
          <RolesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-soft transition hover:shadow-soft-md">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-brand-100 p-3 text-brand-700">{icon}</div>
      </div>

      <h3 className="mt-5 text-sm font-medium text-zinc-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>

      <p className="mt-2 text-xs text-zinc-400">{subtitle}</p>
    </div>
  );
}
