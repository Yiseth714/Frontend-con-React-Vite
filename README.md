# SeñaGo - Frontend

Aplicación web para el aprendizaje de la Lengua de Señas Colombiana (LSC), desarrollada con React y Vite.

## 📌 Descripción

**SeñaGo** es una plataforma educativa diseñada para enseñar la Lengua de Señas Colombiana (LSC) de manera interactiva y accesible. El proyecto utiliza tecnologías modernas de visión por computadora y machine learning para proporcionar una experiencia de aprendizaje inmersiva.

### Características Principales

- 📖 **Diccionario visual** de señas (alfabeto, números, palabras comunes)
- ✋ **Traductor en tiempo real** con detección de manos y machine learning
- 🎯 **Ruta de aprendizaje** estructurada con retos y lecciones
- 🏆 **Sistema de logros** para motivar el aprendizaje
- ⚙️ **Panel de administración** para gestionar usuarios

Este es el repositorio del **Frontend**, desarrollado con React y Vite.

---

## 🚀 Tecnologías Principales

| Tecnología | Propósito |
|------------|-----------|
| **React 19** | Biblioteca de interfaz de usuario |
| **Vite** | Build tool y servidor de desarrollo rápido |
| **TailwindCSS** | Framework de estilos utilitarios |
| **React Router** | Navegación entre páginas SPA |
| **MediaPipe Hands** | Detección de manos en tiempo real |
| **WebSocket** | Comunicación bidireccional en tiempo real |
| **Driver.js** | Tutoriales guiados paso a paso |
| **SpeechSynthesis API** | Síntesis de voz para pronunciar palabras |

### Dependencias Adicionales

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0",
    "@mediapipe/hands": "^0.4.1675469240",
    "driver.js": "^1.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "eslint": "^9.17.0"
  }
}
```

---

## 📁 Estructura del Proyecto

```
Frontend-con-React-Vite/
├── public/
│   └── vite.svg                    # Logo de Vite
├── src/
│   ├── api/
│   │   ├── client.js               # Cliente HTTP centralizado con axios
│   │   ├── auth.js                 # Endpoints de autenticación
│   │   ├── progreso.js             # Endpoints de progreso
│   │   ├── logros.js               # Endpoints de logros
│   │   └── admin.js                # Endpoints de administración
│   ├── assets/
│   │   └── images/
│   │       ├── abecedario/         # Señas A-Z (imágenes)
│   │       ├── numeros/            # Señas 1-30 (imágenes)
│   │       ├── palabras/           # Palabras por categoría
│   │       │   ├── saludos-cortesia/
│   │       │   ├── comidas-bebidas/
│   │       │   └── cuerpo/
│   │       └── retos/              # Imágenes de retos
│   ├── components/
│   │   ├── Header.jsx              # Navegación principal
│   │   ├── Footer.jsx              # Pie de página
│   │   ├── Layout.jsx              # Diseño principal
│   │   ├── ProtectedRoute.jsx      # Ruta protegida
│   │   ├── contador.jsx            # Contador simple
│   │   ├── navigation.jsx          # Navegación
│   │   └── home/
│   │       └── Posts.jsx           # Componente de posts
│   ├── hooks/
│   │   └── useSignLanguage.js      # WebSocket del traductor
│   ├── pages/
│   │   ├── Login.jsx               # Inicio de sesión
│   │   ├── Registro.jsx            # Registro de usuario
│   │   ├── HomePages.jsx           # Página principal
│   │   ├── Diccionario.jsx         # Diccionario de señas
│   │   ├── Traductor.jsx            # Traductor en tiempo real
│   │   ├── Profile.jsx             # Perfil del usuario
│   │   ├── admin/
│   │   │   └── index.jsx           # Panel de administración
│   │   └── RutaAprendizaje/
│   │       ├── RutaHome.jsx        # Ruta de aprendizaje
│   │       ├── Retos.jsx           # Lista de retos
│   │       └── Reto.jsx            # Detalle de un reto
│   ├── services/
│   │   └── posts.js                # Servicios de posts
│   ├── utils/
│   │   └── tour.js                 # Tutorial guiado (Driver.js)
│   ├── router.jsx                 # Configuración de rutas
│   ├── App.jsx                    # Componente raíz
│   ├── main.jsx                   # Punto de entrada
│   └── style.css                  # Estilos globales
├── .env                            # Variables de entorno (producción)
├── .env.development                # Variables de desarrollo
├── package.json                    # Dependencias npm
├── vite.config.js                  # Configuración de Vite
├── tailwind.config.js              # Configuración de Tailwind
└── postcss.config.js               # Configuración de PostCSS
```

---

## 🔧 Requisitos Previos

| Requisito | Versión Mínima | Notas |
|-----------|----------------|-------|
| **Node.js** | 18+ | Se recomienda LTS |
| **npm** | 9+ | Incluido con Node.js |
| **Navegador moderno** | Chrome/Firefox/Edge/Safari | Ver compatibilidad abajo |

### Navegadores Compatibles

| Navegador | Versión Mínima | WebSocket | MediaPipe | Camera API |
|----------|----------------|-----------|-----------|------------|
| **Chrome** | 80+ | ✅ | ✅ | ✅ |
| **Firefox** | 75+ | ✅ | ✅ | ✅ |
| **Edge** | 80+ | ✅ | ✅ | ✅ |
| **Safari** | 14.1+ | ✅ | ✅ | ✅ |

> ℹ️ **Nota**: Para usar la cámara en producción, el sitio debe ser serveido via **HTTPS**.

---

## 📝 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Yiseth714/Frontend-con-React-Vite.git
cd Frontend-con-React-Vite
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL del servidor backend
VITE_API_URL=http://localhost:8000

# Prefijo de la API
VITE_API_PREFIX=/api/v1

# URL del WebSocket (opcional, tiene fallback)
VITE_WS_URL=ws://localhost:8000/api/v1/traductor/ws
```

