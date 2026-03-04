import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.TRANSLATOR_SERVER_PORT || 3002);
const TRANSLATOR_DIR = process.env.TRANSLATOR_DIR
  ? path.resolve(process.env.TRANSLATOR_DIR)
  : path.resolve(__dirname, '..', 'traductor_de_lengua_de_se-as');
const PYTHON_EXECUTABLE = process.env.TRANSLATOR_PYTHON
  ? path.resolve(process.env.TRANSLATOR_PYTHON)
  : path.join(TRANSLATOR_DIR, '.venv310', 'Scripts', 'python.exe');
const MAIN_SCRIPT = path.join(TRANSLATOR_DIR, 'main.py');

let translatorProcess = null;
let lastError = null;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function getStatus() {
  return {
    running: Boolean(translatorProcess && !translatorProcess.killed),
    pid: translatorProcess?.pid ?? null,
    translatorDir: TRANSLATOR_DIR,
    python: PYTHON_EXECUTABLE,
    script: MAIN_SCRIPT,
    lastError
  };
}

function startTranslator() {
  if (translatorProcess && !translatorProcess.killed) {
    return { ok: true, alreadyRunning: true, status: getStatus() };
  }

  if (!existsSync(TRANSLATOR_DIR)) {
    return { ok: false, error: `No existe el directorio del traductor: ${TRANSLATOR_DIR}` };
  }
  if (!existsSync(PYTHON_EXECUTABLE)) {
    return { ok: false, error: `No existe python del entorno virtual: ${PYTHON_EXECUTABLE}` };
  }
  if (!existsSync(MAIN_SCRIPT)) {
    return { ok: false, error: `No existe main.py: ${MAIN_SCRIPT}` };
  }

  lastError = null;
  translatorProcess = spawn(PYTHON_EXECUTABLE, ['main.py'], {
    cwd: TRANSLATOR_DIR,
    windowsHide: false,
    shell: false
  });

  translatorProcess.on('error', (err) => {
    lastError = err.message;
  });

  translatorProcess.stderr?.on('data', (chunk) => {
    lastError = String(chunk);
  });

  translatorProcess.on('exit', (code, signal) => {
    translatorProcess = null;
    if (code !== 0) {
      lastError = `El traductor terminó con código ${code ?? 'null'} y señal ${signal ?? 'null'}.`;
    }
  });

  return { ok: true, alreadyRunning: false, status: getStatus() };
}

function stopTranslator() {
  if (!translatorProcess || translatorProcess.killed) {
    return { ok: true, alreadyStopped: true, status: getStatus() };
  }

  const pid = translatorProcess.pid;
  const killed = translatorProcess.kill('SIGTERM');
  if (!killed) {
    return { ok: false, error: 'No se pudo detener el proceso del traductor.' };
  }
  return { ok: true, alreadyStopped: false, pid };
}

const server = createServer((req, res) => {
  const url = req.url || '/';
  const method = req.method || 'GET';

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (url === '/api/translator/status' && method === 'GET') {
    sendJson(res, 200, getStatus());
    return;
  }

  if (url === '/api/translator/start' && method === 'POST') {
    const result = startTranslator();
    sendJson(res, result.ok ? 200 : 500, result);
    return;
  }

  if (url === '/api/translator/stop' && method === 'POST') {
    const result = stopTranslator();
    sendJson(res, result.ok ? 200 : 500, result);
    return;
  }

  sendJson(res, 404, { error: 'Ruta no encontrada.' });
});

server.listen(PORT, () => {
  console.log(`Translator server escuchando en http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err?.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya está en uso. Usa otro con TRANSLATOR_SERVER_PORT o detén el proceso actual.`);
    process.exit(1);
  }
  console.error('Error iniciando translator-server:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  if (translatorProcess && !translatorProcess.killed) {
    translatorProcess.kill('SIGTERM');
  }
  process.exit(0);
});
