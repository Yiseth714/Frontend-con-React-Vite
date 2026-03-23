import { useCallback } from "react";
import CameraView from "../components/translator/Camera";
import { useSignLanguage } from "../hooks/useSignLanguage";

export default function Traductor() {
  const {
    connected,
    currentWord,
    confidence,
    history,
    status,
    sendLandmarks,
  } = useSignLanguage();

  const handleLandmarks = useCallback(
    (landmarks) => sendLandmarks(landmarks),
    [sendLandmarks]
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-1">Traductor de Lengua de Señas</h1>

      <span
        className={`text-sm font-medium ${
          connected ? "text-green-500" : "text-red-500"
        }`}
      >
        {connected ? "● Conectado" : "● Desconectado"}
      </span>

      {/* Layout: columna en móvil, fila en desktop */}
      <div className="flex flex-col md:flex-row gap-6 mt-4">

        {/* Cámara */}
        <div className="w-full md:w-auto md:flex-shrink-0">
          <CameraView onLandmarks={handleLandmarks} />

          {/* Estado debajo de la cámara */}
          <div className="mt-2 text-center text-sm font-medium min-h-6">
            {status === "waiting" && (
              <span className="text-gray-400">
                Muestra tu mano a la cámara
              </span>
            )}
            {status === "capturing" && (
              <span className="text-blue-500 animate-pulse">
                Capturando seña... retira la mano cuando termines
              </span>
            )}
            {status === "idle" && (
              <span className="text-green-500">
                Listo para la siguiente seña
              </span>
            )}
          </div>
        </div>

        {/* Panel de traducción */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Palabra traducida */}
          <div className="border-2 border-gray-200 rounded-2xl p-6 text-center min-h-32 flex flex-col items-center justify-center">
            <span className="text-6xl md:text-7xl font-bold">
              {currentWord || "—"}
            </span>
            {currentWord && (
              <span className="text-sm text-gray-400 mt-2">
                Confianza: {Math.round(confidence * 100)}%
              </span>
            )}
          </div>

          {/* Historial */}
          {history.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Historial</h3>
              <ul className="space-y-2">
                {history.map((item, i) => (
                  <li
                    key={i}
                    className={`flex justify-between px-4 py-2 rounded-xl text-sm ${
                      i === 0
                        ? "bg-green-50 border border-green-100"
                        : "bg-gray-50"
                    }`}
                  >
                    <span className="font-semibold">{item.word}</span>
                    <span className="text-gray-400">
                      {Math.round(item.confidence * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}