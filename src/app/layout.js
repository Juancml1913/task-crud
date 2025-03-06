import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
