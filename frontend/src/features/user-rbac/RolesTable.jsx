import {
  Plus,
  MoreHorizontal,
  Shield,
  Pencil,
  Trash2,
  Users,
  Eye,
} from "lucide-react";

import RoleModal from "./RoleModal";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../components/ui/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

import { DropdownMenu, DropdownItem } from "../../components/ui/DropdownMenu";

import { useGetRolesQuery } from "../../services/rbac.api";

const roleColors = {
  ADMIN: "bg-purple-100 text-purple-700",
  SUPER_ADMIN: "bg-red-100 text-red-700",
  DOCTOR: "bg-blue-100 text-blue-700",
  RECEPTIONIST: "bg-amber-100 text-amber-700",
  STAFF: "bg-zinc-100 text-zinc-700",
  PATIENT: "bg-green-100 text-green-700",
};

export default function RolesTable() {
  const [openRoleModal, setOpenRoleModal] = useState(false);

  const { data: rolesResponse, isLoading, isError } = useGetRolesQuery();

  const roles = rolesResponse || [];

  if (isLoading) {
    return <div className="p-6 text-center">Loading roles...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">Failed to load roles</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}

      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="rounded-xl bg-brand-100 p-3 w-fit">
              <Shield className="h-5 w-5 text-brand-700" />
            </div>

            <p className="mt-4 text-sm text-zinc-500">Total Roles</p>

            <h2 className="mt-1 text-3xl font-bold">{roles.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="rounded-xl bg-brand-100 p-3 w-fit">
              <Users className="h-5 w-5 text-brand-700" />
            </div>

            <p className="mt-4 text-sm text-zinc-500">Assigned Users</p>

            <h2 className="mt-1 text-3xl font-bold">0</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="rounded-xl bg-brand-100 p-3 w-fit">
              <Eye className="h-5 w-5 text-brand-700" />
            </div>

            <p className="mt-4 text-sm text-zinc-500">Total Permissions</p>

            <h2 className="mt-1 text-3xl font-bold">0</h2>
          </CardContent>
        </Card>
      </div>

      {/* Table */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Roles</CardTitle>

            <CardDescription>
              Manage dashboard roles and permissions.
            </CardDescription>
          </div>

          <Button
            className="bg-brand-600 hover:bg-brand-700"
            onClick={() => setOpenRoleModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>

                <TableHead>Description</TableHead>

                <TableHead>Users</TableHead>

                <TableHead>Permissions</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <Badge
                      className={
                        roleColors[role.name] || "bg-gray-100 text-gray-700"
                      }
                    >
                      {role.name}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-zinc-600">
                    {role.description || "-"}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {role.users?.length || 0} Users
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {role.permissions?.length || 0} Permissions
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu
                      trigger={
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      }
                    >
                      <DropdownItem
                        icon={Eye}
                        onClick={() => console.log(role)}
                      >
                        View Role
                      </DropdownItem>

                      <DropdownItem
                        icon={Pencil}
                        onClick={() => console.log("Edit", role.id)}
                      >
                        Edit Role
                      </DropdownItem>

                      <div className="my-1 border-t border-[rgb(var(--border))]" />

                      <DropdownItem
                        icon={Trash2}
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => console.log("Delete", role.id)}
                      >
                        Delete Role
                      </DropdownItem>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RoleModal open={openRoleModal} onClose={() => setOpenRoleModal(false)} />
    </div>
  );
}
