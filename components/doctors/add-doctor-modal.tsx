"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { departments } from "@/lib/mock-data";

interface AddDoctorFormData {
  name: string;
  specialization: string;
  department: string;
  email: string;
  phone: string;
  experience: string;
  availability: string;
  qualification: string;
}

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddDoctorFormData) => void;
  isSubmitting?: boolean;
}

export function AddDoctorModal({ isOpen, onClose, onSubmit, isSubmitting = false }: AddDoctorModalProps) {
  const [formData, setFormData] = useState<AddDoctorFormData>({
    name: "",
    specialization: "",
    department: "",
    email: "",
    phone: "",
    experience: "",
    availability: "Available",
    qualification: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Doctor name is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.experience.trim()) newErrors.experience = "Years of experience is required";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: "",
        specialization: "",
        department: "",
        email: "",
        phone: "",
        experience: "",
        availability: "Available",
        qualification: "",
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      specialization: "",
      department: "",
      email: "",
      phone: "",
      experience: "",
      availability: "Available",
      qualification: "",
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
            className="w-full max-w-2xl rounded-2xl bg-background border border-border shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border p-6 bg-background">
              <h2 className="text-xl font-heading font-bold text-foreground">
                Add New Doctor
              </h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Doctor Name */}
                <div>
                  <label htmlFor="doc-name" className="block text-sm font-medium text-foreground mb-2">
                    Doctor Name
                  </label>
                  <input
                    id="doc-name"
                    type="text"
                    placeholder="Enter doctor name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {errors.name && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Specialization */}
                <div>
                  <label htmlFor="doc-spec" className="block text-sm font-medium text-foreground mb-2">
                    Specialization
                  </label>
                  <input
                    id="doc-spec"
                    type="text"
                    placeholder="e.g., Cardiologist"
                    value={formData.specialization}
                    onChange={(e) => {
                      setFormData({ ...formData, specialization: e.target.value });
                      if (errors.specialization) setErrors({ ...errors, specialization: "" });
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {errors.specialization && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.specialization}
                    </motion.p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="doc-dept" className="block text-sm font-medium text-foreground mb-2">
                    Department
                  </label>
                  <select
                    id="doc-dept"
                    value={formData.department}
                    onChange={(e) => {
                      setFormData({ ...formData, department: e.target.value });
                      if (errors.department) setErrors({ ...errors, department: "" });
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    aria-label="Select department"
                  >
                    <option value="">Select Department...</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.department}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="doc-email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="doc-email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {errors.email && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="doc-phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    id="doc-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {errors.phone && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="doc-exp" className="block text-sm font-medium text-foreground mb-2">
                    Years of Experience
                  </label>
                  <input
                    id="doc-exp"
                    type="text"
                    placeholder="e.g., 10 years"
                    value={formData.experience}
                    onChange={(e) => {
                      setFormData({ ...formData, experience: e.target.value });
                      if (errors.experience) setErrors({ ...errors, experience: "" });
                    }}
                    className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {errors.experience && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.experience}
                    </motion.p>
                  )}
                </div>

                {/* Availability */}
                <div>
                  <label htmlFor="doc-avail" className="block text-sm font-medium text-foreground mb-2">
                    Availability
                  </label>
                  <select
                    id="doc-avail"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    aria-label="Doctor availability"
                  >
                    <option value="Available">Available</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>

              {/* Qualification - Full Width */}
              <div>
                <label htmlFor="doc-qual" className="block text-sm font-medium text-foreground mb-2">
                  Qualification & Certifications
                </label>
                <textarea
                  id="doc-qual"
                  placeholder="e.g., MD in Cardiology, Board Certified..."
                  rows={3}
                  value={formData.qualification}
                  onChange={(e) => {
                    setFormData({ ...formData, qualification: e.target.value });
                    if (errors.qualification) setErrors({ ...errors, qualification: "" });
                  }}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
                {errors.qualification && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.qualification}
                  </motion.p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <motion.button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="flex-1 h-11 rounded-lg border border-border text-foreground font-medium transition-all hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>

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
                      Adding...
                    </>
                  ) : (
                    "Add Doctor"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
