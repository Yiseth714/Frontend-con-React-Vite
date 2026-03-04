# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Integracion traductor LSP

Se agrego un servidor local para iniciar/detener el traductor Python (`main.py`) sin activar manualmente el entorno virtual.

1. Terminal 1 (frontend):
   - `npm run dev`
2. Terminal 2 (control del traductor):
   - `npm run dev:translator`

El panel de control aparece en Home y usa:
- `GET http://localhost:3002/api/translator/status`
- `POST http://localhost:3002/api/translator/start`
- `POST http://localhost:3002/api/translator/stop`

Variables opcionales:
- `TRANSLATOR_SERVER_PORT` (default `3002`)
- `TRANSLATOR_DIR` (default `../traductor_de_lengua_de_se-as`)
- `TRANSLATOR_PYTHON` (default `../traductor_de_lengua_de_se-as/.venv310/Scripts/python.exe`)
- `VITE_TRANSLATOR_API` para que React apunte a otro host/puerto
