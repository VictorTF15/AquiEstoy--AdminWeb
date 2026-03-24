"use client";

interface EvidenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  idCaso: number;
  idUsuario: number;
  nombreUsuario: string;
  tituloCase: string;
}

export default function EvidenciaModal({ isOpen, onClose }: EvidenciaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
        <h3 className="text-lg font-black text-slate-900">Modulo de evidencia</h3>
        <p className="mt-2 text-sm text-slate-600">
          Esta version del panel se enfoca en los modulos administrativos principales.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
