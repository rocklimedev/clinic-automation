import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  KeyRound,
  Eye,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { DropdownMenu, DropdownItem } from "@/components/ui/DropdownMenu";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";

import AddUserModal from "./AddUserModal";

import { useGetUsersQuery, useDeleteUserMutation } from "@/services/users.api";

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data, isLoading, isFetching, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const users = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.users)) return data.users;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase();

    return users.filter((user) => {
      const name = user.name || user.fullName || "";

      const email = user.email || "";

      const role =
        typeof user.role === "object"
          ? (user.role?.name ?? "")
          : (user.role ?? "");

      return (
        name.toLowerCase().includes(keyword) ||
        email.toLowerCase().includes(keyword) ||
        role.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-600">
        Failed to load users.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <Button
            className="bg-brand-600 hover:bg-brand-700"
            onClick={() => setOpenAddModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Table */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Phone</TableHead>

            <TableHead>Role</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-zinc-500"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}

          {filteredUsers.map((user) => {
            const role =
              typeof user.role === "object" ? user.role?.name : user.role;

            const name = user.name || user.fullName || "Unknown User";

            const status = user.status || "Inactive";

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-brand-100 text-brand-700">
                        {name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="font-medium">{name}</div>

                      <div className="text-xs text-zinc-500">
                        User ID #{user.id}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{user.email || "-"}</TableCell>

                <TableCell>{user.phone || "-"}</TableCell>

                <TableCell>
                  <RoleBadge role={role} />
                </TableCell>

                <TableCell>
                  <StatusBadge status={status} />
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu
                    align="end"
                    trigger={
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <DropdownItem
                      icon={Eye}
                      onClick={() => console.log("View", user.id)}
                    >
                      View User
                    </DropdownItem>

                    <DropdownItem
                      icon={Pencil}
                      onClick={() => console.log("Edit", user.id)}
                    >
                      Edit User
                    </DropdownItem>

                    <DropdownItem
                      icon={Shield}
                      onClick={() => console.log("Change Role", user.id)}
                    >
                      Change Role
                    </DropdownItem>

                    <DropdownItem
                      icon={KeyRound}
                      onClick={() => console.log("Reset Password", user.id)}
                    >
                      Reset Password
                    </DropdownItem>

                    <div className="my-1 border-t border-[rgb(var(--border))]" />

                    <DropdownItem
                      icon={Trash2}
                      disabled={deleting}
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete User
                    </DropdownItem>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Footer */}

      <div className="flex items-center justify-between border-t p-6">
        <span className="text-sm text-zinc-500">
          Showing {filteredUsers.length} of {users.length} users
        </span>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>

          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      <AddUserModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const active = String(status).toLowerCase() === "active";

  return (
    <Badge
      className={
        active
          ? "bg-green-100 text-green-700 hover:bg-green-100"
          : "bg-red-100 text-red-700 hover:bg-red-100"
      }
    >
      {status}
    </Badge>
  );
}

function RoleBadge({ role }) {
  const colors = {
    Administrator: "bg-purple-100 text-purple-700 hover:bg-purple-100",

    Admin: "bg-purple-100 text-purple-700 hover:bg-purple-100",

    Doctor: "bg-blue-100 text-blue-700 hover:bg-blue-100",

    Coordinator: "bg-amber-100 text-amber-700 hover:bg-amber-100",

    Receptionist: "bg-zinc-100 text-zinc-700 hover:bg-zinc-100",

    Nurse: "bg-pink-100 text-pink-700 hover:bg-pink-100",

    Staff: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  };

  return (
    <Badge
      className={colors[role] ?? "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"}
    >
      {role || "N/A"}
    </Badge>
  );
}
