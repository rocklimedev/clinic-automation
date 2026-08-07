import { useState } from "react";
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
import AddUserModal from "./AddUserModal";
import { Avatar, AvatarFallback } from "../../components/ui/Avatar";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { DropdownMenu, DropdownItem } from "../../components/ui/DropdownMenu";
const users = [
  {
    id: 1,
    name: "Dr. Yogesh Chhabra",
    email: "doctor@clinic.com",
    phone: "+91 9876543210",
    role: "Doctor",
    status: "Active",
  },
  {
    id: 2,
    name: "Nitin Sharma",
    email: "nitin@clinic.com",
    phone: "+91 9876543211",
    role: "Coordinator",
    status: "Active",
  },
  {
    id: 3,
    name: "Priya Verma",
    email: "reception@clinic.com",
    phone: "+91 9876543212",
    role: "Receptionist",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@clinic.com",
    phone: "+91 9876543213",
    role: "Administrator",
    status: "Active",
  },
];

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="rounded-2xl border bg-white shadow-soft-md">
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
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-brand-100 text-brand-700">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-medium">{user.name}</div>

                    <div className="text-xs text-zinc-500">
                      User ID #{user.id}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.phone}</TableCell>

              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>

              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu
                  trigger={
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                  align="end"
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
                    onClick={() => console.log("Role", user.id)}
                  >
                    Change Role
                  </DropdownItem>

                  <DropdownItem
                    icon={KeyRound}
                    onClick={() => console.log("Reset", user.id)}
                  >
                    Reset Password
                  </DropdownItem>

                  <div className="my-1 border-t border-[rgb(var(--border))]" />

                  <DropdownItem
                    icon={Trash2}
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => console.log("Delete", user.id)}
                  >
                    Delete User
                  </DropdownItem>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Footer */}

      <div className="flex items-center justify-between border-t p-6">
        <span className="text-sm text-zinc-500">
          Showing {filteredUsers.length} users
        </span>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>

          <Button variant="outline" size="sm">
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
  return (
    <Badge
      className={
        status === "Active"
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

    Doctor: "bg-blue-100 text-blue-700 hover:bg-blue-100",

    Coordinator: "bg-amber-100 text-amber-700 hover:bg-amber-100",

    Receptionist: "bg-zinc-100 text-zinc-700 hover:bg-zinc-100",
  };

  return (
    <Badge
      className={colors[role] ?? "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"}
    >
      {role}
    </Badge>
  );
}
