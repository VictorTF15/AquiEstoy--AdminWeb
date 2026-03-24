import AuthGuard from '@/components/AuthGuard';

export default function MensajesLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
