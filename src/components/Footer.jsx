// ============================================
// Footer - Componente de pie de página global
// ============================================

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white text-center py-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm mb-2">
          © {anioActual} SeñaGo - App de Lengua de Señas
        </p>
        <p className="text-xs text-white/70">
          Promoviendo la inclusión y accesibilidad para todos
        </p>
      </div>
    </footer>
  );
}

export default Footer;
