import { useEffect, useState } from 'react';
import {
  getTranslatorStatus,
  startTranslator,
  stopTranslator
} from '../../services/translator';

function TranslatorControl() {
  const [status, setStatus] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState(null);

  const loadStatus = async () => {
    try {
      const data = await getTranslatorStatus();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'No se pudo consultar el estado del traductor.');
    }
  };

  const handleStart = async () => {
    setLoadingAction(true);
    try {
      await startTranslator();
      await loadStatus();
    } catch (err) {
      setError(err.message || 'No se pudo iniciar el traductor.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleStop = async () => {
    setLoadingAction(true);
    try {
      await stopTranslator();
      await loadStatus();
    } catch (err) {
      setError(err.message || 'No se pudo detener el traductor.');
    } finally {
      setLoadingAction(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <section className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2">Traductor LSP</h2>
      <p className="text-sm text-gray-600 mb-4">
        Inicia o detiene <code>main.py</code> del traductor desde este panel.
      </p>

      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={handleStart}
          disabled={loadingAction || status?.running}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-4 py-2 rounded"
        >
          Iniciar traductor
        </button>
        <button
          type="button"
          onClick={handleStop}
          disabled={loadingAction || !status?.running}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded"
        >
          Detener traductor
        </button>
        <button
          type="button"
          onClick={loadStatus}
          disabled={loadingAction}
          className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white px-4 py-2 rounded"
        >
          Actualizar estado
        </button>
      </div>

      {status && (
        <div className="text-sm">
          <p>
            Estado:{' '}
            <span className={status.running ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
              {status.running ? 'En ejecución' : 'Detenido'}
            </span>
          </p>
          <p>PID: {status.pid ?? 'N/A'}</p>
          {status.lastError ? <p className="text-red-700">Último error: {status.lastError}</p> : null}
        </div>
      )}

      {error ? <p className="text-red-700 text-sm mt-3">{error}</p> : null}
    </section>
  );
}

export default TranslatorControl;
