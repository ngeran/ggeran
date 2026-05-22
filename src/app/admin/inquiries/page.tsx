"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  subject: string;
  message: string;
  senderName: string | null;
  senderEmail: string | null;
  status: string | null;
  createdAt: string | null;
}

const statusColors: Record<string, string> = {
  new: "text-safety-orange border-safety-orange",
  read: "text-warning-blue border-warning-blue",
  replied: "text-green-400 border-green-500",
  archived: "text-on-surface/30 border-steel-slate",
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then(setInquiries);
  }, []);

  async function handleStatus(id: string, status: string) {
    await fetch("/api/admin/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  }

  async function handleDelete(id: string) {
    await fetch("/api/admin/inquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  }

  const unread = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="p-margin">
      <div className="flex items-center gap-stack-md mb-stack-lg">
        <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
          MSG
        </span>
        <h1 className="font-display text-2xl text-machine-white uppercase">
          Inquiries
        </h1>
        {unread > 0 && (
          <span className="font-mono text-xs text-safety-orange bg-safety-orange/10 border-thin border-safety-orange px-2 py-1">
            {unread} NEW
          </span>
        )}
      </div>

      <div className="space-y-stack-sm">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`border-thin border-steel-slate bg-surface-container-low p-stack-md ${
              inquiry.status === "new" ? "border-l-[8px] border-l-safety-orange" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-stack-sm">
              <div>
                <h4 className="font-display text-base text-machine-white uppercase">
                  {inquiry.subject}
                </h4>
                <div className="flex items-center gap-stack-sm mt-1">
                  {inquiry.senderName && (
                    <span className="font-mono text-[10px] text-on-surface/50 uppercase">
                      FROM: {inquiry.senderName}
                    </span>
                  )}
                  {inquiry.senderEmail && (
                    <span className="font-mono text-[10px] text-on-surface/40">
                      {inquiry.senderEmail}
                    </span>
                  )}
                  {inquiry.createdAt && (
                    <span className="font-mono text-[10px] text-on-surface/30">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`font-mono text-[10px] uppercase px-2 py-1 border-thin ${
                  statusColors[inquiry.status || "new"] || ""
                }`}
              >
                {inquiry.status || "NEW"}
              </span>
            </div>

            <p className="font-mono text-xs text-on-surface/60 leading-relaxed mb-stack-sm whitespace-pre-wrap">
              {inquiry.message}
            </p>

            <div className="flex items-center gap-stack-sm">
              <button
                onClick={() => handleStatus(inquiry.id, "read")}
                className="font-mono text-[10px] text-warning-blue hover:text-machine-white uppercase border-thin border-steel-slate px-2 py-1"
              >
                MARK READ
              </button>
              <button
                onClick={() => handleStatus(inquiry.id, "replied")}
                className="font-mono text-[10px] text-green-400 hover:text-machine-white uppercase border-thin border-steel-slate px-2 py-1"
              >
                MARK REPLIED
              </button>
              <button
                onClick={() => handleStatus(inquiry.id, "archived")}
                className="font-mono text-[10px] text-on-surface/30 hover:text-safety-orange uppercase border-thin border-steel-slate px-2 py-1"
              >
                ARCHIVE
              </button>
              <button
                onClick={() => handleDelete(inquiry.id)}
                className="font-mono text-[10px] text-on-surface/30 hover:text-safety-orange uppercase"
              >
                DEL
              </button>
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="border-thin border-steel-slate bg-surface-container-low p-stack-lg text-center">
            <span className="font-mono text-xs text-on-surface/30 uppercase">
              NO TRANSMISSIONS RECEIVED
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
