"use client";

import { useState } from "react";
import { X, Calendar, Clock, User, Stethoscope, FileText, AlertCircle } from "lucide-react";
import { doctors } from "@/lib/mock-data";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AppointmentFormData) => void;
  isSubmitting?: boolean;
  patientName?: string;
  patientId?: string;
}

export interface AppointmentFormData {
  patientName: string;
  patientId?: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  reason: string;
}

export function BookAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  patientName = "",
  patientId = "",
}: BookAppointmentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: patientName,
    patientId: patientId,
    doctorId: "",
    doctorName: "",
    date: "",
    time: "",
    type: "Consultation",
    reason: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableDoctors = doctors.filter((d) => d.availability === "Available");

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
      if (!formData.doctorId) newErrors.doctorId = "Please select a doctor";
    } else if (step === 2) {
      if (!formData.date) newErrors.date = "Please select a date";
      if (!formData.time) newErrors.time = "Please select a time";
    } else if (step === 3) {
      if (!formData.type) newErrors.type = "Please select appointment type";
      if (!formData.reason.trim()) newErrors.reason = "Please describe your reason for visit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => (prev === 3 ? 3 : (prev + 1) as 1 | 2 | 3));
    }
  };

  const handlePrevious = () => {
    setStep((prev) => (prev === 1 ? 1 : (prev - 1) as 1 | 2 | 3));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      onSubmit(formData);
    }
  };

  const handleDoctorChange = (doctorId: string) => {
    const selectedDoctor = doctors.find((d) => d.id === doctorId);
    setFormData({
      ...formData,
      doctorId,
      doctorName: selectedDoctor?.name || "",
    });
    setErrors({ ...errors, doctorId: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Book an Appointment
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between px-6 py-4 bg-muted/50">
          {[
            { num: 1, label: "Patient Info" },
            { num: 2, label: "Date & Time" },
            { num: 3, label: "Reason" },
          ].map((s) => (
            <div key={s.num} className="flex items-center flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  step >= s.num
                    ? "bg-hospital-green text-white"
                    : "bg-border text-muted-foreground"
                }`}
              >
                {s.num}
              </div>
              <span
                className={`ml-2 text-xs font-medium ${
                  step >= s.num ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              {s.num < 3 && <div className="ml-4 flex-1 h-0.5 bg-border" />}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Patient Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-hospital-green" />
                Patient Information
              </h3>

              <div>
                <label htmlFor="patient-name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="patient-name"
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => {
                    setFormData({ ...formData, patientName: e.target.value });
                    if (errors.patientName) setErrors({ ...errors, patientName: "" });
                  }}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                    errors.patientName
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-input focus:border-hospital-green focus:ring-2 focus:ring-hospital-green/20"
                  }`}
                />
                {errors.patientName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="doctor-select" className="block text-sm font-medium text-foreground mb-2">
                  Select Doctor <span className="text-red-500">*</span>
                </label>
                <select
                  id="doctor-select"
                  value={formData.doctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                    errors.doctorId
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-input focus:border-hospital-green focus:ring-2 focus:ring-hospital-green/20"
                  }`}
                >
                  <option value="">Choose a doctor...</option>
                  {availableDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} - {doc.specialization} ({doc.department})
                    </option>
                  ))}
                </select>
                {errors.doctorId && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.doctorId}
                  </p>
                )}
              </div>

              {formData.doctorId && (
                <div className="rounded-lg bg-hospital-light-blue p-3 border border-hospital-blue/20">
                  <p className="text-xs text-hospital-blue">
                    <span className="font-semibold">Selected Doctor:</span> {formData.doctorName}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-hospital-green" />
                Select Date & Time
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="apt-date" className="block text-sm font-medium text-foreground mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="apt-date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: "" });
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                      errors.date
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-input focus:border-hospital-green focus:ring-2 focus:ring-hospital-green/20"
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apt-time" className="block text-sm font-medium text-foreground mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="apt-time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => {
                      setFormData({ ...formData, time: e.target.value });
                      if (errors.time) setErrors({ ...errors, time: "" });
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                      errors.time
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-input focus:border-hospital-green focus:ring-2 focus:ring-hospital-green/20"
                    }`}
                  />
                  {errors.time && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <p className="text-xs text-amber-700">
                  Available hours: Monday-Friday, 9:00 AM - 5:00 PM. Saturday, 10:00 AM - 2:00 PM.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Reason & Type */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-hospital-green" />
                Appointment Details
              </h3>

              <div>
                <label htmlFor="apt-type" className="block text-sm font-medium text-foreground mb-2">
                  Appointment Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="apt-type"
                  value={formData.type}
                  onChange={(e) => {
                    setFormData({ ...formData, type: e.target.value });
                    if (errors.type) setErrors({ ...errors, type: "" });
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                    errors.type
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-input focus:border-hospital-green focus:ring-2 focus:ring-hospital-green/20"
                  }`}
                >
                  {["Consultation", "Follow-up", "Check-up", "Emergency", "New Visit", "Vaccination"].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.type}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="apt-reason" className="block text-sm font-medium text-foreground mb-2">
                  Reason for Visit <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="apt-reason"
                  value={formData.reason}
                  onChange={(e) => {
                    setFormData({ ...formData, reason: e.target.value });
                    if (errors.reason) setErrors({ ...errors, reason: "" });
                  }}
                  placeholder="Describe your symptoms or reason for visit..."
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors resize-none ${
                    errors.reason
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-input focus:border-hospital-green focus:ring-2 focus:ring-hospital-green/20"
                  }`}
                />
                {errors.reason && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.reason}
                  </p>
                )}
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <p className="text-xs text-blue-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  A confirmation will be sent to your email within 24 hours.
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-muted/30">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={step === 1}
            className="px-4 py-2 text-sm font-medium text-foreground rounded-lg border border-input hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-foreground rounded-lg border border-input hover:bg-muted transition-colors"
            >
              Cancel
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-hospital-green rounded-lg hover:opacity-90 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-hospital-green rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
