import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Aqui Estoy - Admin",
  description: "Panel administrativo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
