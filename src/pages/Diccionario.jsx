

import { useState } from "react";

// Letras del abecedario
const letras = [
  "A","B","C","D","E","F","G",
  "H","I","J","K","L","M",
  "N","O","P","Q","R","S",
  "T","U","V","W","X","Y","Z"
];

export default function Diccionario() {
  const [letraActiva, setLetraActiva] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // Filtrar letras según búsqueda
  const letrasFiltradas = letras.filter((letra) =>
    letra.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-secondary p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Diccionario de señas
      </h2>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar letra..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6 w-full max-w-sm p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Letras */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mb-8">
        {letrasFiltradas.map((letra) => (
          <button
            key={letra}
            onClick={() => setLetraActiva(letra)}
            className={`p-3 rounded-lg font-bold text-lg
              ${letraActiva === letra
                ? "bg-primary text-white"
                : "bg-white text-primary"}
            `}
          >
            {letra}
          </button>
        ))}
      </div>

      {/* Imagen */}
      {letraActiva && (
        <div className="bg-white p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">
            Seña de la letra {letraActiva}
          </h3>

          <img
            src={`/src/assets/images/abecedario/${letraActiva}.png.jpeg`}
            alt={`Seña letra ${letraActiva}`}
            className="mx-auto w-48 h-48 object-contain"
          />
        </div>
      )}
    </div>
  );
}
