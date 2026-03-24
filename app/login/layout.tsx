import GuestGuard from '@/components/GuestGuard';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
