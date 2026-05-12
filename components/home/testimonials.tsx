"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Excellent care and great staff! The online booking was so convenient. Highly recommend!",
    name: "Sarah M.",
  },
  {
    text: "The doctors here are very professional and caring. Modern facilities and easy appointment system.",
    name: "Michael R.",
  },
  {
    text: "Quick response in emergency. The telemedicine feature saved me a trip. Very satisfied!",
    name: "Jennifer K.",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
          Patient <span className="text-hospital-blue">Testimonials</span>
        </h2>
        <div className="relative mx-auto max-w-3xl rounded-xl border border-border dark:border-slate-700 bg-card dark:bg-slate-800 p-8 shadow-sm">
          <Quote className="absolute top-6 left-6 h-8 w-8 text-hospital-blue/20 dark:text-blue-400/20" />
          <Quote className="absolute bottom-6 right-6 h-8 w-8 text-hospital-blue/20 dark:text-blue-400/20 rotate-180" />
          <div className="text-center px-8">
            <p className="text-lg text-foreground/80 dark:text-slate-300 italic leading-relaxed">
              {`"${testimonials[idx].text}"`}
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">
              - {testimonials[idx].name}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border dark:border-slate-700 hover:bg-muted dark:hover:bg-slate-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 text-foreground dark:text-slate-300" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={`dot-${testimonials[i].name}`}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === idx ? "bg-hospital-blue dark:bg-blue-400" : "bg-border dark:bg-slate-700"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border dark:border-slate-700 hover:bg-muted dark:hover:bg-slate-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 text-foreground dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
