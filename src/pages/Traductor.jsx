import { useCallback, useState } from "react";
import CameraView from "../components/translator/Camera";
import { useSignLanguage } from "../hooks/useSignLanguage";

export default function Traductor() {
  const {
    connected,
    currentWord,
    confidence,
    history,
    sendLandmarks,
    clearHistory,
  } = useSignLanguage();
  const [cameraActive, setCameraActive] = useState(true);
  const [handDetected, setHandDetected] = useState(false);

  const handleLandmarks = useCallback(
    (landmarks) => {
      setHandDetected(landmarks.length > 0);
      sendLandmarks(landmarks);
    },
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
          <div className={`border-4 rounded-3xl overflow-hidden bg-black shadow-xl aspect-[4/3] ${handDetected ? 'border-yellow-400 shadow-green-200/30' : 'border-blue-400 shadow-blue-200/30'}`}>
            {cameraActive ? (
              <CameraView onLandmarks={handleLandmarks} />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-gray-300">
                Cámara desactivada. Pulsa el botón para activarla.
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => {
                setCameraActive((prev) => {
                  if (prev) setHandDetected(false);
                  return !prev;
                });
              }}
              className="inline-flex items-center justify-center rounded-lg border border-yellow-400 bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-yellow-500"
            >
              {cameraActive ? "Desactivar cámara" : "Activar cámara"}
            </button>
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white/10"
            >
              Limpiar historial
            </button>
          </div>
        </div>

        {/* Panel de traducción */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Palabra traducida */}
          <div
            className="rounded-2xl p-7 text-center min-h-40 md:min-h-44 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#F4F6F7", border: "1px solid #B1C2DA" }}
          >
            <span className="text-5xl md:text-6xl font-bold">
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