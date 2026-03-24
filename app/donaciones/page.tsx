"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDonation,
  deleteDonation,
  getDonations,
  updateDonation,
} from "@/lib/adminApi";
import { useAlerts } from "@/components/AlertProvider";
import type { Donacion } from "@/types/donaciones";

interface DonationFormState {
  estado_donacion: string;
  id_donador: string;
  id_caso: string;
  fecha_compromiso: string;
  fecha_donacion: string;
  mensaje_donador: string;
  cantidad_donacion: string;
  descripcion_donacion: string;
  id_categoria: string;
}

const initialForm: DonationFormState = {
  estado_donacion: "pendiente",
  id_donador: "",
  id_caso: "",
  fecha_compromiso: "",
  fecha_donacion: "",
  mensaje_donador: "",
  cantidad_donacion: "",
  descripcion_donacion: "",
  id_categoria: "",
};

export default function DonacionesPage() {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useAlerts();

  const formatCantidad = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") return "";
    const parsed = Number.parseFloat(String(value));
    if (Number.isNaN(parsed)) return String(value);
    return String(Math.trunc(parsed));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<Donacion | null>(null);
  const [form, setForm] = useState<DonationFormState>(initialForm);

  const donacionesQuery = useQuery({
    queryKey: ["donations", "list"],
    queryFn: () => getDonations({ page: 1 }),
  });

  const createMutation = useMutation({
    mutationFn: createDonation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["donations", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      updateDonation(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["donations", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDonation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["donations", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const openCreate = () => {
    setSelected(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEdit = (donacion: Donacion) => {
    setSelected(donacion);
    setForm({
      estado_donacion: donacion.estado_donacion || "pendiente",
      id_donador: String(donacion.id_donador || ""),
      id_caso: String(donacion.id_caso || ""),
      fecha_compromiso: donacion.fecha_compromiso?.slice(0, 10) || "",
      fecha_donacion: donacion.fecha_donacion?.slice(0, 10) || "",
      mensaje_donador: donacion.mensaje_donador || "",
      cantidad_donacion: donacion.cantidad_donacion || "",
      descripcion_donacion: donacion.descripcion_donacion || "",
      id_categoria: String(donacion.id_categoria || ""),
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
      estado_donacion: form.estado_donacion,
      id_donador: Number(form.id_donador),
      id_caso: Number(form.id_caso),
      fecha_compromiso: form.fecha_compromiso,
      fecha_donacion: form.fecha_donacion,
      mensaje_donador: form.mensaje_donador,
      cantidad_donacion: form.cantidad_donacion,
      descripcion_donacion: form.descripcion_donacion,
      id_categoria: Number(form.id_categoria),
    };

    try {
      if (selected?.id) {
        await updateMutation.mutateAsync({ id: selected.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      closeModal();
      showSuccess(selected ? "Donacion actualizada correctamente." : "Donacion creada correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible guardar la donacion.");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      showSuccess("Donacion eliminada correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible eliminar la donacion.");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="bg-gradient-to-br from-blue-600 to-sky-500 bg-clip-text text-3xl font-black text-transparent">
            Donaciones
          </h2>
          <p className="text-sm text-slate-600">Registro y seguimiento de donaciones.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
        >
          <span></span> Nueva donación
        </button>
      </div>

      {donacionesQuery.isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300"
            />
          ))}
        </div>
      )}

      {!donacionesQuery.isLoading && (donacionesQuery.data?.results || []).length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 py-16 text-center">
          <div className="mb-4 text-5xl"></div>
          <h3 className="text-lg font-bold text-slate-700">No hay donaciones yet</h3>
          <p className="mt-1 text-sm text-slate-600">Crea una nueva donación para empezar</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            Crear primera donación
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {(donacionesQuery.data?.results || []).map((donacion: Donacion) => (
          <article key={donacion.id} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-slate-300/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-sky-500" />
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  Caso #{donacion.id_caso}
                </h3>
                <p className="mt-1 text-xs text-slate-500">Donador ID: {donacion.id_donador}</p>
              </div>
              <span className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700">
                {donacion.estado_donacion}
              </span>
            </div>
            <div className="mb-3 rounded-lg bg-gradient-to-r from-blue-50 to-sky-50 p-3">
              <p className="text-xs text-slate-600">Cantidad</p>
              <p className="text-2xl font-black text-blue-600">
                {formatCantidad(donacion.cantidad_donacion) || "N/A"}
              </p>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>📅 Comprometida:</span>
                <span className="font-medium text-slate-900">{donacion.fecha_compromiso?.slice(0, 10) || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span>Donada:</span>
                <span className="font-medium text-slate-900">{donacion.fecha_donacion?.slice(0, 10) || "N/A"}</span>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(donacion)}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-50 to-sky-50 px-3 py-2 text-xs font-bold text-blue-700 transition-all duration-200 hover:from-blue-100 hover:to-sky-100 hover:shadow-md"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(donacion.id)}
                className="flex-1 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:from-slate-100 hover:to-slate-200 hover:shadow-md"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={onSubmit} className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-4">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h3 className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-2xl font-black text-transparent">
                {selected ? "Editar donación" : "Crear nueva donación"}
              </h3>
            </div>
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-slate-700">Información básica</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  ID Donador
                  <input
                    type="number"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.id_donador}
                    onChange={(event) => setForm((prev) => ({ ...prev, id_donador: event.target.value }))}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  ID Caso
                  <input
                    type="number"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.id_caso}
                    onChange={(event) => setForm((prev) => ({ ...prev, id_caso: event.target.value }))}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  ID Categoría
                  <input
                    type="number"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.id_categoria}
                    onChange={(event) => setForm((prev) => ({ ...prev, id_categoria: event.target.value }))}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Estado
                  <select
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.estado_donacion}
                    onChange={(event) => setForm((prev) => ({ ...prev, estado_donacion: event.target.value }))}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="completada">Completada</option>
                    <option value="rechazada">Rechazada</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-slate-700">💰 Cantidad y Fechas</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <label className="text-sm font-semibold text-slate-700">
                  Cantidad
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.cantidad_donacion}
                    onChange={(event) => setForm((prev) => ({ ...prev, cantidad_donacion: event.target.value }))}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Fecha Compromiso
                  <input
                    type="date"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.fecha_compromiso}
                    onChange={(event) => setForm((prev) => ({ ...prev, fecha_compromiso: event.target.value }))}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Fecha Donación
                  <input
                    type="date"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.fecha_donacion}
                    onChange={(event) => setForm((prev) => ({ ...prev, fecha_donacion: event.target.value }))}
                  />
                </label>
              </div>
            </div>
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-slate-700">📝 Mensajes</p>
              <div className="grid grid-cols-1 gap-4">
                <label className="text-sm font-semibold text-slate-700">
                  Mensaje del Donador
                  <textarea
                    className="mt-1.5 h-20 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                    value={form.mensaje_donador}
                    onChange={(event) => setForm((prev) => ({ ...prev, mensaje_donador: event.target.value }))}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Descripción
                  <textarea
                    className="mt-1.5 h-20 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                    value={form.descripcion_donacion}
                    onChange={(event) => setForm((prev) => ({ ...prev, descripcion_donacion: event.target.value }))}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
              <button type="button" onClick={closeModal} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createMutation.isPending || updateMutation.isPending ? "Guardando..." : selected ? "Guardar cambios" : "Crear donación"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
