import GuestGuard from '@/components/GuestGuard';

export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
