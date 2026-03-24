"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

type AlertType = "success" | "error";

interface AlertItem {
  id: number;
  type: AlertType;
  message: string;
}

interface AlertContextValue {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

function AlertCard({ item, onClose }: { item: AlertItem; onClose: () => void }) {
  const isSuccess = item.type === "success";
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  return (
    <div
      className={`relative overflow-hidden rounded-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-right-6 fade-in ${
        isSuccess
          ? "border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 to-emerald-900/40 shadow-lg shadow-emerald-500/20"
          : "border-red-500/30 bg-gradient-to-r from-red-950/60 to-red-900/40 shadow-lg shadow-red-500/20"
      }`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          isSuccess ? "from-emerald-500 via-teal-500 to-emerald-500" : "from-red-500 via-rose-500 to-red-500"
        }`}
      />

      <div className="flex items-start gap-3 p-4">
        <div
          className={`mt-0.5 flex-shrink-0 rounded-full p-1 ${
            isSuccess ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}
        >
          <Icon
            size={20}
            className={isSuccess ? "text-emerald-400" : "text-red-400"}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold leading-snug ${
              isSuccess ? "text-emerald-200" : "text-red-200"
            }`}
          >
            {item.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`flex-shrink-0 rounded-md p-1 transition-colors hover:bg-white/10 ${
            isSuccess ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const pushAlert = useCallback((type: AlertType, message: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setAlerts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setAlerts((prev) => prev.filter((item) => item.id !== id));
    }, 3500);
  }, []);

  const value = useMemo<AlertContextValue>(
    () => ({
      showSuccess: (message: string) => pushAlert("success", message),
      showError: (message: string) => pushAlert("error", message),
    }),
    [pushAlert],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(92vw,420px)] flex-col gap-3">
        {alerts.map((item) => (
          <div key={item.id} className="pointer-events-auto">
            <AlertCard
              item={item}
              onClose={() => setAlerts((prev) => prev.filter((entry) => entry.id !== item.id))}
            />
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerts debe usarse dentro de AlertProvider");
  }
  return context;
}
