import AuthGuard from '@/components/AuthGuard';

export default function CasoLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
