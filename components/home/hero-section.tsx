import Link from "next/link";
import { Clock, Stethoscope, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-12 lg:py-16">
          {/* Left Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl font-heading font-bold text-foreground sm:text-4xl lg:text-5xl text-balance animate-fade-in-up">
              <span className="text-hospital-blue">Your Health,</span>{" "}
              <span className="text-foreground">Our Priority</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-100">
              Advanced Healthcare Management System
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-200">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-hospital-green px-6 text-sm font-semibold text-white transition-all hover:opacity-90 transform hover:scale-105"
              >
                Get Started
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start pt-2 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-2 rounded-full border border-border dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-hospital-green/10 dark:bg-hospital-green/20">
                  <Clock className="h-3.5 w-3.5 text-hospital-green dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-foreground dark:text-slate-200">24/7 Emergency Care</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-hospital-blue/10 dark:bg-hospital-blue/20">
                  <Stethoscope className="h-3.5 w-3.5 text-hospital-blue dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-foreground dark:text-slate-200">Experienced Doctors</span>
              </div>
            </div>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end animate-fade-in-right animation-delay-200">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=500&fit=crop&crop=top"
                alt="Professional medical team"
                className="relative z-10 w-full rounded-2xl object-cover shadow-xl"
                width={600}
                height={500}
              />
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-hospital-blue/10 dark:bg-hospital-blue/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
