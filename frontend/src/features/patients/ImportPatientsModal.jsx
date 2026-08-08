import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { Badge } from "../../components/ui/Badge";
import { patientsApi } from "../../services/patients.api";

const TARGET_FIELDS = [
  { key: "name", label: "Full Name" },
  { key: "mobile", label: "Mobile Number" },
  { key: "doctorName", label: "Doctor Name" },
  { key: "visitType", label: "Visit Type" },
];

// Dummy parsed rows to simulate a CSV/Excel upload, since this is a frontend-only build.
const SAMPLE_HEADERS = ["Patient", "Phone", "Doctor", "Type"];
const SAMPLE_ROWS = [
  ["Rahul Mehta", "9876543210", "Dr. Arvind Sethi", "New"],
  ["Sneha Kulkarni", "9822011234", "Dr. Meenal Kulkarni", "Follow-up"],
  ["Imran Sheikh", "9900112233", "Dr. Ravi Chandran", "New"],
  ["Priya Nair", "9845098450", "Dr. Lisa Fernandes", "Follow-up"],
];

export function ImportPatientsModal({ open, onClose }) {
  const [step, setStep] = useState("upload"); // upload -> mapping -> success
  const [fileName, setFileName] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [mapping, setMapping] = useState({
    name: "Patient",
    mobile: "Phone",
    doctorName: "Doctor",
    visitType: "Type",
  });
  const queryClient = useQueryClient();

  const importMutation = useMutation({
    mutationFn: () => {
      const rows = SAMPLE_ROWS.map((r) => {
        const rowObj = Object.fromEntries(
          SAMPLE_HEADERS.map((h, i) => [h, r[i]]),
        );
        return {
          name: rowObj[mapping.name],
          mobile: rowObj[mapping.mobile],
          whatsapp: rowObj[mapping.mobile],
          doctorName: rowObj[mapping.doctorName],
          visitType: rowObj[mapping.visitType],
          visitDate: new Date().toISOString(),
          opdLocation: "Main OPD",
          coordinator: "Anjali Rawat",
        };
      });
      return patientsApi.bulkImport(rows);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      setStep("success");
    },
  });

  const handleFile = useCallback((file) => {
    if (!file) return;
    setFileName(file.name);
    setStep("mapping");
  }, []);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("upload");
      setFileName(null);
    }, 200);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Import patients"
      description="Upload a CSV or Excel file to bulk add patients."
      size="lg"
      footer={
        step === "mapping" ? (
          <>
            <Button variant="secondary" onClick={() => setStep("upload")}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Button>
            <Button
              onClick={() => importMutation.mutate()}
              disabled={importMutation.isPending}
            >
              {importMutation.isPending ? "Importing…" : "Confirm & import"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </>
        ) : step === "success" ? (
          <Button onClick={handleClose}>Done</Button>
        ) : null
      }
    >
      {step === "upload" && (
        <div>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
              dragActive
                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/10"
                : "border-[rgb(var(--border-strong))]"
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/30">
              <UploadCloud className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-[rgb(var(--fg))]">
              Drag and drop your file here
            </p>
            <p className="mt-1 text-xs text-[rgb(var(--muted-fg))]">
              Supports CSV and Excel (.xlsx) files up to 10MB
            </p>
            <label className="mt-4 cursor-pointer">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={(e) =>
                  e.currentTarget.parentElement.querySelector("input").click()
                }
              >
                Browse files
              </Button>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[rgb(var(--border))]/40 px-3 py-2 text-xs text-[rgb(var(--muted-fg))]">
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Need a template? Download our sample CSV to get the columns right.
          </div>
        </div>
      )}

      {step === "mapping" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-sm">
            <FileSpreadsheet className="h-4 w-4 text-brand-600" />
            <span className="font-medium text-[rgb(var(--fg))]">
              {fileName || "patients_import.csv"}
            </span>
            <Badge variant="success" className="ml-auto">
              {SAMPLE_ROWS.length} rows detected
            </Badge>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[rgb(var(--fg))]">
              Map columns
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TARGET_FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-[rgb(var(--muted-fg))]">
                    {field.label}
                  </label>
                  <Select
                    value={mapping[field.key]}
                    onChange={(e) =>
                      setMapping((m) => ({ ...m, [field.key]: e.target.value }))
                    }
                  >
                    {SAMPLE_HEADERS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[rgb(var(--fg))]">
              Preview
            </p>
            <div className="overflow-x-auto rounded-lg border border-[rgb(var(--border))]">
              <table className="w-full text-xs">
                <thead className="bg-[rgb(var(--border))]/30">
                  <tr>
                    {SAMPLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left font-semibold text-[rgb(var(--muted-fg))]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_ROWS.map((r, i) => (
                    <tr
                      key={i}
                      className="border-t border-[rgb(var(--border))]"
                    >
                      {r.map((c, j) => (
                        <td key={j} className="px-3 py-2 text-[rgb(var(--fg))]">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="text-base font-semibold text-[rgb(var(--fg))]">
            Import complete
          </p>
          <p className="mt-1 max-w-sm text-sm text-[rgb(var(--muted-fg))]">
            {SAMPLE_ROWS.length} patients were added successfully and are now
            queued for the feedback automation.
          </p>
        </div>
      )}
    </Modal>
  );
}
