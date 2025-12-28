import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Retos() {
  const navigate = useNavigate();

  // progreso simple (luego se mejora)
  const [progreso] = useState({
    reto1: true,
    reto2: false,
    reto3: false,
  });

  return (
    <div className="min-h-screen bg-secondary p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Retos disponibles
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/ruta/retos/1")}
          className="block w-full bg-white p-4 rounded-lg"
        >
          Reto 1
        </button>

        <button
          disabled
          className="block w-full bg-gray-300 p-4 rounded-lg cursor-not-allowed"
        >
          Reto 2 🔒
        </button>

        <button
          disabled
          className="block w-full bg-gray-300 p-4 rounded-lg cursor-not-allowed"
        >
          Reto 3 🔒
        </button>
      </div>
    </div>
  );
}
