"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUserTypes,
  getUsers,
  updateUser,
} from "@/lib/adminApi";
import { useAlerts } from "@/components/AlertProvider";
import type { User } from "@/types/users";

interface UserFormState {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  telefono: string;
  id_tipo_usuario: string;
  ciudad: string;
  estado: string;
  colonia: string;
  direccion: string;
  codigo_postal: string;
  contrasena: string;
}

const initialForm: UserFormState = {
  nombres: "",
  apellido_paterno: "",
  apellido_materno: "",
  correo: "",
  telefono: "",
  id_tipo_usuario: "",
  ciudad: "",
  estado: "",
  colonia: "",
  direccion: "",
  codigo_postal: "",
  contrasena: "",
};

export default function UsuariosPage() {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useAlerts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [form, setForm] = useState<UserFormState>(initialForm);

  const usersQuery = useQuery({
    queryKey: ["users", "list"],
    queryFn: () => getUsers({ page: 1 }),
  });

  const userTypesQuery = useQuery({
    queryKey: ["users", "types"],
    queryFn: getUserTypes,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) => updateUser(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users", "list"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "metrics"] });
    },
  });

  const openCreate = () => {
    setSelected(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEdit = (user: User) => {
    setSelected(user);
    setForm({
      nombres: user.nombres || "",
      apellido_paterno: user.apellido_paterno || "",
      apellido_materno: user.apellido_materno || "",
      correo: user.correo || "",
      telefono: user.telefono || "",
      id_tipo_usuario: String(user.tipo_usuario?.id || ""),
      ciudad: user.ciudad || "",
      estado: user.estado || "",
      colonia: user.colonia || "",
      direccion: user.direccion || "",
      codigo_postal: user.codigo_postal || "",
      contrasena: "",
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

    if (!form.id_tipo_usuario) {
      showError("Selecciona un tipo de usuario valido.");
      return;
    }

    const payload = {
      nombres: form.nombres,
      apellido_paterno: form.apellido_paterno,
      apellido_materno: form.apellido_materno,
      correo: form.correo,
      telefono: form.telefono,
      id_tipo_usuario: Number(form.id_tipo_usuario),
      ciudad: form.ciudad,
      estado: form.estado,
      colonia: form.colonia,
      direccion: form.direccion,
      codigo_postal: form.codigo_postal,
      ...(form.contrasena ? { contrasena: form.contrasena } : {}),
    };

    try {
      if (selected?.id) {
        await updateMutation.mutateAsync({ id: selected.id, data: payload });
      } else {
        await createMutation.mutateAsync({ ...payload, contrasena: form.contrasena || "Temporal123!" });
      }

      closeModal();
      showSuccess(selected ? "Usuario actualizado correctamente." : "Usuario creado correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible guardar el usuario.");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      showSuccess("Usuario eliminado correctamente.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No fue posible eliminar el usuario.");
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="bg-gradient-to-br from-blue-700 to-sky-600 bg-clip-text text-3xl font-black text-transparent">
            Usuarios
          </h2>
          <p className="text-sm text-slate-600">Gestión de usuarios y tipos de acceso.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
        >
          <span></span> Nuevo usuario
        </button>
      </div>


      {/* Loading State */}
      {usersQuery.isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!usersQuery.isLoading && (usersQuery.data?.results || []).length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 py-16 text-center">
          <div className="mb-4 text-5xl"></div>
          <h3 className="text-lg font-bold text-slate-700">No hay usuarios yet</h3>
          <p className="mt-1 text-sm text-slate-600">Crea un nuevo usuario para empezar</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            Crear primer usuario
          </button>
        </div>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {(usersQuery.data?.results || []).map((user: User) => (
          <article
            key={user.id}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-slate-300/20"
          >
            {/* Top Accent Line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-sky-500" />

            {/* Header */}
            <div className="mb-3">
              <h3 className="line-clamp-1 text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                {user.nombres}
              </h3>
              <p className="line-clamp-1 text-xs font-semibold text-slate-600 mt-1">
                {user.apellido_paterno} {user.apellido_materno}
              </p>
            </div>

            {/* Contact & Type */}
            <div className="space-y-2">
              <p className="line-clamp-1 text-sm text-blue-600 font-medium">{user.correo}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-gradient-to-r from-blue-100 to-sky-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {user.tipo_usuario?.nombre || "Sin tipo"}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {user.telefono || "N/A"}
                </span>
              </div>
            </div>

            {/* City & Location */}
            <div className="mt-3 text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1">
                {user.ciudad}, {user.estado}
              </p>
              <p className="line-clamp-1">{user.colonia}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(user)}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-50 to-sky-50 px-3 py-2 text-xs font-bold text-blue-700 transition-all duration-200 hover:from-blue-100 hover:to-sky-100 hover:shadow-md"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(user.id)}
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
            className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-4"
          >
            {/* Modal Header */}
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h3 className="bg-gradient-to-r from-blue-700 to-sky-600 bg-clip-text text-2xl font-black text-transparent">
                {selected ? "Editar usuario" : "Crear nuevo usuario"}
              </h3>
            </div>

            {/* Form Fields - Names Section */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-slate-700">Información Personal</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <label className="text-sm font-semibold text-slate-700">
                  Nombres
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.nombres}
                    onChange={(event) => setForm((prev) => ({ ...prev, nombres: event.target.value }))}
                    placeholder="Juan"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Apellido paterno
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.apellido_paterno}
                    onChange={(event) => setForm((prev) => ({ ...prev, apellido_paterno: event.target.value }))}
                    placeholder="Pérez"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Apellido materno
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.apellido_materno}
                    onChange={(event) => setForm((prev) => ({ ...prev, apellido_materno: event.target.value }))}
                    placeholder="García"
                  />
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-slate-700">Contacto</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Correo
                  <input
                    type="email"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.correo}
                    onChange={(event) => setForm((prev) => ({ ...prev, correo: event.target.value }))}
                    placeholder="usuario@ejemplo.com"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Teléfono
                  <input
                    type="tel"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.telefono}
                    onChange={(event) => setForm((prev) => ({ ...prev, telefono: event.target.value }))}
                    placeholder="+52 1234567890"
                  />
                </label>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-slate-700">Domicilio</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Ciudad
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.ciudad}
                    onChange={(event) => setForm((prev) => ({ ...prev, ciudad: event.target.value }))}
                    placeholder="Ciudad de México"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Estado
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.estado}
                    onChange={(event) => setForm((prev) => ({ ...prev, estado: event.target.value }))}
                    placeholder="CDMX"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Colonia
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.colonia}
                    onChange={(event) => setForm((prev) => ({ ...prev, colonia: event.target.value }))}
                    placeholder="Coyoacán"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  Código postal
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.codigo_postal}
                    onChange={(event) => setForm((prev) => ({ ...prev, codigo_postal: event.target.value }))}
                    placeholder="04000"
                  />
                </label>
                <label className="col-span-full text-sm font-semibold text-slate-700">
                  Dirección
                  <input
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    required
                    value={form.direccion}
                    onChange={(event) => setForm((prev) => ({ ...prev, direccion: event.target.value }))}
                    placeholder="Calle Principal #123"
                  />
                </label>
              </div>
            </div>

            {/* User Type */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold text-slate-700">Tipo de Usuario</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(userTypesQuery.data?.results || []).map((item: { id: number; nombre: string }) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
                  >
                    <input
                      type="radio"
                      name="id_tipo_usuario"
                      value={String(item.id)}
                      checked={form.id_tipo_usuario === String(item.id)}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, id_tipo_usuario: event.target.value }))
                      }
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-slate-700">{item.nombre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Password - Only on Create */}
            {!selected && (
              <div className="mb-6">
                <p className="mb-3 text-sm font-bold text-slate-700">Contraseña Inicial</p>
                <label className="block text-sm font-semibold text-slate-700">
                  Contraseña
                  <input
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={form.contrasena}
                    onChange={(event) => setForm((prev) => ({ ...prev, contrasena: event.target.value }))}
                    placeholder="Temporal123!"
                  />
                </label>
                <p className="mt-2 text-xs text-slate-500">
                  Se usará Temporal123! si no ingresas una contraseña
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
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
                className="rounded-lg bg-gradient-to-r from-blue-700 to-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Guardando..."
                  : selected
                    ? "Guardar cambios"
                    : "Crear usuario"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
