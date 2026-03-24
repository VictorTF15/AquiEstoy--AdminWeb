"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCase,
  deleteCase,
  getCases,
  normalizeCaseOpenState,
  updateCase,
} from "@/lib/adminApi";
import { useAlerts } from "@/components/AlertProvider";
import type { Caso } from "@/types/casos";

interface CasoFormState {
  titulo: string;
  descripcion: string;
  entidad: string;
  colonia: string;
  latitud: string;
  longitud: string;
  prioridad: string;
  idBeneficiario: string;
  idEstado: string;
  esta_abierto: "true" | "false";
}

const initialForm: CasoFormState = {
  titulo: "",
  descripcion: "",
  entidad: "",
  colonia: "",
  latitud: "",
  longitud: "",
  prioridad: "1",
  idBeneficiario: "",
  idEstado: "",
  esta_abierto: "true",
};

export default function CasosPage() {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useAlerts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<Caso | null>(null);
  const [form, setForm] = useState<CasoFormState>(initialForm);

  const casosQuery = useQuery({
    queryKey: ["cases", "list"],
    queryFn: () => getCases({ page: 1 }),
  });

  const createMutation = useMutation({
    mutationFn: createCase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cases", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      updateCase(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cases", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cases", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const casos = useMemo(() => casosQuery.data?.results || [], [casosQuery.data]);

  const openCreate = () => {
    setSelected(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEdit = (caso: Caso) => {
    setSelected(caso);
    setForm({
      titulo: caso.titulo || "",
      descripcion: caso.descripcion || "",
      entidad: caso.entidad || "",
      colonia: caso.colonia || "",
      latitud: String(caso.latitud || ""),
      longitud: String(caso.longitud || ""),
      prioridad: String(caso.prioridad || 1),
      idBeneficiario: String(caso.idBeneficiario ?? caso.id_beneficiario ?? ""),
      idEstado: String(caso.idEstado ?? caso.id_estado ?? ""),
      esta_abierto: normalizeCaseOpenState(caso) ? "true" : "false",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelected(null);
    setForm(initialForm);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      entidad: form.entidad,
      colonia: form.colonia,
      latitud: form.latitud,
      longitud: form.longitud,
      prioridad: Number(form.prioridad || 1),
      idBeneficiario: Number(form.idBeneficiario),
      id_beneficiario: Number(form.idBeneficiario),
      idEstado: Number(form.idEstado),
      id_estado: Number(form.idEstado),
      esta_abierto: form.esta_abierto === "true",
      estaAbierto: form.esta_abierto === "true",
      categorias_ids: [],
    };

    try {
      if (selected?.id) {
        await updateMutation.mutateAsync({ id: selected.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      closeModal();
      showSuccess(selected ? "Caso actualizado correctamente." : "Caso creado correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible guardar el caso.");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      showSuccess("Caso eliminado correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible eliminar el caso.");
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-3xl font-black text-transparent">
            Casos
          </h2>
          <p className="text-sm text-slate-600">Gestión de casos abiertos y cerrados.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
        >
          <span></span> Nuevo caso
        </button>
      </div>

      {/* Loading State */}
      {casosQuery.isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!casosQuery.isLoading && casos.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 py-16 text-center">
          <div className="mb-4 text-5xl"></div>
          <h3 className="text-lg font-bold text-slate-700">No hay casos yet</h3>
          <p className="mt-1 text-sm text-slate-600">Crea un nuevo caso para empezar</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            Crear primer caso
          </button>
        </div>
      )}

      {/* Cases Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {casos.map((caso: Caso) => {
          const isOpen = normalizeCaseOpenState(caso);
          return (
            <article
              key={caso.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-slate-300/20"
            >
              {/* Top Accent Line */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  isOpen
                    ? "from-blue-500 to-cyan-500"
                    : "from-indigo-500 to-blue-500"
                }`}
              />

              {/* Status Badge */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="line-clamp-2 text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {caso.titulo}
                  </h3>
                </div>
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
                    isOpen
                      ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700"
                      : "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700"
                  }`}
                >
                  {isOpen ? "Abierto" : "Cerrado"}
                </span>
              </div>

              {/* Description */}
              <p className="line-clamp-2 text-sm text-slate-600">{caso.descripcion}</p>

              {/* Location & Details */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium">
                  {caso.colonia}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium">
                  🏛️ {caso.entidad}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium">
                  Estado #{caso.idEstado ?? caso.id_estado ?? "-"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(caso)}
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-2 text-xs font-bold text-blue-700 transition-all duration-200 hover:from-blue-100 hover:to-cyan-100 hover:shadow-md"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(caso.id)}
                  className="flex-1 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 px-3 py-2 text-xs font-bold text-indigo-700 transition-all duration-200 hover:from-indigo-100 hover:to-blue-100 hover:shadow-md"
                >
                  Eliminar
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={onSubmit}
            className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-4"
          >
            {/* Modal Header */}
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h3 className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-2xl font-black text-transparent">
                {selected ? "Editar caso" : "Crear nuevo caso"}
              </h3>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["titulo", "Titulo", "text"],
                ["descripcion", "Descripcion", "text"],
                ["entidad", "Entidad", "text"],
                ["colonia", "Colonia", "text"],
                ["latitud", "Latitud", "number"],
                ["longitud", "Longitud", "number"],
                ["prioridad", "Prioridad", "number"],
                ["idBeneficiario", "ID Beneficiario", "number"],
                ["idEstado", "ID Estado", "number"],
              ].map(([field, label, type]) => (
                <label key={field} className="text-sm font-semibold text-slate-700">
                  {label}
                  <input
                    type={type}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form[field as keyof CasoFormState]}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, [field]: event.target.value }))
                    }
                    required
                  />
                </label>
              ))}
              <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                Estado
                <select
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  value={form.esta_abierto}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, esta_abierto: event.target.value as "true" | "false" }))
                  }
                >
                  <option value="true">Abierto</option>
                  <option value="false">Cerrado</option>
                </select>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Guardando..."
                  : selected
                    ? "Guardar cambios"
                    : "Crear caso"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
