"use client";

import { useState } from "react";
import Link from "next/link";
import { Cross, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 animate-fade-in-down">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 animate-fade-in animation-delay-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hospital-blue">
            <Cross className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-heading font-bold text-hospital-blue dark:text-blue-400">
            Hospital System
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium text-foreground/70 transition-colors hover:text-hospital-blue relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-hospital-blue after:transition-all hover:after:w-full first:text-hospital-blue first:after:w-full animate-fade-in animation-delay-${(index + 2) * 100}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme Toggle + Login Button */}
        <div className="hidden md:flex items-center gap-3 animate-fade-in animation-delay-500">
          <ThemeToggle />
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-hospital-blue px-5 text-sm font-medium text-white transition-all hover:opacity-90 transform hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-800 hover:text-hospital-blue dark:hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-hospital-blue px-5 text-sm font-medium text-white"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
