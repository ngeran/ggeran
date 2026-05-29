"use client";

import { useState } from "react";
import { z } from "zod/v4";

const inquirySchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  senderName: z.string().optional(),
  senderEmail: z.string().email("Invalid email").optional().or(z.literal("")),
});

interface ContactFormProps {
  settings: Record<string, string>;
}

export default function ContactForm({ settings }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    const form = new FormData(e.currentTarget);
    const data = {
      subject: form.get("subject") as string,
      message: form.get("message") as string,
      senderName: form.get("senderName") as string,
      senderEmail: form.get("senderEmail") as string,
    };

    const result = inquirySchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-margin px-gutter max-w-container-max mx-auto bg-surface-container-low border-t-4 border-steel-slate">
      <div className="flex items-center gap-stack-md mb-stack-lg">
        <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
          {settings.contact_section_title || "COMMUNICATIONS_TERMINAL"}
        </span>
        <div className="h-[2px] flex-grow bg-steel-slate" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="space-y-stack-md">
          <h3 className="font-display text-2xl text-machine-white uppercase">
            {settings.contact_heading || "SUBMIT_AUDIO_FOR_ANALYSIS"}
          </h3>
          <p className="font-mono text-sm text-on-surface/70">
            {settings.contact_body || ""}
          </p>
          <div className="p-stack-md border-2 border-warning-blue/30 bg-warning-blue/5 border-l-8 border-l-warning-blue">
            <p className="font-mono text-xs text-warning-blue uppercase mb-1">
              {settings.contact_tip_label || "Protocol Tip"}
            </p>
            <p className="font-mono text-sm italic text-on-background/80">
              &ldquo;{settings.contact_tip_text || ""}&rdquo;
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-stack-md">
          <div>
            <label className="block font-mono text-xs text-safety-orange uppercase mb-2">Subject</label>
            <input name="subject" className="w-full bg-lathe-charcoal border-2 border-steel-slate text-machine-white font-mono text-sm p-3 focus:border-safety-orange outline-none transition-colors" placeholder="e.g., ORDER_5_X_7INCH" />
            {errors.subject && <p className="font-mono text-xs text-safety-orange mt-1">{errors.subject}</p>}
          </div>
          <div>
            <label className="block font-mono text-xs text-safety-orange uppercase mb-2">Transmission_Content</label>
            <textarea name="message" rows={4} className="w-full bg-lathe-charcoal border-2 border-steel-slate text-machine-white font-mono text-sm p-3 focus:border-safety-orange outline-none transition-colors" placeholder="ENTER MESSAGE..." />
            {errors.message && <p className="font-mono text-xs text-safety-orange mt-1">{errors.message}</p>}
          </div>
          <button type="submit" disabled={status === "loading"} className="w-full bg-safety-orange text-lathe-charcoal py-4 font-mono uppercase font-bold border-2 border-lathe-charcoal brutal-shadow active:brutal-shadow-active transition-all disabled:opacity-50">
            {status === "loading" ? "TRANSMITTING..." : status === "success" ? "SIGNAL SENT" : settings.contact_button_text || "SEND_SIGNAL"}
          </button>
          {status === "error" && <p className="font-mono text-xs text-safety-orange uppercase">TRANSMISSION FAILED — TRY AGAIN</p>}
        </form>
      </div>
    </section>
  );
}
