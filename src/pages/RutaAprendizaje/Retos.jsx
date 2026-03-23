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
    <div className="p-8 max-w-2xl mx-auto">
      {/* Botón Volver mejorado */}
      <button
        onClick={() => navigate("/ruta")}
        className="mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </button>

      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        SECCIÓN DE RETOS
      </h2>

      {cargando ? (
        <p className="text-gray-600">Cargando...</p>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">

          {/* Reto 1 */}
          <button
            onClick={() => navigate("/ruta/retos/1")}
            className="block w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-5 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:shadow-lg transition-all text-left"
          >
            <span className="text-2xl mr-3">📚</span>
            <span className="font-semibold text-lg text-primary">RETO 1 - LETRAS</span>
          </button>

          {/* Reto 2 */}
          <button
            onClick={() => navigate("/ruta/retos/2")}
            disabled={!isRetoDesbloqueado(2)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(2)
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:from-green-100 hover:to-emerald-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">👋</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(2) ? "text-green-700" : "text-gray-500"}`}>RETO 2 - SALUDOS {isRetoDesbloqueado(2) ? "" : "🔒"}</span>
          </button>

          {/* Reto 3 */}
          <button
            onClick={() => navigate("/ruta/retos/3")}
            disabled={!isRetoDesbloqueado(3)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(3)
              ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:from-purple-100 hover:to-pink-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">🎨</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(3) ? "text-purple-700" : "text-gray-500"}`}>RETO 3 - COLORES {isRetoDesbloqueado(3) ? "" : "🔒"}</span>
          </button>

          {/* Reto 4 */}
          <button
            onClick={() => navigate("/ruta/retos/4")}
            disabled={!isRetoDesbloqueado(4)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(4)
              ? "bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 hover:from-pink-100 hover:to-rose-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">👨‍👩‍👧</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(4) ? "text-pink-700" : "text-gray-500"}`}>RETO 4 - FAMILIA {isRetoDesbloqueado(4) ? "" : "🔒"}</span>
          </button>

          {/* Reto 5 */}
          <button
            onClick={() => navigate("/ruta/retos/5")}
            disabled={!isRetoDesbloqueado(5)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(5)
              ? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 hover:from-orange-100 hover:to-amber-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">🍕</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(5) ? "text-orange-700" : "text-gray-500"}`}>RETO 5 - COMIDAS Y BEBIDAS {isRetoDesbloqueado(5) ? "" : "🔒"}</span>
          </button>

          {/* Reto 6 */}
          <button
            onClick={() => navigate("/ruta/retos/6")}
            disabled={!isRetoDesbloqueado(6)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(6)
              ? "bg-gradient-to-r from-cyan-50 to-sky-50 border-2 border-cyan-200 hover:from-cyan-100 hover:to-sky-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">👕</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(6) ? "text-cyan-700" : "text-gray-500"}`}>RETO 6 - ROPA {isRetoDesbloqueado(6) ? "" : "🔒"}</span>
          </button>

          {/* Reto 7 */}
          <button
            onClick={() => navigate("/ruta/retos/7")}
            disabled={!isRetoDesbloqueado(7)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(7)
              ? "bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 hover:from-teal-100 hover:to-emerald-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">🏠</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(7) ? "text-teal-700" : "text-gray-500"}`}>RETO 7 - CASA {isRetoDesbloqueado(7) ? "" : "🔒"}</span>
          </button>

          {/* Reto 8 */}
          <button
            onClick={() => navigate("/ruta/retos/8")}
            disabled={!isRetoDesbloqueado(8)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(8)
              ? "bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 hover:from-violet-100 hover:to-purple-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">🏫</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(8) ? "text-violet-700" : "text-gray-500"}`}>RETO 8 - COLEGIO {isRetoDesbloqueado(8) ? "" : "🔒"}</span>
          </button>

          {/* Reto 9 */}
          <button
            onClick={() => navigate("/ruta/retos/9")}
            disabled={!isRetoDesbloqueado(9)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(9)
              ? "bg-gradient-to-r from-slate-50 to-zinc-50 border-2 border-slate-200 hover:from-slate-100 hover:to-zinc-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">🏙️</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(9) ? "text-slate-700" : "text-gray-500"}`}>RETO 9 - CIUDAD {isRetoDesbloqueado(9) ? "" : "🔒"}</span>
          </button>

          {/* Reto 10 */}
          <button
            onClick={() => navigate("/ruta/retos/10")}
            disabled={!isRetoDesbloqueado(10)}
            className={`block w-full p-5 rounded-xl transition-all text-left ${isRetoDesbloqueado(10)
              ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 hover:from-amber-100 hover:to-yellow-100 hover:shadow-lg"
              : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-60"
              }`}
          >
            <span className="text-2xl mr-3">📅</span>
            <span className={`font-semibold text-lg ${isRetoDesbloqueado(10) ? "text-amber-700" : "text-gray-500"}`}>RETO 10 - CALENDARIO {isRetoDesbloqueado(10) ? "" : "🔒"}</span>
          </button>

        </div>
      )}
    </div>
  );
}




