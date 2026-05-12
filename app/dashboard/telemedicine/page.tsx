"use client";

import { telemedicineAppointments, doctors } from "@/lib/mock-data";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Monitor,
  User,
  CalendarCheck,
} from "lucide-react";
import { useState } from "react";

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  "In Progress": "bg-green-100 text-green-700",
  Completed: "bg-gray-100 text-gray-700",
};

export default function TelemedicinePage() {
  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const activeMeeting = telemedicineAppointments.find(
    (t) => t.id === activeCall
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Telemedicine
        </h1>
        <p className="text-sm text-muted-foreground">
          Virtual consultations and video appointments
        </p>
      </div>

      {/* Video Call Area */}
      {activeCall && activeMeeting && (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="relative bg-gray-900 aspect-video max-h-[400px] flex items-center justify-center">
            {/* Placeholder video area */}
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
                <User className="h-10 w-10 text-gray-400" />
              </div>
              <p className="mt-3 text-white font-heading font-medium">
                {activeMeeting.doctorName}
              </p>
              <p className="text-sm text-gray-400">Video Call in Progress</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-600/20 px-3 py-1 text-xs text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Connected
              </div>
            </div>

            {/* Self preview */}
            <div className="absolute bottom-4 right-4 h-24 w-32 rounded-lg bg-gray-700 flex items-center justify-center border-2 border-gray-600">
              {videoOn ? (
                <div className="text-center">
                  <User className="h-6 w-6 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-400 mt-1">You</p>
                </div>
              ) : (
                <VideoOff className="h-6 w-6 text-gray-500" />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 p-4 bg-gray-800">
            <button
              type="button"
              onClick={() => setMicOn(!micOn)}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                micOn
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-red-500 text-white"
              }`}
              aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
            >
              {micOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setVideoOn(!videoOn)}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                videoOn
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-red-500 text-white"
              }`}
              aria-label={videoOn ? "Turn off camera" : "Turn on camera"}
            >
              {videoOn ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-500 transition-colors"
              aria-label="Share screen"
            >
              <Monitor className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveCall(null)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors"
              aria-label="End call"
            >
              <Phone className="h-5 w-5 rotate-[135deg]" />
            </button>
          </div>
        </div>
      )}

      {/* Appointment List */}
      <div className="grid gap-4 md:grid-cols-2">
        {telemedicineAppointments.map((tm) => {
          const doctor = doctors.find((d) => d.id === tm.doctorId);
          return (
            <div
              key={tm.id}
              className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-hospital-blue text-white font-heading font-bold text-sm">
                    {tm.doctorName
                      .replace("Dr. ", "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      {tm.doctorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doctor?.specialization || "Specialist"}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[tm.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tm.status}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Patient: {tm.patientName}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CalendarCheck className="h-3.5 w-3.5 text-muted-foreground" />
                  {tm.date} at {tm.time}
                </div>
              </div>

              <div className="mt-4">
                {tm.status === "Scheduled" || tm.status === "In Progress" ? (
                  <button
                    type="button"
                    onClick={() => setActiveCall(tm.id)}
                    className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium text-white transition-colors ${
                      activeCall === tm.id
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-hospital-green hover:opacity-90"
                    }`}
                  >
                    <Video className="h-4 w-4" />
                    {activeCall === tm.id ? "In Call" : "Join Call"}
                  </button>
                ) : (
                  <div className="flex h-9 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                    Call Ended
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
