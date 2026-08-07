import { useState } from "react";
import { Shield, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PERMISSIONS = [
  {
    module: "Dashboard",
    actions: ["View"],
  },
  {
    module: "Patients",
    actions: ["View", "Create", "Edit", "Delete", "Import", "Export"],
  },
  {
    module: "Automations",
    actions: ["View", "Create", "Edit", "Pause", "Delete"],
  },
  {
    module: "Templates",
    actions: ["View", "Create", "Edit", "Delete"],
  },
  {
    module: "Logs",
    actions: ["View", "Export"],
  },
  {
    module: "Users",
    actions: ["View", "Create", "Edit", "Delete"],
  },
  {
    module: "Roles",
    actions: ["View", "Create", "Edit", "Delete"],
  },
  {
    module: "Settings",
    actions: ["View", "Update"],
  },
];

export default function RoleModal({ open, onClose }) {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState({});

  if (!open) return null;

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-100 p-3">
              <Shield className="h-5 w-5 text-brand-700" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Create Role</h2>

              <p className="text-sm text-zinc-500">
                Configure role permissions.
              </p>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Role Name
              </label>

              <Input
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Doctor"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Doctors can manage patients..."
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Permissions</h3>

            <div className="space-y-6">
              {PERMISSIONS.map((section) => (
                <div key={section.module} className="rounded-xl border">
                  <div className="border-b bg-zinc-50 px-5 py-3 font-semibold">
                    {section.module}
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                    {section.actions.map((action) => {
                      const key = `${section.module}.${action}`;

                      return (
                        <label
                          key={key}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-zinc-50"
                        >
                          <input
                            type="checkbox"
                            checked={permissions[key] || false}
                            onChange={() => togglePermission(key)}
                            className="h-4 w-4 accent-green-600"
                          />

                          <div>
                            <div className="font-medium">{action}</div>

                            <div className="text-xs text-zinc-500">
                              {section.module}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button className="bg-brand-600 hover:bg-brand-700">
            <Save className="mr-2 h-4 w-4" />
            Save Role
          </Button>
        </div>
      </div>
    </div>
  );
}
