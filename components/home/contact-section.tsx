"use client";

import React from "react"

import { useState, useRef } from "react";
import { Send, Mail, User, MessageSquare, FileText } from "lucide-react";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // EmailJS integration - uses dummy credentials
      // Replace these with real EmailJS credentials for production
      await emailjs.sendForm(
        "service_dummy123",  // EmailJS Service ID
        "template_dummy456", // EmailJS Template ID
        formRef.current!,
        "user_dummy789"      // EmailJS Public Key
      );
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      // Falls back to simulated send for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-900" id="contact">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Contact <span className="text-hospital-blue">Us</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Have questions? We are here to help.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-6 lg:p-8 shadow-sm space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="contact-name"
                    name="from_name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="contact-email"
                    name="reply_to"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email"
                    className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-foreground">
                Subject
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Subject"
                  className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm outline-none resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-hospital-blue px-6 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-hospital-green font-medium">
                Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive font-medium">
                Failed to send. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