O para desarrollo con SSL:

```env
VITE_API_URL=https://localhost:8000
VITE_WS_URL=wss://localhost:8000/api/v1/traductor/ws
```

### 4. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El servidor arrancará en: `http://localhost:5173`

> **Nota:** El proyecto usa HTTPS en desarrollo gracias al plugin `@vitejs/plugin-basic-ssl`.

### 5. Construir para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

---

## 🛤️ Rutas de la Aplicación

| Ruta | Componente | Descripción | Autenticación |
|------|------------|-------------|---------------|
| `/` | HomePages | Página principal pública | No |
| `/login` | Login | Formulario de inicio de sesión | No |
| `/registro` | Registro | Formulario de registro | No |
| `/traductor` | Traductor | Traductor en tiempo real | No |
| `/diccionario` | Diccionario | Diccionario de señas | **Sí** |
| `/ruta` | RutaHome | Ruta de aprendizaje | **Sí** |
| `/ruta/retos` | Retos | Lista de retos disponibles | **Sí** |
| `/ruta/retos/:id` | Reto | Detalle de un reto específico | **Sí** |
| `/perfil` | Profile | Perfil del usuario | **Sí** |
| `/admin` | admin/index | Panel de administración | **Sí** (admin) |

---

## 📖 Funcionalidades Principales

### 1. 🔐 Autenticación

El sistema de autenticación utiliza JWT (JSON Web Tokens) para mantener la sesión del usuario.

**Características:**
- Registro de usuarios con nombre, contraseña y tipo de discapacidad
- Inicio de sesión con validación de credenciales
- Roles de usuario: `normal` y `administrador`
- Almacenamiento del token en localStorage
- Protección de rutas mediante componentes HOC

**Flujo de autenticación:**
```
1. Usuario llena el formulario de registro/login
2. Frontend envía credenciales al backend via POST
3. Backend valida y retorna token JWT
4. Frontend guarda token en localStorage
5. Token se envía en header Authorization en cada request
```

### 2. 📖 Diccionario

El diccionario visual incluye tres categorías principales:

**Alfabetos (A-Z)**
- 26 letras del alfabeto en LSC
- Imágenes de alta calidad para cada letra

**Números (1-30)**
- Números del 1 al 30 en LSC
- Representación visual clara

**Palabras por categoría**
- Saludos y cortesía: hola, gracias, por favor, etc.
- Comidas y bebidas: arroz, leche, agua, etc.
- Partes del cuerpo: cabeza, brazo, pierna, etc.

### 3. ✋ Traductor en Tiempo Real

El traductor es una de las características más innovadoras del proyecto.

#### Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────┐    ┌──────────────┐    ┌────────────┐    ┌────────────┐  │
│  │  CÁMARA  │───►│  MEDIAPIPE   │───►│  PROCESO   │───►│  WEBSOCKET │  │
│  │  VIDEO   │    │   HANDS      │    │  LANDMARKS │    │   CLIENT   │  │
│  └──────────┘    └──────────────┘    └────────────┘    └────────────┘  │
│       │                │                   │                 │           │
│       │           21 puntos          Normalizar         Enviar         │
│       │          (x, y, z)           landmarks          datos          │
│       │                                                    │           │
│       ▼                                                    ▼           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                   COMPONENTE TRADUCTOR.JSX                       │   │
│  │                                                                  │   │
│  │  - useSignLanguage hook (gestiona WebSocket)                   │   │
│  │  - MediaPipe Hands (detecta manos)                              │   │
│  │  - SpeechSynthesis (pronuncia palabras)                         │   │
│  │  - UI (muestra cámara, predicciones, historial)                │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
└────────────────────────────────────┼────────────────────────────────────┘
                                     │ WebSocket
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          BACKEND (FastAPI)                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌────────────┐    ┌─────────────────┐    ┌────────────────────────┐  │
│  │  WEBSOCKET │───►│ SIGN MODEL      │───│   TENSORFLOW LSTM      │  │
│  │  SERVER    │    │ HANDLER         │    │   (sign_model.h5)     │  │
│  └────────────┘    └─────────────────┘    └────────────────────────┘  │
│                                    │                                    │
│                           Predicción + confianza                        │
│                                    ▼                                    │
│                     Responder con palabra predicha                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Hook useSignLanguage

El hook `useSignLanguage` es el核/core del traductor. Se encuentra en `src/hooks/useSignLanguage.js`.

**Características del hook:**
- Gestiona la conexión WebSocket automáticamente
- Reconecta automáticamente si se pierde la conexión
- Almacena historial de palabras traducidas
- Integración con SpeechSynthesis para pronunciar

**Ejemplo de uso en Traductor.jsx:**

```jsx
import { useSignLanguage } from '../hooks/useSignLanguage';
import { Hands } from '@mediapipe/hands';

function Traductor() {
  const {
    connected,
    currentWord,
    confidence,
    history,
    sendLandmarks
  } = useSignLanguage();

  const onResults = (results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
      // Enviar los 21 landmarks al backend
      sendLandmarks(results.multiHandLandmarks[0]);
    }
  };

  return (
    <div>
      <Camera onResults={onResults} />
      <div>
        <h2>Palabra: {currentWord}</h2>
        <p>Confianza: {confidence}%</p>
        <p>Estado: {connected ? 'Conectado' : 'Desconectado'}</h2>
      </div>
      <div>
        <h3>Historial</h3>
        {history.map((item, i) => (
          <div key={i}>{item.word} ({item.confidence})</div>
        ))}
      </div>
    </div>
  );
}
```

#### Protocolo WebSocket

**Mensajes enviados (Frontend → Backend):**

```javascript
// Envío de landmarks
{
  "landmarks": [
    [0.123, 0.456, 0.789],  // Punto 1: muñeca
    [0.234, 0.567, 0.890],  // Punto 2: pulgar
    [0.345, 0.678, 0.901],  // Punto 3: indice
    // ... 21 puntos en total (0-20)
  ],
  "hand_mode": 2  // 1 = mano izquierda, 2 = mano derecha
}
```

**Mensajes recibidos (Backend → Frontend):**

```javascript
// Predicción exitosa
{
  "type": "prediction",
  "word": "HOLA",
  "confidence": 0.95
}

// Capturando frames (construyendo secuencia)
{
  "type": "capturing",
  "frames": 15
}

// Esperando mano
{
  "type": "waiting"
}
```

### 4. 🎓 Ruta de Aprendizaje

Sistema de aprendizaje progresivo estructurado en retos.

**Estructura:**
- **3 retos principales** que se deben completar en orden
- Cada reto contiene **lecciones** con preguntas de opción múltiple
- El progreso se guarda en la base de datos
- Desbloqueo progresivo: solo puedes acceder al siguiente reto cuando completes el actual

**Estados del usuario:**
- Reto no disponible (locked)
- Reto disponible para iniciar
- Lección en progreso
- Lección completada

### 5. ⚙️ Panel de Administración

Accesible solo para usuarios con rol `administrador`.

