"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/lib/adminApi";
import { useAlerts } from "@/components/AlertProvider";
import type { Categoria } from "@/types/categorias";

export default function CategoriasPage() {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useAlerts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<Categoria | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [esActivo, setEsActivo] = useState(true);

  const categoriasQuery = useQuery({
    queryKey: ["categories", "list"],
    queryFn: () => getCategories({ page: 1 }),
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { nombre: string; descripcion: string; es_activo: boolean } }) =>
      updateCategory(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const openCreate = () => {
    setSelected(null);
    setNombre("");
    setDescripcion("");
    setEsActivo(true);
    setIsModalOpen(true);
  };

  const openEdit = (categoria: Categoria) => {
    setSelected(categoria);
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion || "");
    setEsActivo(Boolean(categoria.es_activo));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelected(null);
    setNombre("");
    setDescripcion("");
    setEsActivo(true);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (selected?.id) {
        await updateMutation.mutateAsync({
          id: selected.id,
          data: { nombre, descripcion, es_activo: esActivo },
        });
      } else {
        await createMutation.mutateAsync({ nombre, descripcion, es_activo: esActivo });
      }

      closeModal();
      showSuccess(selected ? "Categoria actualizada correctamente." : "Categoria creada correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible guardar la categoria.");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      showSuccess("Categoria eliminada correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible eliminar la categoria.");
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="bg-gradient-to-br from-blue-600 to-sky-500 bg-clip-text text-3xl font-black text-transparent">
            Categorías
          </h2>
          <p className="text-sm text-slate-600">CRUD completo para clasificación de casos.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
        >
          <span></span> Nueva categoría
        </button>
      </div>

      {/* Loading State */}
      {categoriasQuery.isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!categoriasQuery.isLoading && (categoriasQuery.data?.results || []).length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 py-16 text-center">
          <div className="mb-4 text-5xl"></div>
          <h3 className="text-lg font-bold text-slate-700">No hay categorías yet</h3>
          <p className="mt-1 text-sm text-slate-600">Crea una nueva categoría para empezar</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            Crear primera categoría
          </button>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {(categoriasQuery.data?.results || []).map((categoria: Categoria) => (
          <article
            key={categoria.id}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-slate-300/20"
          >
            {/* Top Accent Line */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                categoria.es_activo
                  ? "from-blue-500 to-sky-500"
                  : "from-slate-400 to-slate-500"
              }`}
            />

            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="line-clamp-2 text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {categoria.nombre}
                </h3>
              </div>
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
                  categoria.es_activo
                    ? "bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700"
                    : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700"
                }`}
              >
                {categoria.es_activo ? "Activa" : "Inactiva"}
              </span>
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-sm text-slate-600">{categoria.descripcion}</p>

            {/* Action Buttons */}
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(categoria)}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-50 to-sky-50 px-3 py-2 text-xs font-bold text-blue-700 transition-all duration-200 hover:from-blue-100 hover:to-sky-100 hover:shadow-md"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(categoria.id)}
                className="flex-1 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:from-slate-100 hover:to-slate-200 hover:shadow-md"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-4"
          >
            {/* Modal Header */}
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h3 className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-2xl font-black text-transparent">
                {selected ? "Editar categoría" : "Crear nueva categoría"}
              </h3>
            </div>

            {/* Form Fields */}
            <label className="block text-sm font-semibold text-slate-700">
              Nombre
              <input
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                required
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Ej: Abastecimiento de agua"
              />
            </label>
            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Descripción
              <textarea
                className="mt-1.5 h-24 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                required
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
                placeholder="Escribe una descripción detallada..."
              />
            </label>
            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Estado
              <select
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                value={esActivo ? "activa" : "inactiva"}
                onChange={(event) => setEsActivo(event.target.value === "activa")}
              >
                <option value="activa">Activa</option>
                <option value="inactiva">Inactiva</option>
              </select>
            </label>

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
                className="rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Guardando..."
                  : selected
                    ? "Guardar cambios"
                    : "Crear categoría"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
