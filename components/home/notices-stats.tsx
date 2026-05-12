import {
  Clock,
  Stethoscope,
  CalendarCheck,
  ChevronRight,
  Users,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export function NoticesAndStats() {
  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notices Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-fade-in-up animation-delay-100">
            <h3 className="text-lg font-heading font-bold text-foreground mb-4">
              Notices
            </h3>
            <div className="space-y-3">
              {[
                "COVID-19 Vaccination Drive: April 15 - 20",
                "New Pediatric Wing Opening Soon",
                "Health Tips: Managing Diabetes",
              ].map((notice) => (
                <div key={notice} className="flex items-start gap-2">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-hospital-blue flex-shrink-0" />
                  <p className="text-sm text-foreground/80">{notice}</p>
                </div>
              ))}
            </div>
            <Link
              href="#"
              className="mt-4 inline-flex items-center text-sm font-medium text-hospital-blue hover:underline"
            >
              View All Notices <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Link>
            <div className="mt-6 flex items-center gap-6 border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-hospital-blue" />
                <div>
                  <p className="text-xs text-muted-foreground">Doctors Available</p>
                  <p className="text-xl font-heading font-bold text-hospital-blue">120+</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-hospital-green" />
                <div>
                  <p className="text-xs text-muted-foreground">Patients Served</p>
                  <p className="text-xl font-heading font-bold text-hospital-green">15,800+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Badges + Services */}
          <div className="space-y-6 animate-fade-in-up animation-delay-200">
            {/* Feature Badges */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hospital-blue/10">
                  <Clock className="h-5 w-5 text-hospital-blue" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">Emergency Care</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hospital-green/10">
                  <Stethoscope className="h-5 w-5 text-hospital-green" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Experienced</p>
                  <p className="text-xs text-muted-foreground">Doctors</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hospital-blue/10">
                  <CalendarCheck className="h-5 w-5 text-hospital-blue" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Online</p>
                  <p className="text-xs text-muted-foreground">Appointments</p>
                </div>
              </div>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-4 text-center">
                Our <span className="text-hospital-blue underline underline-offset-4">Services</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: CalendarCheck, label: "Appointment", color: "text-hospital-blue", bg: "bg-hospital-blue/10" },
                  { icon: Stethoscope, label: "Doctors", color: "text-hospital-blue", bg: "bg-hospital-blue/10" },
                  { icon: FlaskIcon, label: "Laboratory", color: "text-hospital-blue", bg: "bg-hospital-blue/10" },
                  { icon: PillIcon, label: "Pharmacy", color: "text-hospital-blue", bg: "bg-hospital-blue/10" },
                  { icon: MonitorIcon, label: "Telemedicine", color: "text-hospital-green", bg: "bg-hospital-green/10" },
                ].map((service, index) => (
                  <Link
                    key={service.label}
                    href="/login"
                    className={`flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm hover:shadow-md transition-all transform hover:scale-105 animate-fade-in-up animation-delay-${(index + 2) * 100}`}
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${service.bg}`}>
                      <service.icon className={`h-5 w-5 ${service.color}`} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{service.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-fade-in-up animation-delay-300">
            <h3 className="text-lg font-heading font-bold text-foreground mb-4">
              Quick <span className="text-hospital-blue">Access</span>
            </h3>
            <div className="space-y-3">
              {[
                { label: "Book Appointment", href: "/dashboard/appointments", color: "bg-hospital-blue" },
                { label: "Medical Records", href: "/dashboard/medical-records", color: "bg-hospital-green" },
                { label: "Billing & Insurance", href: "/dashboard/billing", color: "bg-teal-600" },
                { label: "Telemedicine", href: "/dashboard/telemedicine", color: "bg-emerald-600" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg ${item.color} px-4 py-3 text-white transition-all hover:opacity-90`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6" /><path d="M10 9V3" /><path d="M14 9V3" />
      <path d="M7.5 21h9" /><path d="M5.2 16.8 10 9h4l4.8 7.8a1 1 0 0 1-.8 1.4H6a1 1 0 0 1-.8-1.4z" />
    </svg>
  );
}

function PillIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}
