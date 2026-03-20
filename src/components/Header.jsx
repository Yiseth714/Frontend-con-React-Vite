// ============================================
// Header - Componente de navegación global
// Muestra login/register o usuario + logout según estado
// ============================================

import { Link, useNavigate } from 'react-router-dom';
import { estaAutenticado, obtenerNombreUsuario, cerrarSesion, esAdministrador } from '../services/auth';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const autenticado = estaAutenticado();
  const nombreUsuario = obtenerNombreUsuario();
  const esAdmin = esAdministrador();

  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-3 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition">
          <span className="text-3xl">👋</span>
          <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">SeñaGo</span>
        </Link>

        {/* Botón hamburguesa (visible solo en móvil) */}
        <button 
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          onClick={toggleMenu}
        >
          {menuAbierto ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navegación (desktop) */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/diccionario" className="px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
            <span>📖</span>
            <span>Diccionario</span>
          </Link>
          <Link to="/ruta" className="px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
            <span>🎯</span>
            <span>Ruta de Aprendizaje</span>
          </Link>
          <Link to="/traductor" className="px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
            <span>✋</span>
            <span>Traductor</span>
          </Link>
          {autenticado && (
            <>
              <Link to="/perfil" className="px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
                <span>👤</span>
                <span>Mi Perfil</span>
              </Link>
              {esAdmin && (
                <Link to="/admin" className="px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium bg-purple-600">
                  <span>⚙️</span>
                  <span>Admin</span>
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Auth buttons (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {autenticado ? (
            <>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-lg">👋</span>
                <span className="font-medium">
                  Hola, {nombreUsuario || 'Usuario'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-primary px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                className="bg-white text-primary px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
          <nav className="flex flex-col gap-2">
            <Link to="/diccionario" onClick={() => setMenuAbierto(false)} className="px-4 py-3 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
              <span>📖</span>
              <span>Diccionario</span>
            </Link>
            <Link to="/ruta" onClick={() => setMenuAbierto(false)} className="px-4 py-3 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
              <span>🎯</span>
              <span>Ruta de Aprendizaje</span>
            </Link>
            <Link to="/traductor" onClick={() => setMenuAbierto(false)} className="px-4 py-3 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
              <span>✋</span>
              <span>Traductor</span>
            </Link>
            {autenticado && (
              <>
                <Link to="/perfil" onClick={() => setMenuAbierto(false)} className="px-4 py-3 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium">
                  <span>👤</span>
                  <span>Mi Perfil</span>
                </Link>
                {esAdmin && (
                  <Link to="/admin" onClick={() => setMenuAbierto(false)} className="px-4 py-3 rounded-lg hover:bg-white/10 transition flex items-center gap-2 font-medium bg-purple-600">
                    <span>⚙️</span>
                    <span>Panel Admin</span>
                  </Link>
                )}
              </>
            )}
          </nav>
          
          <div className="mt-4 pt-4 border-t border-white/20">
            {autenticado ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-lg">
                  <span className="text-lg">👋</span>
                  <span className="font-medium">
                    Hola, {nombreUsuario || 'Usuario'}
                  </span>
                </div>
                <button
                  onClick={() => { handleLogout(); setMenuAbierto(false); }}
                  className="bg-white text-primary px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md text-center"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuAbierto(false)}
                  className="px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition text-center"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  onClick={() => setMenuAbierto(false)}
                  className="bg-white text-primary px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md text-center"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
