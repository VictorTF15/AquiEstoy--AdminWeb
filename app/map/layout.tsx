import { AdminShell } from "@/components/AdminShell";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
