// ============================================
// Footer - Componente de pie de página global
// ============================================

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary to-primary/90 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm font-medium mb-1">
          © {anioActual} SeñaGo - Aprende Lenguaje de Señas. 
        </p>
        <p className="text-xs text-white/70">
          Promoviendo la inclusión y accesibilidad para todos. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
