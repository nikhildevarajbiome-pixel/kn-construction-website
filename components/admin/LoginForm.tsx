"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || disabled) return;
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError || !data.user) {
        setError("Incorrect email or password.");
        return;
      }
      const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
      if (!admin) {
        await supabase.auth.signOut();
        setError("This account is not an authorized administrator.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Could not sign in. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const input = "w-full border border-white/30 bg-navy px-4 py-3 text-white placeholder:text-white/40 focus:border-gold";

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-white">Email</label>
        <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm text-white">Password</label>
        <div className="relative">
          <input id="password" type={show ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} pr-12`} />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-white/70 hover:text-gold">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={loading || disabled || !email || !password} className="btn btn-gold w-full">
        {loading ? (<><Loader2 size={16} className="animate-spin" aria-hidden /> Signing in...</>) : "Sign in"}
      </button>
    </form>
  );
}
