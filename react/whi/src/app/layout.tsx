import "./globals.css";
import { LoginStateProvider } from './provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>WHI?</title>
      <body>
      <LoginStateProvider>
        {children}
      </LoginStateProvider>
      </body>
    </html>
  );
}
