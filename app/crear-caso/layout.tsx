import AuthGuard from '@/components/AuthGuard';

export default function CrearCasoLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