**Funcionalidades:**
- Ver lista completa de usuarios registrados
- Editar información de usuarios
- Eliminar usuarios del sistema
- Cambiar rol de usuario (normal ↔ administrador)
- Ver progreso de cualquier usuario
- Ver logros obtenidos por cualquier usuario

---

## ⚠️ Limitación del Modelo (Importante)

> **ADVERTENCIA**: El modelo de TensorFlow en el backend se carga como una **instancia global**. Esto afecta al frontend de la siguiente manera:

- **Solo un usuario** puede usar el traductor simultáneamente
- Si múltiples usuarios intentas usar el traductor al mismo tiempo, las predicciones pueden interferir
- La secuencia de frames se resetea cuando el modelo procesa una nueva predicción

**Recomendaciones:**
- Limita el acceso al traductor a un usuario a la vez
- Considera implementar una cola de espera
- Para producción, el traductor debería desplegarse como un microservicio separado

---

## 🔌 Integración con el Backend

### Cliente HTTP

El proyecto usa un cliente HTTP centralizado en `src/api/client.js`:

```javascript
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token JWT
client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
```

### WebSocket para el Traductor

```javascript
const ws = new WebSocket(import.meta.env.VITE_WS_URL);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'prediction') {
    // Mostrar palabra predicha
    speakWord(data.word);
  }
};

function sendLandmarks(landmarks) {
  ws.send(JSON.stringify({
    landmarks: landmarks,
    hand_mode: 2
  }));
}
```

---

## ❓ Solución de Problemas Comunes

### Error: "CORS policy blocked"
```
Access to XMLHttpRequest at 'http://localhost:8000/api/v1/auth/login' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solución:**
- El backend debe tener configurado CORS con el origen del frontend
- Verifica que `VITE_API_URL` en el frontend coincide con la URL del backend
- Asegúrate de que el backend tiene `allow_origins` configurado correctamente

### Error: WebSocket connection failed
```
WebSocket connection to 'ws://localhost:8000/api/v1/traductor/ws' failed
```
**Solución:**
- El servidor backend debe estar ejecutándose
- Verifica que el puerto 8000 está disponible
- Revisa la consola del navegador para más detalles
- Si usas HTTPS, usa `wss://` en lugar de `ws://`

### Error: Camera not available
```
NotAllowedError: Permission denied or response denied
```
**Solución:**
- Permisos de cámara bloqueados en el navegador
- Verifica que allows camera access en la configuración del navegador
- Usa HTTPS en producción para acceder a la cámara (requerido por navegadores)
- Confirma que ningún otro programa esté usando la cámara

### Error: Model prediction failed
```
Error: Model prediction failed
```
**Solución:**
- El modelo de TensorFlow no cargó correctamente
- Verifica que el backend tiene el archivo `sign_model.h5`
- Revisa los logs del servidor para errores de carga
- Asegúrate de que TensorFlow está instalado correctamente

### La página no carga después de hacer build
```
Cannot GET /diccionario
```
**Solución:**
- Configura correctamente la variable `VITE_API_URL` en producción
- Para Nginx, agrega configuración de rewrite:
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```
- Para Apache, usa el archivo `.htaccess` con mod_rewrite

### Problemas con TailwindCSS
```
Error: CSS class not found
```
**Solución:**
- Ejecuta `npm run build` para regenerar los estilos
- Verifica que `tailwind.config.js` tiene la ruta correcta:
  ```javascript
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  ```
- Asegúrate de importar tailwind en `style.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### Error: Token JWT expirado
```
401 Unauthorized: "No se pudo validar las credenciales"
```
**Solución:**
- El token JWT expiró (por defecto 30 minutos)
- Implementa refresh token o muestra mensaje para iniciar sesión nuevamente
- Verifica la configuración `ACCESS_TOKEN_EXPIRE_MINUTES` en el backend

---

## 🎨 Personalización

### Cambiar Colores Principales

Edita `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',  // Cambia este color
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  },
  plugins: [],
}
```

### Agregar Nueva Página

1. Crea el componente en `src/pages/`
2. Agrega la ruta en `src/router.jsx`:
   ```jsx
   <Route path="/nueva-ruta" element={<NuevaPagina />} />
   ```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🤝 Contribuidores

Proyecto desarrollado por el equipo de SeñaGo.
