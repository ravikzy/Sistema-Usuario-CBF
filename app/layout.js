import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-800">
        <ThemeProvider>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}