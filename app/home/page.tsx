"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "@/lib/adminApi";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Users,
  Tags,
  Gauge,
  PieChart,
  BarChart3,
} from "lucide-react";

const snapshotCards = [
  {
    key: "casosTotales" as const,
    title: "Casos Totales",
    icon: FileText,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    key: "casosAbiertos" as const,
    title: "Casos Abiertos",
    icon: CheckCircle2,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    key: "casosCerrados" as const,
    title: "Casos Cerrados",
    icon: XCircle,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    key: "usuariosTotales" as const,
    title: "Usuarios",
    icon: Users,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    key: "categoriasTotales" as const,
    title: "Categorías",
    icon: Tags,
    gradient: "from-sky-500 to-cyan-500",
  },
] as const;

function LoadingSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function formatPercent(value: number) {
  return `${clampPercent(value).toFixed(1)}%`;
}

function formatNumber(value: number) {
  return value.toLocaleString("es-MX");
}

type MetricKey = (typeof snapshotCards)[number]["key"];

function SnapshotMetricCard({
  title,
  value,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
          <Icon size={19} className="text-white" />
        </div>
      </div>
      <p className="text-3xl font-black text-slate-900">{formatNumber(value)}</p>
    </article>
  );
}

function ProgressMetric({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-sm font-black text-slate-900">{formatPercent(value)}</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${clampPercent(value)}%` }} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    setHasToken(Boolean(token));
    setAuthChecked(true);
  }, []);

  const metricsQuery = useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: getDashboardMetrics,
    enabled: authChecked && hasToken,
  });

  const metrics = metricsQuery.data || {
    casosTotales: 0,
    casosAbiertos: 0,
    casosCerrados: 0,
    usuariosTotales: 0,
    categoriasTotales: 0,
  };

  const totalCasos = metrics.casosTotales;
  const abiertos = metrics.casosAbiertos;
  const cerrados = metrics.casosCerrados;
  const usuarios = metrics.usuariosTotales;
  const categorias = metrics.categoriasTotales;

  const tasaCierre = totalCasos > 0 ? (cerrados / totalCasos) * 100 : 0;
  const tasaApertura = totalCasos > 0 ? (abiertos / totalCasos) * 100 : 0;
  const casosPorUsuario = usuarios > 0 ? totalCasos / usuarios : 0;
  const casosPorCategoria = categorias > 0 ? totalCasos / categorias : 0;
  const balanceOperativo = cerrados - abiertos;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0f2d68] via-[#103b85] to-[#0f4aa4] p-7 text-white shadow-xl shadow-blue-900/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <Gauge size={22} className="text-white" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {metricsQuery.isError && (
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 p-6 shadow-sm">
          <p className="text-sm font-semibold text-blue-700">
            No fue posible cargar las métricas. Intenta más tarde.
          </p>
        </div>
      )}

      {metricsQuery.isLoading && <LoadingSkeleton />}

      {!metricsQuery.isLoading && !metricsQuery.isError && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {snapshotCards.map((card) => (
              <SnapshotMetricCard
                key={card.key}
                title={card.title}
                value={metrics[card.key as MetricKey]}
                icon={card.icon}
                gradient={card.gradient}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Estado de Casos</h2>
                  <p className="text-sm text-slate-500">Distribución porcentual del ciclo operativo</p>
                </div>
              </div>

              <div className="space-y-5">
                <ProgressMetric label="Casos Abiertos" value={tasaApertura} color="bg-gradient-to-r from-amber-400 to-orange-500" />
                <ProgressMetric label="Casos Cerrados" value={tasaCierre} color="bg-gradient-to-r from-emerald-400 to-green-600" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Abiertos</p>
                  <p className="mt-1 text-2xl font-black text-slate-900">{formatNumber(abiertos)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cerrados</p>
                  <p className="mt-1 text-2xl font-black text-slate-900">{formatNumber(cerrados)}</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  <PieChart size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Indicadores Clave</h2>
                  <p className="text-sm text-slate-500">Ratios operativos del sistema</p>
                </div>
              </div>

              <div className="space-y-4">
                
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Casos por Usuario</p>
                  <p className="mt-1 text-2xl font-black text-blue-700">{casosPorUsuario.toFixed(1)}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Casos por Categoría</p>
                  <p className="mt-1 text-2xl font-black text-indigo-700">{casosPorCategoria.toFixed(1)}</p>
                </div>
              </div>
            </article>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-slate-900">Resumen de Capacidad</h3>
              <p className="mt-1 text-sm text-slate-500">Capacidad del sistema frente a la carga actual.</p>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-600">Usuarios activos</span>
                  <span className="text-base font-black text-slate-900">{formatNumber(usuarios)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-600">Categorías activas</span>
                  <span className="text-base font-black text-slate-900">{formatNumber(categorias)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-600">Volumen de casos</span>
                  <span className="text-base font-black text-slate-900">{formatNumber(totalCasos)}</span>
                </div>
              </div>
            </article>

            
          </div>
        </>
      )}
    </section>
  );
}
