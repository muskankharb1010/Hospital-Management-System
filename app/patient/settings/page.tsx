"use client";

import { useAuth } from "@/lib/auth-context";
import { patients } from "@/lib/mock-data";
import { User, Mail, Phone, MapPin, Heart, Settings, Bell, Lock, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PatientSettings() {
  const { user } = useAuth();
  const patientData = patients.find((p) => p.id === user?.id);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/patient/dashboard"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm mb-6 animate-fade-in-up">
          <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-hospital-blue" />
            Account Information
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-slate-100 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-2.5 rounded-lg border border-input dark:border-slate-700 bg-background dark:bg-slate-700 text-foreground dark:text-slate-100 outline-none focus:border-hospital-blue focus:ring-2 focus:ring-hospital-blue/20 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background outline-none focus:border-hospital-blue focus:ring-2 focus:ring-hospital-blue/20 transition-colors"
              />
            </div>

            {patientData && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue={patientData.contact}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background outline-none focus:border-hospital-blue focus:ring-2 focus:ring-hospital-blue/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Blood Group</label>
                    <input
                      type="text"
                      defaultValue={patientData.bloodGroup}
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-muted outline-none cursor-not-allowed opacity-75"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </label>
                  <textarea
                    rows={2}
                    defaultValue={patientData.address}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background outline-none focus:border-hospital-blue focus:ring-2 focus:ring-hospital-blue/20 transition-colors resize-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm mb-6 animate-fade-in-up animation-delay-200">
          <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-hospital-green" />
            Notifications
          </h2>

          <div className="space-y-4">
            {[
              { label: "Appointment Reminders", desc: "Get notified about upcoming appointments" },
              { label: "Medical Updates", desc: "Receive updates about your medical records" },
              { label: "Invoice Notifications", desc: "Get notified about new invoices" },
              { label: "Health Tips", desc: "Receive daily health tips and wellness advice" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-hospital-green/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hospital-green" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm mb-6 animate-fade-in-up animation-delay-300">
          <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            Security
          </h2>

          <div className="space-y-4">
            <button className="w-full px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium text-sm">
              Change Password
            </button>

            <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Two-Factor Authentication:</span> Not enabled
              </p>
              <button className="mt-2 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
                Enable for added security →
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3 justify-end animate-fade-in-up animation-delay-400">
          <button className="px-6 py-2.5 rounded-lg border border-input hover:bg-muted transition-colors font-medium text-foreground">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-lg bg-hospital-green text-white hover:opacity-90 disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
