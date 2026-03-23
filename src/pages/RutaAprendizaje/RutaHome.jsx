import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerProgreso } from "../../services/progreso";

export default function RutaHome() {
  const navigate = useNavigate();
  const [progreso, setProgreso] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cargar el progreso del usuario
    const cargarProgreso = async () => {
      try {
        const datos = await obtenerProgreso();
        
        // Calcular el progreso real basándose en las lecciones completadas
        if (datos && datos.lecciones_completadas) {
          const leccionesCompletadas = datos.lecciones_completadas.split(",").filter(l => l.trim() !== "");
          
          // Encontrar el reto y lección más altos alcanzados
          let maxReto = 0;
          let maxLeccion = 0;
          
          leccionesCompletadas.forEach(leccionKey => {
            const [reto, leccion] = leccionKey.split("-").map(Number);
            if (reto > maxReto) {
              maxReto = reto;
              maxLeccion = leccion;
            } else if (reto === maxReto && leccion > maxLeccion) {
              maxLeccion = leccion;
            }
          });
          
          // Si hay lecciones completadas, actualizar el progreso
          if (maxReto > 0) {
            datos.reto_actual = maxReto;
            // La siguiente lección sería la última completada + 1
            datos.leccion_actual = maxLeccion >= 3 ? 1 : maxLeccion + 1;
            // Si completó la lección 3, el siguiente reto
            if (maxLeccion >= 3) {
              datos.reto_actual = maxReto + 1;
            }
          }
        }
        
        setProgreso(datos);
      } catch (error) {
        console.error("Error al cargar progreso:", error);
        // Si no tiene progreso, será null
      } finally {
        setCargando(false);
      }
    };
    cargarProgreso();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Bienvenido a tu Ruta de Aprendizaje
        </h1>

        {cargando ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500">Cargando tu progreso...</p>
          </div>
        ) : progreso && progreso.lecciones_completadas ? (
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="text-5xl mb-3"></div>
              <h3 className="text-xl font-bold text-gray-800">Tu Progreso</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-600 font-medium mb-1">Reto Actual</p>
                <p className="text-3xl font-bold text-blue-700">
                  {progreso.reto_actual || 1}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <p className="text-sm text-green-600 font-medium mb-1">Lección Actual</p>
                <p className="text-3xl font-bold text-green-700">
                  {progreso.leccion_actual || 1}
                </p>
              </div>
              
              {progreso.lecciones_completadas && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Lecciones completadas: <span className="font-semibold text-gray-700">{progreso.lecciones_completadas.split(',').filter(l => l.trim() !== '').length}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 px-6">
            <div className="text-6xl mb-4"></div>
            <p className="text-gray-600 mb-6 text-lg">
              ¡Comienza tu aventura en el mundo de la lengua de señas!
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("/ruta/retos")}
          className="mt-6 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          Ver Retos
        </button>
    </div>
  );
}
