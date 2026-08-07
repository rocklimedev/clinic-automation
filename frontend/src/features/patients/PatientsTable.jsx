import { useMemo, useState } from "react";

import {
  useGetPatientsQuery,
  useDeletePatientMutation,
  useResendWhatsappMutation,
} from "@/services/patients.api";

import { DataTable } from "@/components/common/DataTable";
import { buildColumns } from "./columns";
import { useDebounce } from "@/hooks/useDebounce";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function PatientsTable({
  search,
  status,
  visitType,
  onView,
  onNotify,
  registerExport,
}) {
  const [page, setPage] = useState(1);

  const [sorting, setSorting] = useState([
    {
      id: "visitDate",
      desc: true,
    },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const pageSize = 10;

  const debouncedSearch = useDebounce(search, 300);

  const sortBy = sorting[0]?.id;

  const sortDir = sorting[0]?.desc ? "desc" : "asc";

  /*
    GET PATIENTS
  */

  const { data, isLoading } = useGetPatientsQuery({
    search: debouncedSearch,
    status,
    visitType,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  /*
    DELETE PATIENT
  */

  const [deletePatient, { isLoading: deleting }] = useDeletePatientMutation();

  /*
    RESEND WHATSAPP
  */

  const [resendWhatsapp] = useResendWhatsappMutation();

  const rows = (data ?? []).map((patient) => {
    const visit = patient.visits?.[0];

    return {
      id: patient.id,

      name: patient.full_name,

      mobile: patient.mobile,

      doctorName: visit?.doctor_name ?? "-",

      visitDate: visit ? `${visit.visit_date}T${visit.visit_time}` : null,

      visitType: visit?.visit_type ?? "-",

      status: visit?.feedback_status ?? "-",

      whatsappStatus: visit?.feedback_status ?? "-",

      feedbackReceived: false,

      feedbackRating: 0,
    };
  });
  const total = data?.total ?? 0;

  const allSelected =
    rows.length > 0 && rows.every((row) => selectedIds.includes(row.id));

  const handleDelete = async () => {
    if (!deleteTarget) return;

    await deletePatient(deleteTarget.id);

    setDeleteTarget(null);

    onNotify?.("Patient deleted");
  };

  const handleBulkDelete = async () => {
    await Promise.all(selectedIds.map((id) => deletePatient(id)));

    setSelectedIds([]);

    setBulkDeleteOpen(false);

    onNotify?.("Selected patients deleted");
  };

  const columns = useMemo(
    () =>
      buildColumns({
        selectedIds,

        onToggleRow: (id) =>
          setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
          ),

        onToggleAll: () =>
          setSelectedIds((prev) =>
            allSelected
              ? prev.filter((id) => !rows.some((row) => row.id === id))
              : [...new Set([...prev, ...rows.map((row) => row.id)])],
          ),

        allSelected,

        onView,

        onDelete: (row) => setDeleteTarget(row),

        onResend: (row) => {
          resendWhatsapp(row.id)
            .unwrap()
            .then(() => {
              onNotify?.("WhatsApp message re-queued");
            });
        },
      }),

    [selectedIds, allSelected, rows, onView, onNotify, resendWhatsapp],
  );

  return (
    <>
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3">
          <span>{selectedIds.length} selected</span>

          <button
            className="
              font-medium
              text-brand-700
              hover:underline
              dark:text-brand-300
              "
            onClick={() => setBulkDeleteOpen(true)}
          >
            Delete selected
          </button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={rows}
        loading={isLoading}
        sorting={sorting}
        onSortingChange={(id) =>
          setSorting((prev) => {
            const existing = prev.find((s) => s.id === id);

            if (!existing)
              return [
                {
                  id,
                  desc: false,
                },
              ];

            return [
              {
                id,
                desc: !existing.desc,
              },
            ];
          })
        }
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onRowClick={onView}
        emptyTitle="No patients found"
        emptyDescription="
        Try a different search term or clear your filters.
        "
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete patient?"
        description={`This will permanently remove ${
          deleteTarget?.name ?? "this patient"
        } and their automation history.`}
        confirmLabel="Delete patient"
        loading={deleting}
      />

      <ConfirmDialog
        open={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        title={`Delete ${selectedIds.length} patients?`}
        description="
        This will permanently remove the selected patients and their automation history.
        "
        confirmLabel="Delete selected"
        loading={deleting}
      />

      <PatientsTableExports
        data={rows}
        total={total}
        registerExport={registerExport}
      />
    </>
  );
}

// CSV EXPORT

function PatientsTableExports({
  data,

  total,

  registerExport,
}) {
  useMemo(() => {
    registerExport?.(() => {
      const headers = [
        "ID",
        "Name",
        "Mobile",
        "Doctor",
        "Visit Date",
        "Visit Type",
        "Status",
        "WhatsApp Status",
      ];

      const csvRows = data.map((p) =>
        [
          p.id,

          p.name,

          p.mobile,

          p.doctorName,

          p.visitDate,

          p.visitType,

          p.status,

          p.whatsappStatus,
        ].join(","),
      );

      const csv = [headers.join(","), ...csvRows].join("\n");

      const blob = new Blob([csv], {
        type: "text/csv",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "patients_export.csv";

      a.click();

      URL.revokeObjectURL(url);
    });
  }, [data, registerExport]);

  return null;
}
