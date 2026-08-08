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

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../components/ui/table";

import { DropdownMenu, DropdownItem } from "../../components/ui/DropdownMenu";

import { Avatar, AvatarFallback } from "../../components/ui/Avatar";

import AddUserModal from "./AddUserModal";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../services/users.api";

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data, isLoading, isFetching, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  /**
   * Normalize API response
   */
  const users = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    }

    const response = data;

    if (Array.isArray(response?.users)) {
      return response.users;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    return [];
  }, [data]);

  /**
   * Search users
   */
  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return users;
    }

    return users.filter((user) => {
      const name = user.name || user.fullName || "";
      const email = user.email || "";

      const role =
        typeof user.role === "object" ? user.role?.name || "" : user.role || "";

      return (
        name.toLowerCase().includes(keyword) ||
        email.toLowerCase().includes(keyword) ||
        role.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  /**
   * Delete user
   */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      console.error(error);
      window.alert("Failed to delete user.");
    }
  };

  /**
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border bg-white">
        <div className="text-sm text-zinc-500">Loading users...</div>
      </div>
    );
  }

  /**
   * Error state
   */
  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border bg-white">
        <div className="text-sm text-red-500">Failed to load users.</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      {/* ========================================================= */}
      {/* TOOLBAR */}
      {/* ========================================================= */}

      <div className="flex flex-col gap-4 border-b border-zinc-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full pl-10"
          />
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <Button
            className="w-full bg-brand-600 hover:bg-brand-700 sm:w-auto"
            onClick={() => setOpenAddModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TABLE */}
      {/* ========================================================= */}

      <div className="w-full overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">User</TableHead>

              <TableHead className="whitespace-nowrap">Email</TableHead>

              <TableHead className="whitespace-nowrap">Phone</TableHead>

              <TableHead className="whitespace-nowrap">Role</TableHead>

              <TableHead className="whitespace-nowrap">Status</TableHead>

              <TableHead className="whitespace-nowrap text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-zinc-500"
                >
                  {search ? "No users match your search." : "No users found."}
                </TableCell>
              </TableRow>
            )}

            {filteredUsers.map((user) => {
              const role =
                typeof user.role === "object" ? user.role?.name : user.role;

              const name = user.name || user.fullName || "Unknown User";

              const status = user.status || "Inactive";

              const initials = name
                .trim()
                .split(/\s+/)
                .map((part) => part[0])
                .filter(Boolean)
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <TableRow key={user.id}>
                  {/* User */}
                  <TableCell>
                    <div className="flex min-w-[200px] items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-brand-100 text-brand-700">
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="truncate font-medium text-zinc-900">
                          {name}
                        </div>

                        <div className="text-xs text-zinc-500">
                          User ID #{user.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="whitespace-nowrap">
                    {user.email || "-"}
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="whitespace-nowrap">
                    {user.phone || "-"}
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <RoleBadge role={role} />
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu
                      align="end"
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${name}`}
                        >
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
                        {deleting ? "Deleting..." : "Delete User"}
                      </DropdownItem>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <div className="flex flex-col gap-4 border-t border-zinc-200 p-4 sm:p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <span className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-medium text-zinc-700">
            {filteredUsers.length}
          </span>{" "}
          of <span className="font-medium text-zinc-700">{users.length}</span>{" "}
          users
        </span>

        <div className="flex w-full gap-2 sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
            disabled
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
            disabled
          >
            Next
          </Button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ADD USER MODAL */}
      {/* ========================================================= */}

      <AddUserModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </div>
  );
}

/* ============================================================= */
/* STATUS BADGE */
/* ============================================================= */

function StatusBadge({ status }) {
  const active = String(status).toLowerCase() === "active";

  return (
    <Badge
      className={
        active
          ? "whitespace-nowrap bg-green-100 text-green-700 hover:bg-green-100"
          : "whitespace-nowrap bg-red-100 text-red-700 hover:bg-red-100"
      }
    >
      {status}
    </Badge>
  );
}

/* ============================================================= */
/* ROLE BADGE */
/* ============================================================= */

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
      className={
        colors[role || ""] || "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"
      }
    >
      {role || "N/A"}
    </Badge>
  );
}
