import { Users, CalendarCheck, FileText, CreditCard } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Patient Management",
    desc: "Efficient patient management system",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Scheduling",
    desc: "Easy scheduling & reminders",
  },
  {
    icon: FileText,
    title: "Digital Reports",
    desc: "Access your reports online",
  },
  {
    icon: CreditCard,
    title: "Billing & Insurance",
    desc: "Insurance & billing management",
  },
];

export function KeyFeatures() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-800" id="about">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
          Key <span className="text-hospital-blue">Features</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hospital-blue/10">
                  <f.icon className="h-5 w-5 text-hospital-blue" />
                </div>
                <h3 className="text-sm font-heading font-bold text-foreground">
                  {f.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
