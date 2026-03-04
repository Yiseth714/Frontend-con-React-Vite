const API_BASE = import.meta.env.VITE_TRANSLATOR_API || 'http://localhost:3002';

async function fetchTranslator(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Error del servidor del traductor.');
  }
  return data;
}

export function getTranslatorStatus() {
  return fetchTranslator('/api/translator/status');
}

export function startTranslator() {
  return fetchTranslator('/api/translator/start', { method: 'POST' });
}

export function stopTranslator() {
  return fetchTranslator('/api/translator/stop', { method: 'POST' });
}
