import { Building2, MessageCircle, Star, Clock3, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-[var(--animate-in)]">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold">Settings</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Configure your clinic and patient feedback automation.
        </p>
      </div>

      {/* Clinic */}
      <SettingsCard
        icon={<Building2 className="h-5 w-5 text-brand-700" />}
        title="Clinic Information"
        description="Basic information shown throughout the platform."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Clinic Name" placeholder="ABC Dental Clinic" />
          <Input label="Default Doctor" placeholder="Dr. Yogesh Chhabra" />
          <Input label="Timezone" placeholder="Asia/Kolkata" />
          <Input label="Google Review Link" placeholder="https://g.page/..." />
        </div>
      </SettingsCard>

      {/* WhatsApp */}
      <SettingsCard
        icon={<MessageCircle className="h-5 w-5 text-brand-700" />}
        title="WhatsApp Business"
        description="Meta Cloud API configuration."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Phone Number ID" />
          <Input label="Business Account ID" />
          <Input label="Access Token" type="password" />
          <Input label="Webhook Verify Token" />
        </div>
      </SettingsCard>

      {/* Feedback */}
      <SettingsCard
        icon={<Star className="h-5 w-5 text-brand-700" />}
        title="Feedback Configuration"
        description="Customize the patient review workflow."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Positive Rating Threshold" placeholder="4 Stars" />

          <Input
            label="Default Feedback Template"
            placeholder="Patient Feedback"
          />

          <Input
            label="Google Review Button Text"
            placeholder="Leave a Review"
          />

          <Input label="Internal Feedback Form URL" placeholder="https://..." />
        </div>
      </SettingsCard>

      {/* Automation */}
      <SettingsCard
        icon={<Clock3 className="h-5 w-5 text-brand-700" />}
        title="Automation Settings"
        description="Configure when automated messages should be sent."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Send Feedback After" placeholder="2 Hours" />

          <Input label="Reminder After" placeholder="24 Hours" />

          <Input label="Maximum Retries" placeholder="2" />

          <Input label="Working Hours" placeholder="09:00 AM - 07:00 PM" />
        </div>
      </SettingsCard>

      <div className="flex justify-end">
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-white hover:bg-brand-700 transition">
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

function SettingsCard({ icon, title, description, children }) {
  return (
    <div className="rounded-2xl border bg-white shadow-soft-md">
      <div className="border-b px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-brand-100 p-3">{icon}</div>

          <div>
            <h2 className="font-semibold text-lg">{title}</h2>

            <p className="text-sm text-zinc-500">{description}</p>
          </div>
        </div>
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
}

function Input({ label, type = "text", placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}
