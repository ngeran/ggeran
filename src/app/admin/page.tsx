"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLogin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/admin/content");
  }, [session, router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/admin/settings",
    });

    if (result?.error) {
      setError("AUTHENTICATION FAILED");
    }
  }

  return (
    <div className="min-h-screen bg-lathe-charcoal flex items-center justify-center px-stack-md">
      <div className="w-full max-w-md border-thin border-steel-slate bg-surface-container-low">
        <div className="bg-safety-orange px-stack-md py-stack-sm border-b-thin border-steel-slate">
          <h1 className="font-display text-xl text-lathe-charcoal uppercase font-bold">
            AUTH_TERMINAL
          </h1>
          <span className="font-mono text-[10px] text-lathe-charcoal/60 uppercase">
            Authorized Personnel Only
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-stack-lg space-y-stack-md">
          <div>
            <label className="font-mono text-xs text-on-surface/60 uppercase tracking-widest block mb-1">
              Operator ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 focus:border-safety-orange focus:outline-none"
              placeholder="admin@lathecut.com"
              required
            />
          </div>

          <div>
            <label className="font-mono text-xs text-on-surface/60 uppercase tracking-widest block mb-1">
              Access Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 focus:border-safety-orange focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-safety-orange/10 border-thin border-safety-orange px-stack-sm py-2">
              <span className="font-mono text-xs text-safety-orange uppercase">
                {error}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-safety-orange text-lathe-charcoal py-3 font-mono font-bold uppercase border-thin border-lathe-charcoal brutal-shadow hover:brutal-shadow-active transition-all"
          >
            AUTHENTICATE
          </button>
        </form>
      </div>
    </div>
  );
}
