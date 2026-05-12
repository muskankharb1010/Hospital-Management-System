"use client";

import { ArrowLeft, TrendingUp, Activity, Droplet, Zap } from "lucide-react";
import Link from "next/link";

export default function HealthTracker() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/patient/dashboard"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Health Tracker</h1>
            <p className="text-muted-foreground">Monitor your daily health metrics</p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Steps", value: "8,421", icon: Activity, color: "hospital-blue" },
            { label: "Heart Rate", value: "72 bpm", icon: Droplet, color: "hospital-green" },
            { label: "Calories", value: "2,150", icon: Zap, color: "yellow-500" },
            { label: "Sleep", value: "7.5 hrs", icon: Activity, color: "purple-500" },
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up hover:shadow-md transition-shadow"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-10 w-10 rounded-lg bg-${metric.color}/10 dark:bg-${metric.color}/20 flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-${metric.color}`} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mb-1">{metric.label}</p>
                <p className="text-2xl font-heading font-bold text-foreground dark:text-slate-100">{metric.value}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-hospital-green">
                  <TrendingUp className="h-3 w-3" />
                  On track
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <div className="rounded-xl border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm animate-fade-in-up animation-delay-400">
          <h2 className="text-lg font-heading font-bold text-foreground dark:text-slate-100 mb-6">Weekly Activity</h2>

          <div className="h-64 flex items-end justify-between gap-2 mb-6">
            {[
              { day: "Mon", value: 0.6 },
              { day: "Tue", value: 0.8 },
              { day: "Wed", value: 0.7 },
              { day: "Thu", value: 0.9 },
              { day: "Fri", value: 0.85 },
              { day: "Sat", value: 0.75 },
              { day: "Sun", value: 0.65 },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-hospital-green to-hospital-blue rounded-t-lg animate-fade-in-up" style={{ height: `${item.value * 100}%`, animationDelay: `${idx * 50}ms` }} />
                <p className="text-xs text-muted-foreground">{item.day}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm border-t border-border pt-4">
            <p className="text-muted-foreground">Average Daily Activity</p>
            <p className="font-semibold text-foreground">76% Complete</p>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 mt-8 animate-fade-in-up animation-delay-500">
          <h3 className="font-semibold text-blue-900 mb-4">Health Goals for This Week</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span>Walk 10,000 steps daily</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span>Drink 8 glasses of water daily</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span>Exercise for 30 minutes</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span>Get 8 hours of sleep</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
