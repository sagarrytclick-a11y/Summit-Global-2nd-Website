"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_IDENTITY } from "@/site-identity";
import { Eye, EyeOff, Shield, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#262626_0%,transparent_45%)] opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%,rgba(255,255,255,0.02))]" />
      <div className="w-full max-w-md relative z-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <div className="border-b border-white/10 px-8 py-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-300">
              Summit Global Admin
            </div>
            <div className="mt-6 flex items-center gap-4">
              <img
                src={SITE_IDENTITY.assets.logo.main}
                alt={SITE_IDENTITY.name}
                className="h-auto w-16 rounded-xl bg-white p-2"
              />
              <div>
                <h1 className="text-2xl font-black text-white">Summit Global</h1>
                <p className="text-sm font-medium text-zinc-400">Black & white admin access</p>
              </div>
            </div>
            <h2 className="mt-8 text-2xl font-black text-white">Admin Portal</h2>
            <p className="mt-2 text-sm text-zinc-400">Enter your credentials to access dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-white px-8 py-8">
            {error && (
              <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-zinc-100 p-4 text-sm text-zinc-700">
                <div className="h-2 w-2 rounded-full bg-black animate-pulse" />
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="username"
                    type="text"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50/80 py-3 pl-10 pr-3 text-slate-900 placeholder-slate-400 transition-all focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    className="block w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50/80 py-3 pl-10 pr-12 text-slate-900 placeholder-slate-400 transition-all focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-4 py-4 text-sm font-black text-white transition-all duration-300 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/20 disabled:bg-zinc-400"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="border-t border-zinc-200 bg-white px-8 pb-8 pt-6">
            <div className="text-center">
              <p className="mb-2 text-xs text-slate-500">
                Secure admin access for {SITE_IDENTITY.name}
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                <span>Secure Login</span>
                <span>•</span>
                <span>Protected Panel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
