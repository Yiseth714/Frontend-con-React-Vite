import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cerrarSesion, obtenerNombreUsuario } from "../../services/auth";
import { obtenerProgreso } from "../../services/progreso";
import { estaLeccionCompletada } from "../../services/progreso";

export default function Retos() {
  const navigate = useNavigate();
  const nombreUsuario = obtenerNombreUsuario();
  const [progreso, setProgreso] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProgreso = async () => {
      try {
        const datos = await obtenerProgreso();
        setProgreso(datos);
      } catch (error) {
        console.error("Error al cargar progreso:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarProgreso();
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  // Verificar si un reto está disponible
  const isRetoDesbloqueado = (numeroReto) => {
    if (!progreso) return numeroReto === 1; // Solo el primero desbloqueado inicialmente
    if (numeroReto === 1) return true;
    if (numeroReto === 2) return estaLeccionCompletada(progreso, 1, 3); // Completar Reto 1
    if (numeroReto === 3) return estaLeccionCompletada(progreso, 2, 3); // Completar Reto 2
    return false;
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* HEADER */}
      <header className="bg-primary text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SeñaGo - Retos</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Hola, {nombreUsuario || 'Usuario'}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Retos disponibles
        </h2>

        {cargando ? (
          <p className="text-gray-600">Cargando...</p>
        ) : (
          <div className="space-y-4">

            {/* Reto 1 */}
            <button
              onClick={() => navigate("/ruta/retos/1")}
              className="block w-full bg-white p-4 rounded-lg hover:bg-gray-50 transition"
            >
              Reto 1 - Basics
            </button>

            {/* Reto 2 */}
            <button
              onClick={() => navigate("/ruta/retos/2")}
              disabled={!isRetoDesbloqueado(2)}
              className={`block w-full p-4 rounded-lg transition ${
                isRetoDesbloqueado(2)
                  ? "bg-white hover:bg-gray-50"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Reto 2 - Intermediate {isRetoDesbloqueado(2) ? "" : "🔒"}
            </button>

            {/* Reto 3 */}
            <button
              onClick={() => navigate("/ruta/retos/3")}
              disabled={!isRetoDesbloqueado(3)}
              className={`block w-full p-4 rounded-lg transition ${
                isRetoDesbloqueado(3)
                  ? "bg-white hover:bg-gray-50"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Reto 3 - Advanced {isRetoDesbloqueado(3) ? "" : "🔒"}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}




