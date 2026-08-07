import {
  Play,
  Pause,
  Clock3,
  MessageCircle,
  Star,
  AlertCircle,
  ChevronRight,
  Activity,
} from "lucide-react";

export default function AutomationsPage() {
  return (
    <div className="space-y-8 animate-[var(--animate-in)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Automations</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Configure automated patient feedback workflows.
          </p>
        </div>

        <button className="rounded-lg bg-brand-600 px-4 py-2 text-white shadow-soft hover:bg-brand-700 transition">
          Create Workflow
        </button>
      </div>

      {/* Workflow Card */}

      <div className="rounded-2xl border bg-white shadow-soft-md">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-brand-100 p-3">
                <Activity className="h-5 w-5 text-brand-700" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  Patient Feedback Automation
                </h2>

                <p className="text-sm text-zinc-500">
                  Automatically collect feedback after every visit.
                </p>
              </div>
            </div>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Active
          </span>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between">
            <WorkflowStep icon={<Clock3 size={18} />} title="Visit Completed" />

            <ChevronRight />

            <WorkflowStep icon={<Clock3 size={18} />} title="Wait 2 Hours" />

            <ChevronRight />

            <WorkflowStep
              icon={<MessageCircle size={18} />}
              title="Send WhatsApp"
            />

            <ChevronRight />

            <WorkflowStep icon={<Clock3 size={18} />} title="Await Reply" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <OutcomeCard
              icon={<Star size={18} />}
              title="Positive Feedback"
              description="Patient receives Google Review link."
              color="green"
            />

            <OutcomeCard
              icon={<AlertCircle size={18} />}
              title="Negative Feedback"
              description="Patient is redirected to an internal feedback form."
              color="amber"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-6 py-5">
          <div className="flex gap-8 text-sm">
            <Stat label="Runs" value="1,245" />

            <Stat label="Success Rate" value="98.6%" />

            <Stat label="Last Trigger" value="10 mins ago" />
          </div>

          <div className="flex gap-3">
            <button className="rounded-lg border px-4 py-2 hover:bg-zinc-50">
              Configure
            </button>

            <button className="rounded-lg border px-4 py-2 hover:bg-zinc-50 flex items-center gap-2">
              <Pause size={16} />
              Pause
            </button>

            <button className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
              View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({ icon, title }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
        {icon}
      </div>

      <span className="text-sm font-medium">{title}</span>
    </div>
  );
}

function OutcomeCard({ icon, title, description, color }) {
  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <div
          className={`rounded-lg p-2 ${
            color === "green"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>

          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </div>

      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
