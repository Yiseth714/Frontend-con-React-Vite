import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { obtenerProgreso } from "../../services/progreso";
import { estaLeccionCompletada } from "../../services/progreso";

export default function Retos() {
  const navigate = useNavigate();
  const location = useLocation();
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
  }, [location.pathname]);

  // Verificar si un reto está disponible
  const isRetoDesbloqueado = (numeroReto) => {
    if (!progreso) return numeroReto === 1;

    // El primer reto siempre está desbloqueado
    if (numeroReto === 1) return true;

    // Para cualquier otro reto:
    // Se desbloquea si completó la última lección del reto anterior
    return estaLeccionCompletada(progreso, numeroReto - 1, 3);
  };

  return (
    <div className="p-8">
      <button
        onClick={() => navigate("/ruta")}
        className="mb-4 flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
      >
        Volver
      </button>
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
            Reto 1
          </button>

          {/* Reto 2 */}
          <button
            onClick={() => navigate("/ruta/retos/2")}
            disabled={!isRetoDesbloqueado(2)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(2)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 2 {isRetoDesbloqueado(2) ? "" : "🔒"}
          </button>

          {/* Reto 3 */}
          <button
            onClick={() => navigate("/ruta/retos/3")}
            disabled={!isRetoDesbloqueado(3)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(3)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 3 {isRetoDesbloqueado(3) ? "" : "🔒"}
          </button>

          {/* Reto 4 */}
          <button
            onClick={() => navigate("/ruta/retos/4")}
            disabled={!isRetoDesbloqueado(4)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(4)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 4 {isRetoDesbloqueado(4) ? "" : "🔒"}
          </button>

          {/* Reto 5 */}
          <button
            onClick={() => navigate("/ruta/retos/5")}
            disabled={!isRetoDesbloqueado(5)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(5)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 5 {isRetoDesbloqueado(5) ? "" : "🔒"}
          </button>

          {/* Reto 6 */}
          <button
            onClick={() => navigate("/ruta/retos/6")}
            disabled={!isRetoDesbloqueado(6)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(6)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 6 {isRetoDesbloqueado(6) ? "" : "🔒"}
          </button>

          {/* Reto 7 */}
          <button
            onClick={() => navigate("/ruta/retos/7")}
            disabled={!isRetoDesbloqueado(7)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(7)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 7 {isRetoDesbloqueado(7) ? "" : "🔒"}
          </button>

          {/* Reto 8 */}
          <button
            onClick={() => navigate("/ruta/retos/8")}
            disabled={!isRetoDesbloqueado(8)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(8)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 8 {isRetoDesbloqueado(8) ? "" : "🔒"}
          </button>

          {/* Reto 9 */}
          <button
            onClick={() => navigate("/ruta/retos/9")}
            disabled={!isRetoDesbloqueado(9)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(9)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 9 {isRetoDesbloqueado(9) ? "" : "🔒"}
          </button>

          {/* Reto 10 */}
          <button
            onClick={() => navigate("/ruta/retos/10")}
            disabled={!isRetoDesbloqueado(10)}
            className={`block w-full p-4 rounded-lg transition ${isRetoDesbloqueado(10)
              ? "bg-white hover:bg-gray-50"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Reto 10 {isRetoDesbloqueado(10) ? "" : "🔒"}
          </button>

        </div>
      )}
    </div>
  );
}




