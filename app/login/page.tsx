"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EclipseLogo } from "@/components/EclipseLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      if (result.error.includes("desactivada") || result.error.includes("INACTIVE")) {
        setError("Tu cuenta está desactivada. Contacta al administrador.");
      } else {
        setError("Credenciales inválidas. Verifica tu email y contraseña.");
      }
      return;
    }

    // Get session to determine redirect
    const res = await fetch("/api/auth/session");
    const session = await res.json();
    if (session?.user?.role === "ADMIN") {
      router.push("/dashboard");
    } else {
      router.push("/team");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0D0825]">
      {/* Stars */}
      <div className="stars-bg" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-sm px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <EclipseLogo size={88} />
          <div className="mt-3 text-center">
            <h1 className="font-display text-4xl tracking-widest text-[#E8D44D]">
              ECLIPSE FM
            </h1>
            <p className="text-[#7B6FA0] text-xs tracking-[0.3em] uppercase mt-0.5">
              107.7 · Panel Interno
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(28,16,64,0.95)",
            border: "1px solid rgba(124,58,237,0.2)",
            boxShadow: "0 25px 60px rgba(8,4,26,0.8), 0 0 40px rgba(124,58,237,0.1)",
          }}
        >
          <h2 className="text-white font-semibold text-lg mb-6 text-center">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#A89EC0] uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@eclipsefm.cl"
                required
                className="w-full px-4 py-3 rounded-lg bg-[rgba(8,4,26,0.7)] border border-[rgba(124,58,237,0.3)] text-white placeholder-[#7B6FA0] text-sm transition-all duration-200 focus:outline-none focus:border-[#E8D44D] focus:ring-1 focus:ring-[rgba(232,212,77,0.35)]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#A89EC0] uppercase tracking-wide">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg bg-[rgba(8,4,26,0.7)] border border-[rgba(124,58,237,0.3)] text-white placeholder-[#7B6FA0] text-sm transition-all duration-200 focus:outline-none focus:border-[#E8D44D] focus:ring-1 focus:ring-[rgba(232,212,77,0.35)]"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-[#0D0825] text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{
                background: "linear-gradient(90deg, #E8D44D, #F5E878)",
              }}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="text-center text-[#7B6FA0] text-xs mt-6">
            Solo el administrador puede crear cuentas.
          </p>
        </div>
      </div>
    </div>
  );
}
