import { useNavigate } from "react-router-dom";

export default function Retos() {
  const navigate = useNavigate();

  // leer progreso real desde localStorage
  const reto1Completado = localStorage.getItem("reto1Completado") === "true";
  const reto2Completado = localStorage.getItem("reto2Completado") === "true";

  return (
    <div className="min-h-screen bg-secondary p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Retos disponibles
      </h2>

      <div className="space-y-4">

        {/* Reto 1 */}
        <button
          onClick={() => navigate("/ruta/retos/1")}
          className="block w-full bg-white p-4 rounded-lg"
        >
          Reto 1
        </button>

        {/* Reto 2 */}
        <button
          onClick={() => navigate("/ruta/retos/2")}
          disabled={!reto1Completado}
          className={`block w-full p-4 rounded-lg ${
            reto1Completado
              ? "bg-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Reto 2 {reto1Completado ? "" : "🔒"}
        </button>

        {/* Reto 3 */}
        <button
          onClick={() => navigate("/ruta/retos/3")}
          disabled={!reto2Completado}
          className={`block w-full p-4 rounded-lg ${
            reto2Completado
              ? "bg-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Reto 3 {reto2Completado ? "" : "🔒"}
        </button>

      </div>
    </div>
  );
}




