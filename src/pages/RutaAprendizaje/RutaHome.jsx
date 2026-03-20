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
          <p className="text-gray-600">Cargando tu progreso...</p>
        ) : progreso ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
            <p className="text-lg text-gray-700 mb-2">
              <strong>Reto actual:</strong> {progreso.reto_actual}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Lección actual:</strong> {progreso.leccion_actual}
            </p>
            {progreso.lecciones_completadas && (
              <p className="text-sm text-gray-500">
                Lecciones completadas: {progreso.lecciones_completadas.split(',').length}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600 mb-6">
            ¡Comienza tu aventura en el mundo de la lengua de señas!
          </p>
        )}

        <button
          onClick={() => navigate("/ruta/retos")}
          className="bg-accent px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Ver Retos
        </button>
    </div>
  );
}
