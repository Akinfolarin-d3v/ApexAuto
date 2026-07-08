"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitContactForm } from "@/lib/contact";
import Button from "@/components/ui/Button";

const TOPICS = ["General question", "Financing", "Trade-in", "An existing order", "Something else"];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitContactForm(form);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong sending that — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-trust bg-trust-tint p-10 text-center">
        <CheckCircle2 size={28} strokeWidth={1.75} className="text-trust" />
        <p className="font-display text-lg tracking-tightest text-ink">Message sent</p>
        <p className="max-w-xs text-sm text-steel-600">
          Thanks, {form.name.split(" ")[0] || "there"} — we'll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-steel-500">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-steel-500">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-steel-500">What's this about?</span>
        <select
          value={form.topic}
          onChange={(e) => update({ topic: e.target.value })}
          className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-steel-500">Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update({ message: e.target.value })}
          className="resize-none rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
        />
      </label>

      {error && <p className="text-sm text-velocity">{error}</p>}

      <Button type="submit" disabled={submitting} className="mt-1 disabled:opacity-50">
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
