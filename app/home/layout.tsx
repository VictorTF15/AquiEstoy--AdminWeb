import { AdminShell } from "@/components/AdminShell";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
