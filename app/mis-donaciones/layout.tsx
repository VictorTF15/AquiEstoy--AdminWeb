import AuthGuard from '@/components/AuthGuard';

export default function MisDonacionesLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
