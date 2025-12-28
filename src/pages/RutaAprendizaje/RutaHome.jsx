import { useNavigate } from "react-router-dom";

export default function RutaHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Bienvenido a Ruta de Aprendizaje
      </h1>

      <button
        onClick={() => navigate("/ruta/retos")}
        className="bg-accent px-6 py-3 rounded-lg font-semibold"
      >
        Ver Retos
      </button>
    </div>
  );
}
