import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Select } from "../../components/ui/Select";
import { patientsApi } from "@/services/patients.api";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  mobile: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .max(10, "Enter a valid 10-digit mobile number")
    .regex(/^\d+$/, "Digits only"),
  whatsapp: z.string().optional().or(z.literal("")),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  gender: z.string().min(1, "Select a gender"),
  age: z.coerce.number().min(0).max(120).optional().or(z.literal("")),
  dob: z.string().optional().or(z.literal("")),
  visitDate: z.string().min(1, "Visit date is required"),
  visitTime: z.string().min(1, "Visit time is required"),
  opdLocation: z.string().min(1, "Select OPD location"),
  doctorId: z.string().min(1, "Select a doctor"),
  coordinator: z.string().min(1, "Select a coordinator"),
  visitType: z.string().min(1, "Select visit type"),
});

const OPD_LOCATIONS = [
  "OPD 1 - Ground Floor",
  "OPD 2 - First Floor",
  "OPD 3 - Annex Wing",
  "Main OPD",
];

export function PatientFormModal({ open, onClose }) {
  const queryClient = useQueryClient();
  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: patientsApi.getDoctors,
  });
  const { data: coordinators = [] } = useQuery({
    queryKey: ["coordinators"],
    queryFn: patientsApi.getCoordinators,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobile: "",
      whatsapp: "",
      email: "",
      gender: "",
      age: "",
      dob: "",
      visitDate: new Date().toISOString().slice(0, 10),
      visitTime: new Date().toTimeString().slice(0, 5),
      opdLocation: "",
      doctorId: "",
      coordinator: "",
      visitType: "New",
    },
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const createMutation = useMutation({
    mutationFn: (payload) => {
      const doctor = doctors.find((d) => d.id === payload.doctorId);
      const visitDate = new Date(`${payload.visitDate}T${payload.visitTime}`);
      return patientsApi.create({
        name: payload.name,
        mobile: payload.mobile,
        whatsapp: payload.whatsapp || payload.mobile,
        email: payload.email,
        gender: payload.gender,
        age: payload.age || null,
        dob: payload.dob || null,
        doctorId: payload.doctorId,
        doctorName: doctor?.name ?? "",
        coordinator: payload.coordinator,
        opdLocation: payload.opdLocation,
        visitType: payload.visitType,
        visitDate: visitDate.toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      onClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add new patient"
      description="Capture visit details to kick off the feedback automation."
      size="xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit((v) => createMutation.mutate(v))}
            disabled={isSubmitting || createMutation.isPending}
          >
            {createMutation.isPending ? "Saving…" : "Save patient"}
          </Button>
        </>
      }
    >
      <form
        className="space-y-8"
        onSubmit={handleSubmit((v) => createMutation.mutate(v))}
      >
        <section>
          <h3 className="text-sm font-semibold text-[rgb(var(--fg))]">
            Basic Information
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label required>Full Name</Label>
              <Input
                placeholder="e.g. Ananya Sharma"
                {...register("name")}
                error={errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label required>Mobile Number</Label>
              <Input
                placeholder="10-digit number"
                maxLength={10}
                {...register("mobile")}
                error={errors.mobile}
              />
              {errors.mobile && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.mobile.message}
                </p>
              )}
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input
                placeholder="Same as mobile if left blank"
                maxLength={10}
                {...register("whatsapp")}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="patient@example.com"
                {...register("email")}
                error={errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label required>Gender</Label>
              <Select {...register("gender")}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" placeholder="e.g. 34" {...register("age")} />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input type="date" {...register("dob")} />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-[rgb(var(--fg))]">
            Visit Details
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label required>Visit Date</Label>
              <Input
                type="date"
                {...register("visitDate")}
                error={errors.visitDate}
              />
              {errors.visitDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.visitDate.message}
                </p>
              )}
            </div>
            <div>
              <Label required>Visit Time</Label>
              <Input
                type="time"
                {...register("visitTime")}
                error={errors.visitTime}
              />
              {errors.visitTime && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.visitTime.message}
                </p>
              )}
            </div>
            <div>
              <Label required>OPD Location</Label>
              <Select {...register("opdLocation")}>
                <option value="">Select location</option>
                {OPD_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
              {errors.opdLocation && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.opdLocation.message}
                </p>
              )}
            </div>
            <div>
              <Label required>Doctor Name</Label>
              <Select {...register("doctorId")}>
                <option value="">Select doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.specialty}
                  </option>
                ))}
              </Select>
              {errors.doctorId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.doctorId.message}
                </p>
              )}
            </div>
            <div>
              <Label required>Coordinator Name</Label>
              <Select {...register("coordinator")}>
                <option value="">Select coordinator</option>
                {coordinators.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
              {errors.coordinator && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.coordinator.message}
                </p>
              )}
            </div>
            <div>
              <Label required>Visit Type</Label>
              <Select {...register("visitType")}>
                <option value="New">New</option>
                <option value="Follow-up">Follow-up</option>
              </Select>
            </div>
          </div>
        </section>
      </form>
    </Modal>
  );
}
