import { useState } from "react";
import { User, Mail, Phone, Lock, Shield, Upload } from "lucide-react";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function AddUserModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Receptionist",
    status: "Active",
    password: "",
    confirmPassword: "",
  });

  if (!open) return null;

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl animate-[var(--animate-in)]">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-semibold">Add User</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Create a new dashboard user.
            </p>
          </div>

          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Body */}

        <div className="space-y-8 p-6">
          {/* Avatar */}

          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 text-3xl font-semibold text-brand-700">
              ?
            </div>

            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
          </div>

          {/* Personal */}

          <div>
            <h3 className="mb-4 font-semibold">Personal Information</h3>

            <div className="grid gap-5 md:grid-cols-2">
              <Field icon={User} label="Full Name">
                <Input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </Field>

              <Field icon={Mail} label="Email">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>

              <Field icon={Phone} label="Phone">
                <Input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </Field>

              <Field icon={Shield} label="Role">
                <select
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  className="h-10 w-full rounded-lg border px-3"
                >
                  <option>Administrator</option>
                  <option>Doctor</option>
                  <option>Coordinator</option>
                  <option>Receptionist</option>
                </select>
              </Field>
            </div>
          </div>

          {/* Account */}

          <div>
            <h3 className="mb-4 font-semibold">Account</h3>

            <div className="grid gap-5 md:grid-cols-2">
              <Field icon={Lock} label="Password">
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
              </Field>

              <Field icon={Lock} label="Confirm Password">
                <Input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                />
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                  className="h-10 w-full rounded-lg border px-3"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </Field>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button className="bg-brand-600 hover:bg-brand-700">
            Create User
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium">
        {Icon && <Icon className="h-4 w-4 text-zinc-500" />}

        {label}
      </label>

      {children}
    </div>
  );
}
