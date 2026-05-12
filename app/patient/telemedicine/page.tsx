"use client";

import { useAuth } from "@/lib/auth-context";
import { appointments } from "@/lib/mock-data";
import { Video, Mic, MicOff, Camera, CameraOff, Phone, ArrowLeft, Clock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PatientTelemedicine() {
  const { user } = useAuth();
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);

  const patientAppointments = appointments.filter(
    (a) => a.patientName === user?.name && a.status === "Confirmed"
  );
  const telemedicineAppointments = patientAppointments.slice(0, 3);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/patient/dashboard"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Telemedicine</h1>
            <p className="text-muted-foreground">Join video consultations with your doctors</p>
          </div>
        </div>

        {selectedCall ? (
          // Video Call Interface
          <div className="rounded-xl border border-border dark:border-slate-700 bg-black dark:bg-slate-900 shadow-lg overflow-hidden animate-scale-in h-96 sm:h-screen">
            {/* Mock Video Area */}
            <div className="w-full h-full bg-gradient-to-br from-hospital-blue to-hospital-green flex items-center justify-center relative">
              {/* Patient Video */}
              <div className="absolute top-4 right-4 w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-white bg-black flex items-center justify-center shadow-lg">
                <Camera className="h-8 w-8 text-white opacity-50" />
              </div>

              {/* Doctor Name */}
              <div className="text-center">
                <User className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold">Dr. Sarah Wilson</p>
                <p className="text-white/70 text-sm">Waiting for response...</p>
              </div>

              {/* Call Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/50 px-6 py-4 rounded-full backdrop-blur-sm">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors ${
                    isMuted ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-700"
                  } text-white`}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>

                <button
                  onClick={() => setCameraOn(!cameraOn)}
                  className={`p-3 rounded-full transition-colors ${
                    !cameraOn ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-700"
                  } text-white`}
                >
                  {cameraOn ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
                </button>

                <button
                  onClick={() => setSelectedCall(null)}
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Appointments List
          <div className="space-y-6">
            {telemedicineAppointments.length > 0 ? (
              <>
                <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up">
                  <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6 flex items-center gap-2">
                    <Video className="h-5 w-5 text-hospital-green" />
                    Available Consultations
                  </h2>

                  <div className="space-y-4">
                    {telemedicineAppointments.map((apt, idx) => (
                      <div
                        key={apt.id}
                        className="p-4 rounded-lg border border-border hover:border-hospital-blue/50 transition-colors animate-fade-in-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-hospital-light-blue flex items-center justify-center">
                              <User className="h-6 w-6 text-hospital-blue" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{apt.doctorName}</p>
                              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {apt.date} at {apt.time}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setSelectedCall(apt.id)}
                              className="px-4 py-2 bg-hospital-green text-white rounded-lg hover:opacity-90 transition-colors font-medium text-sm flex items-center gap-2"
                            >
                              <Video className="h-4 w-4" />
                              Join Call
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-12 shadow-sm text-center animate-fade-in-up">
                <Video className="h-16 w-16 text-muted-foreground dark:text-slate-400 mx-auto mb-4 opacity-50" />
                <p className="text-foreground dark:text-slate-100 font-medium mb-2">No telemedicine appointments</p>
                <p className="text-muted-foreground dark:text-slate-400 text-sm">
                  Book a consultation with your doctor to start a video call
                </p>
              </div>
            )}

            {/* Tips Section */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 animate-fade-in-up animation-delay-300">
              <h3 className="font-semibold text-blue-900 mb-3">Tips for Your Video Consultation</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="flex-shrink-0">✓</span>
                  <span>Test your camera and microphone before the appointment</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0">✓</span>
                  <span>Join 5 minutes before the scheduled time</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0">✓</span>
                  <span>Ensure good lighting and a quiet environment</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0">✓</span>
                  <span>Have your medical records ready if needed</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
