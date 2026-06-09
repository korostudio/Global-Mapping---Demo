"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("gm_admin_token")) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.ok) {
        localStorage.setItem("gm_admin_token", data.token);
        localStorage.setItem("gm_admin_user", data.user);
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D2137] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[420px]">

        <div className="flex justify-center mb-10">
          <Image
            src="/logo.svg"
            alt="Global Mapping"
            width={220}
            height={55}
            className="h-14 w-auto brightness-0 invert"
            priority
          />
        </div>

        <div className="bg-white rounded-[6px] shadow-2xl p-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#F4F6F8] rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00a9c2]" />
              <span className="font-condensed text-[10px] font-semibold tracking-[0.12em] uppercase text-[#6B7280]">
                Área restringida
              </span>
            </div>
            <h1 className="font-condensed text-[24px] font-bold tracking-[0.03em] uppercase text-[#0D2137] leading-tight">
              Panel de<br />Administración
            </h1>
            <p className="text-[13px] text-[#6B7280] mt-2">
              Ingresa tus credenciales para acceder al gestor de contenido.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block font-condensed text-[10px] font-semibold tracking-[0.12em] uppercase text-[#374151] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@globalmapping.biz"
                required
                autoComplete="email"
                className="w-full px-4 py-3 text-[14px] border border-[#E5E7EB] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00a9c2] focus:ring-2 focus:ring-[#00a9c2]/20 rounded-[4px] transition-all"
              />
            </div>

            <div>
              <label className="block font-condensed text-[10px] font-semibold tracking-[0.12em] uppercase text-[#374151] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 text-[14px] border border-[#E5E7EB] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00a9c2] focus:ring-2 focus:ring-[#00a9c2]/20 rounded-[4px] transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-[4px] px-4 py-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-red-500 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
                </svg>
                <p className="text-[13px] text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="font-condensed bg-[#00a9c2] hover:bg-[#007F94] text-white font-bold text-[13px] tracking-[0.1em] uppercase py-3.5 rounded-[4px] transition-colors disabled:opacity-60 mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Ingresando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-[#F4F6F8]">
            <p className="font-condensed text-[10px] font-semibold tracking-[0.12em] uppercase text-[#9CA3AF] text-center mb-3">
              Credenciales de demo
            </p>
            <div className="bg-[#F4F6F8] rounded-[4px] p-3.5 space-y-1">
              <div className="flex justify-between">
                <span className="text-[12px] text-[#9CA3AF]">Email</span>
                <span className="text-[12px] text-[#374151] font-medium">admin@globalmapping.biz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] text-[#9CA3AF]">Contraseña</span>
                <span className="text-[12px] text-[#374151] font-medium">demo1234</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/25 mt-6">
          © 2026 Global Mapping SAC — Panel interno
        </p>
      </div>
    </div>
  );
}
