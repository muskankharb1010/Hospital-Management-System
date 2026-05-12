"use client";

import { useState } from "react";
import { X, Calendar, Clock, User, Stethoscope, FileText, AlertCircle } from "lucide-react";
import { doctors } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

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

export function BookAppointmentModalV2({
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

  const handleClose = () => {
    setStep(1);
    setFormData({
      patientName: patientName,
      patientId: patientId,
      doctorId: "",
      doctorName: "",
      date: "",
      time: "",
      type: "Consultation",
      reason: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl rounded-2xl bg-background border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <h2 className="text-xl font-heading font-bold text-foreground">
                Book Appointment
              </h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex flex-col items-center flex-1">
                    <motion.div
                      animate={{
                        scale: step === num ? 1.1 : 1,
                        backgroundColor: step >= num ? "hsl(210 80% 40%)" : "hsl(210 20% 90%)",
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    >
                      {num}
                    </motion.div>
                    <p className="text-xs font-medium text-muted-foreground mt-2">
                      {num === 1 ? "Patient" : num === 2 ? "Date & Time" : "Details"}
                    </p>
                    {num < 3 && (
                      <motion.div
                        animate={{
                          scaleX: step > num ? 1 : 0,
                        }}
                        className="h-1 bg-hospital-blue mt-2 origin-left"
                        style={{ width: "100%" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="px-6 py-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Patient & Doctor */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="apt-patient" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <User className="h-4 w-4" />
                        Patient Name
                      </label>
                      <input
                        id="apt-patient"
                        type="text"
                        required
                        placeholder="Enter patient name"
                        value={formData.patientName}
                        onChange={(e) => {
                          setFormData({ ...formData, patientName: e.target.value });
                          if (errors.patientName) setErrors({ ...errors, patientName: "" });
                        }}
                        className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      {errors.patientName && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.patientName}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="apt-doctor" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Stethoscope className="h-4 w-4" />
                        Select Doctor
                      </label>
                      <select
                        id="apt-doctor"
                        required
                        value={formData.doctorId}
                        onChange={(e) => handleDoctorChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        aria-label="Select doctor"
                      >
                        <option value="">Choose a doctor...</option>
                        {availableDoctors.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} - {d.specialization}
                          </option>
                        ))}
                      </select>
                      {errors.doctorId && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.doctorId}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="apt-date" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        Appointment Date
                      </label>
                      <input
                        id="apt-date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: "" });
                        }}
                        className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      {errors.date && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.date}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="apt-time" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        Appointment Time
                      </label>
                      <input
                        id="apt-time"
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => {
                          setFormData({ ...formData, time: e.target.value });
                          if (errors.time) setErrors({ ...errors, time: "" });
                        }}
                        className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      {errors.time && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.time}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Appointment Details */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="apt-type" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <FileText className="h-4 w-4" />
                        Appointment Type
                      </label>
                      <select
                        id="apt-type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        aria-label="Appointment type"
                      >
                        {["Consultation", "Follow-up", "Check-up", "Emergency", "New Visit"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="apt-reason" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <FileText className="h-4 w-4" />
                        Reason for Visit
                      </label>
                      <textarea
                        id="apt-reason"
                        required
                        placeholder="Please describe why you're visiting..."
                        rows={4}
                        value={formData.reason}
                        onChange={(e) => {
                          setFormData({ ...formData, reason: e.target.value });
                          if (errors.reason) setErrors({ ...errors, reason: "" });
                        }}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      {errors.reason && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.reason}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  disabled={step === 1 || isSubmitting}
                  whileHover={{ scale: step === 1 || isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: step === 1 || isSubmitting ? 1 : 0.95 }}
                  className="flex-1 h-11 rounded-lg border border-border text-foreground font-medium transition-all hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </motion.button>

                {step < 3 ? (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="flex-1 h-11 rounded-lg bg-hospital-blue text-white font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="flex-1 h-11 rounded-lg bg-hospital-green text-white font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Booking...
                      </>
                    ) : (
                      "Book Appointment"
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
