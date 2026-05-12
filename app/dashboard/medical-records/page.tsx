"use client";

import React from "react"

import { useState, useRef } from "react";
import { medicalRecords } from "@/lib/mock-data";
import { FileText, Search, Download, Upload, X, File } from "lucide-react";

export default function MedicalRecordsPage() {
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = medicalRecords.filter(
    (r) =>
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileName(e.target.files[0].name);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUpload(false);
    setUploadFileName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Medical Records
          </h1>
          <p className="text-sm text-muted-foreground">
            Patient reports and documents
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowUpload(true)}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-hospital-green px-4 text-sm font-medium text-white hover:opacity-90"
        >
          <Upload className="h-4 w-4" /> Upload Record
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Patient
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                  Report Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {r.id}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {r.patientName}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-hospital-blue" />
                      {r.type}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-foreground">
                    {r.doctor}
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        r.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md bg-hospital-blue/10 px-2.5 py-1 text-xs font-medium text-hospital-blue hover:bg-hospital-blue/20 transition-colors"
                      onClick={() =>
                        alert(
                          "This is a demo. PDF download is not available."
                        )
                      }
                    >
                      <Download className="h-3 w-3" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No records found.
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowUpload(false)}
            onKeyDown={(e) => e.key === "Escape" && setShowUpload(false)}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
          />
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading font-bold text-foreground">
                Upload Medical Record
              </h2>
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="upload-patient"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Patient Name
                </label>
                <input
                  id="upload-patient"
                  required
                  className="h-9 w-full rounded-lg border border-input px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label
                  htmlFor="upload-type"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Report Type
                </label>
                <input
                  id="upload-type"
                  required
                  className="h-9 w-full rounded-lg border border-input px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., Blood Test, MRI Scan"
                />
              </div>
              <div>
                <label
                  htmlFor="upload-file"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  File
                </label>
                <div
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-input p-6 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) =>
                    e.key === "Enter" && fileInputRef.current?.click()
                  }
                  role="button"
                  tabIndex={0}
                >
                  <input
                    id="upload-file"
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.png,.doc,.docx"
                  />
                  {uploadFileName ? (
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <File className="h-5 w-5 text-hospital-blue" />
                      {uploadFileName}
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG, PNG, DOC (max 10MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="h-9 w-full rounded-lg bg-hospital-green text-sm font-medium text-white hover:opacity-90"
              >
                Upload Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
