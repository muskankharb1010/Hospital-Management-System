import { Phone, Stethoscope, Headphones, ChevronRight } from "lucide-react";
import Link from "next/link";

export function FooterActions() {
  return (
    <section className="py-4 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="tel:1234567890"
            className="flex items-center justify-between rounded-xl gradient-blue px-5 py-4 text-white hover:opacity-90 transition-all"
          >
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Emergency Call</p>
                <p className="text-xs text-white/80">123-456-7890</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard/doctors"
            className="flex items-center justify-between rounded-xl bg-hospital-green px-5 py-4 text-white hover:opacity-90 transition-all"
          >
            <div className="flex items-center gap-3">
              <Stethoscope className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Find a Doctor</p>
                <p className="text-xs text-white/80">Search Directory</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="#contact"
            className="flex items-center justify-between rounded-xl gradient-blue px-5 py-4 text-white hover:opacity-90 transition-all"
          >
            <div className="flex items-center gap-3">
              <Headphones className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">24/7 Support</p>
                <p className="text-xs text-white/80">Get Help</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border dark:border-slate-700 bg-muted dark:bg-slate-900 py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground dark:text-slate-400">
            2026 Hospital Management System. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
