import AuthGuard from '@/components/AuthGuard';

export default function PerfilLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
