# Documentación Técnica - Frontend SeñaGo (React Vite)

## 1. Estructura Real del Proyecto

```
Frontend-con-React-Vite/
├── public/                      # Archivos estáticos públicos
│   └── vite.svg                # Logo de Vite
├── src/                        # Código fuente principal
│   ├── api/                    # Cliente HTTP y servicios de API
│   │   ├── client.js          # Cliente HTTP centralizado (fetch)
│   │   ├── auth.js            # Endpoints de autenticación
│   │   ├── progreso.js        # Endpoints de progreso
│   │   ├── logros.js          # Endpoints de logros
│   │   └── admin.js           # Endpoints de administración
│   ├── services/              # Re-exports para compatibilidad
│   │   ├── auth.js            # → Re-exporta de api/auth
│   │   ├── progreso.js        # → Re-exporta de api/progreso
│   │   ├── logros.js         # → Re-exporta de api/logros
│   │   └── admin.js           # → Re-exporta de api/admin
│   ├── components/            # Componentes globales
│   │   ├── Layout.jsx         # Wrapper con Header + Footer
│   │   ├── Header.jsx         # Navegación principal
│   │   ├── Footer.jsx        # Pie de página
│   │   ├── ProtectedRoute.jsx # Ruta protegida
│   │   ├── Contador.jsx      # Componente contador
│   │   ├── Navigation.jsx     # Componente de navegación
│   │   ├── home/              # Componentes de home
│   │   │   └── Posts.jsx
│   │   └── (otros componentes)
│   ├── pages/                 # Pantallas completas
│   │   ├── Login.jsx          # Página de inicio de sesión
│   │   ├── Registro.jsx       # Página de registro
│   │   ├── HomePages.jsx      # Página principal (home)
│   │   ├── Diccionario.jsx    # Diccionario de señas
│   │   ├── Traductor.jsx      # Traductor en tiempo real
│   │   ├── Profile.jsx        # Perfil del usuario
│   │   ├── Admin.jsx          # Wrapper (redirige a admin/)
│   │   ├── index.js           # Exports de páginas
│   │   ├── admin/             # Panel de administración
│   │   │   ├── index.jsx      # Componente principal del admin
│   │   │   ├── components/    # Componentes del admin
│   │   │   │   ├── Estadisticas.jsx    # Tarjetas de estadísticas
│   │   │   │   ├── TablaUsuarios.jsx   # Tabla de usuarios
│   │   │   │   ├── ModalDetalle.jsx    # Modal ver detalles
│   │   │   │   ├── ModalEditar.jsx     # Modal editar usuario
│   │   │   │   └── UsuarioBadge.jsx    # Badges (tipo, discapacidad)
│   │   │   ├── hooks/         # Hooks específicos del admin
│   │   │   │   └── useAdmin.js         # Lógica de negocio del admin
│   │   │   └── utils/        # Utilidades del admin
│   │   │       └── dateUtils.js         # Funciones de fechas
│   │   └── RutaAprendizaje/   # Módulo de aprendizaje
│   │       ├── RutaHome.jsx   # Home de ruta
│   │       ├── Retos.jsx      # Lista de retos
│   │       └── Reto.jsx       # Una lección de reto
│   ├── hooks/                 # Hooks globales
│   │   └── usePosts.js        # Hook para posts
│   ├── assets/                # Recursos estáticos
│   │   ├── react.svg         # Logo de React
│   │   └── images/            # Imágenes
│   │       ├── Diccionario.png
│   │       ├── Ruta.png / Ruta.jpeg
│   │       ├── Traductor.png
│   │       ├── abecedario/    # Imágenes A-Z
│   │       ├── numeros/       # Imágenes 1-30
│   │       ├── palabras/      # Palabras por categorías
│   │       │   ├── comidas-bebidas/
│   │       │   ├── cuerpo/
│   │       │   └── saludos-cortesia/
│   │       └── retos/         # Imágenes de retos
│   │           ├── reto1/
│   │           ├── reto2/
│   │           └── reto3/
│   ├── router.jsx             # Configuración de rutas
│   ├── App.jsx               # Componente raíz
│   ├── main.jsx              # Punto de entrada
│   └── style.css            # Estilos globales (Tailwind)
├── index.html                # HTML principal
├── package.json             # Dependencias
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
└── eslint.config.js         # Configuración de ESLint
```

---

## 2. Explicación de Cada Carpeta

### 2.1 `src/api/` - Cliente HTTP y Servicios

**Propósito:** Centralizar la comunicación con el backend FastAPI.

**Archivos:**

| Archivo | Descripción |
|---------|-------------|
| `client.js` | Cliente HTTP base con fetch. Maneja tokens, headers, errores. |
| `auth.js` | Endpoints: login, registro, perfil, cerrar sesión. |
| `progreso.js` | Endpoints: crear/obtener/actualizar progreso, marcar lección completada. |
| `logros.js` | Endpoints: obtener logros, crear logros, constantes de logros. |
| `admin.js` | Endpoints: usuarios, estadísticas, eliminar, cambiar tipo, actualizar. |

**Responsabilidad:**
- Realizar peticiones HTTP al backend
- Manejar tokens de autenticación (Bearer token)
- Procesar respuestas y lanzar errores

**Ejemplo de código (client.js):**

```javascript
// URL base del backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api/v1';
const BASE_URL = `${API_BASE_URL}${API_PREFIX}`;

// Headers con token
function getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

// Peticiones GET, POST, PUT, DELETE
export async function get(endpoint, authenticated = false) {
    const headers = authenticated ? getAuthHeaders() : { 'Content-Type': 'application/json' };
    const response = await fetch(`${BASE_URL}${endpoint}`, { method: 'GET', headers });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
}
```

**Ejemplo de uso (auth.js):**

```javascript
import { get, post } from './client';

export async function iniciarSesion(nombre_usuario, contrasena) {
    const data = await post('/auth/login', { nombre_usuario, contrasena }, false);
    localStorage.setItem('token', data.token_acceso);
    localStorage.setItem('nombre_usuario', nombre_usuario);
    localStorage.setItem('tipo_usuario', data.tipo_usuario);
    return data;
}

export function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('tipo_usuario');
}

export function esAdministrador() {
    return localStorage.getItem('tipo_usuario') === 'administrador';
}
```

---

### 2.2 `src/services/` - Re-exports

**Propósito:** Mantener compatibilidad con importaciones existentes en el proyecto.

**Archivos:**

| Archivo | Descripción |
|---------|-------------|
| `auth.js` | Re-exporta todo de `../api/auth.js` |
| `progreso.js` | Re-exporta todo de `../api/progreso.js` |
| `logros.js` | Re-exporta todo de `../api/logros.js` |
| `admin.js` | Re-exporta todo de `../api/admin.js` |

**Nota:** Esta carpeta existe para compatibilidad hacia atrás. Las páginas pueden importar desde `services/` o directamente desde `api/`.

**Ejemplo:**

```javascript
// services/auth.js
export * from '../api/auth';
```

---

### 2.3 `src/components/` - Componentes Globales

**Propósito:** Componentes reutilizables en toda la aplicación.

**Archivos:**

| Archivo | Descripción |
|---------|-------------|
| `Layout.jsx` | Wrapper que incluye Header, Footer y contenido. |
| `Header.jsx` | Barra de navegación con menú, autenticación. |
| `Footer.jsx` | Pie de página simple. |
| `ProtectedRoute.jsx` | Protege rutas que requieren autenticación. |
| `Navigation.jsx` | Componente de navegación. |


**Ejemplo (Layout.jsx):**

```javascript
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-secondary">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
```

**Ejemplo (ProtectedRoute.jsx):**

```javascript
import { Navigate, useLocation } from 'react-router-dom';
import { estaAutenticado } from '../services/auth';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const autenticado = estaAutenticado();

    if (!autenticado) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
```

---

### 2.4 `src/pages/` - Pantallas Completas

**Propósito:** Componentes que representan páginas enteras de la aplicación.

**Estructura:**

| Página | Descripción |
|--------|-------------|
| `Login.jsx` | Formulario de inicio de sesión |
| `Registro.jsx` | Formulario de registro de usuario |
| `HomePages.jsx` | Página principal con cards de navegación |
| `Diccionario.jsx` | Diccionario de señas (letras, números, palabras) |
| `Traductor.jsx` | Traductor en tiempo real con cámara |
| `Profile.jsx` | Perfil del usuario con logros |
| `Admin.jsx` | Wrapper que redirige a admin/index.jsx |
| `admin/index.jsx` | Panel de administración principal |

**Sub-carpetas:**

| Carpeta | Descripción |
|---------|-------------|
| `admin/` | Todo el panel de administración |
| `RutaAprendizaje/` | Módulo de aprendizaje |

---

### 2.5 `src/pages/admin/` - Panel de Administración

**Propósito:** Componente y submódulos para el panel de admin.

**Estructura:**

```
admin/
├── index.jsx              # Componente principal (orquestador)
├── components/            # Componentes del admin
│   ├── Estadisticas.jsx  # Tarjetas de estadísticas
│   ├── TablaUsuarios.jsx # Tabla con usuarios
│   ├── ModalDetalle.jsx  # Modal para ver detalles
│   ├── ModalEditar.jsx   # Modal para editar usuario
│   └── UsuarioBadge.jsx  # Badges de tipo y discapacidad
├── hooks/                 # Hooks específicos
│   └── useAdmin.js       # Lógica de negocio del admin
└── utils/                 # Utilidades
    └── dateUtils.js       # Funciones para formatear fechas
```

**Componente principal (index.jsx):**

```javascript
// Orchestrator que une todos los componentes
import { useState, useEffect } from 'react';
import { useAdmin } from './hooks/useAdmin';
import Estadisticas from './components/Estadisticas';
import TablaUsuarios from './components/TablaUsuarios';
import ModalDetalle from './components/ModalDetalle';
import ModalEditar from './components/ModalEditar';

function Admin() {
    const { usuarios, estadisticas, cargando, error, ...metodos } = useAdmin();
    // Renderiza componentes hijos
}
```

**Hook useAdmin (lógica de negocio):**

```javascript
// hooks/useAdmin.js
import { useState, useCallback } from 'react';
import { obtenerUsuarios, obtenerEstadisticas, eliminarUsuario, ... } from '../../api/admin';

export function useAdmin() {
    const [usuarios, setUsuarios] = useState([]);
    const [estadisticas, setEstadisticas] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const cargarDatos = useCallback(async () => {
        const [usuariosData, statsData] = await Promise.all([
            obtenerUsuarios(),
            obtenerEstadisticas(),
        ]);
        setUsuarios(usuariosData);
        setEstadisticas(statsData);
    }, []);

    const eliminar = useCallback(async (usuarioId, nombre) => {
        if (!confirm(`¿Eliminar a "${nombre}"?`)) return { success: false };
        await eliminarUsuario(usuarioId);
        setUsuarios(prev => prev.filter(u => u.id !== usuarioId));
        return { success: true };
    }, []);

    return { usuarios, estadisticas, cargando, error, cargarDatos, eliminar, ... };
}
```

---

### 2.6 `src/pages/RutaAprendizaje/` - Módulo de Aprendizaje

**Propósito:** Páginas para la ruta de aprendizaje de señas.

**Archivos:**

| Archivo | Descripción |
|---------|-------------|
| `RutaHome.jsx` | Muestra progreso del usuario y botón a retos |
| `Retos.jsx` | Lista de retos (1, 2, 3) con bloqueo |
| `Reto.jsx` | Lección individual con preguntas y respuestas |

**Flujo:**
1. RutaHome → Muestra progreso actual
2. Retos → Lista de retos disponibles (2 y 3 bloqueados hasta completar anteriores)
3. Reto → Cuestionario con imágenes de señas

---

### 2.7 `src/hooks/` - Hooks Globales

**Propósito:** Hooks reutilizables en toda la aplicación.

**Archivos:**

| Archivo | Descripción |
|---------|-------------|
| `usePosts.js` | Hook para obtener/manej posts |

---

### 2.8 `src/assets/` - Recursos Estáticos

**Propósito:** Imágenes, iconos y otros archivos estáticos.

**Estructura:**

| Carpeta | Descripción |
|---------|-------------|
| `images/abecedario/` | Imágenes A-Z (señas del abecedario) |
| `images/numeros/` | Imágenes 1-30 (señas de números) |
| `images/palabras/` | Palabras por categorías |
| `images/retos/` | Imágenes para los retos de aprendizaje |

---

## 3. Configuración del Proyecto

### 3.1 Variables de Entorno

El proyecto usa variables de entorno de Vite. No hay archivo `.env` explícito, pero el código referencia:

```javascript
// En api/client.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api/v1';

// En Traductor.jsx
const API_BASE_URL = import.meta.env.VITE_TRANSLATOR_API_URL || 'http://127.0.0.1:5000';
```

**Para crear un archivo `.env`:**

```env
VITE_API_URL=http://localhost:8000
VITE_API_PREFIX=/api/v1
VITE_TRANSLATOR_API_URL=http://127.0.0.1:5000
```

### 3.2 Cliente HTTP

**Archivo:** `src/api/client.js`

**Características:**
- URL base configurable con variables de entorno
- Funciones: `get`, `post`, `put`, `del`
- Manejo automático de tokens (Bearer)
- Manejo de errores HTTP

**Ejemplo de uso:**

```javascript
import { get, post, put, del } from '../api/client';

// GET autenticado
const usuarios = await get('/admin/usuarios', true);

// POST sin auth
const loginData = await post('/auth/login', { nombre_usuario, contrasena }, false);

// PUT autenticado
await put('/progreso/', { reto_actual: 2 }, true);

// DELETE autenticado
await del('/admin/usuarios/1', true);
```

### 3.3 Almacenamiento (localStorage)

**¿Dónde se guarda?**

| Clave | Descripción |
|-------|-------------|
| `token` | Token de acceso JWT |
| `nombre_usuario` | Nombre del usuario logueado |
| `tipo_usuario` | Tipo: 'normal' o 'administrador' |

**Funciones auxiliares en auth.js:**

```javascript
export function estaAutenticado() {
    const token = localStorage.getItem('token');
    return token !== null;
}

export function obtenerNombreUsuario() {
    return localStorage.getItem('nombre_usuario');
}

export function obtenerTipoUsuario() {
    return localStorage.getItem('tipo_usuario');
}

export function esAdministrador() {
    return localStorage.getItem('tipo_usuario') === 'administrador';
}
```

---

## 4. Router y Rutas

**Archivo:** `src/router.jsx`

**Estructura de rutas:**

| Ruta | Componente | Protección |
|------|------------|------------|
| `/login` | Login | Pública |
| `/registro` | Registro | Pública |
| `/` | Home | Pública |
| `/traductor` | Traductor | Pública |
| `/diccionario` | Diccionario | Requiere auth |
| `/ruta` | RutaHome | Requiere auth |
| `/ruta/retos` | Retos | Requiere auth |
| `/ruta/retos/:id` | Reto | Requiere auth |
| `/perfil` | Profile | Requiere auth |
| `/admin` | Admin | Requiere ser admin |

**Ejemplo de ruta protegida:**

```javascript
<Route
    path="/admin"
    element={
        <ProtectedRoute>
            <Admin />
        </ProtectedRoute>
    }
/>
```

---

## 5. Servicios de API

### 5.1 Auth (api/auth.js)

| Función | Endpoint | Auth | Descripción |
|---------|----------|------|-------------|
| `iniciarSesion()` | POST /auth/login | ❌ | Login de usuario |
| `registrarUsuario()` | POST /auth/registro | ❌ | Registro nuevo |
| `obtenerPerfil()` | GET /auth/perfil | ✅ | Datos del usuario |
| `cerrarSesion()` | - | ❌ | Limpia localStorage |
| `estaAutenticado()` | - | ❌ | Verifica token |
| `esAdministrador()` | - | ❌ | Verifica rol admin |

### 5.2 Progreso (api/progreso.js)

| Función | Endpoint | Auth | Descripción |
|---------|----------|------|-------------|
| `crearProgreso()` | POST /progreso/ | ✅ | Crea progreso inicial |
| `obtenerProgreso()` | GET /progreso/ | ✅ | Obtiene progreso |
| `actualizarProgreso()` | PUT /progreso/ | ✅ | Actualiza progreso |
| `marcarLeccionCompletada()` | POST /progreso/completar-leccion | ✅ | Marca lección |
| `estaLeccionCompletada()` | - | ❌ | Verifica si completó |

### 5.3 Logros (api/logros.js)

| Función | Endpoint | Auth | Descripción |
|---------|----------|------|-------------|
| `obtenerLogros()` | GET /logros/ | ✅ | Lista logros usuario |
| `crearLogro()` | POST /logros/ | ✅ | Crea nuevo logro |
| `NOMBRES_LOGROS` | - | ❌ | Constantes de logros |
| `tieneLogro()` | - | ❌ | Verifica logro |

### 5.4 Admin (api/admin.js)

| Función | Endpoint | Auth | Descripción |
|---------|----------|------|-------------|
| `obtenerUsuarios()` | GET /admin/usuarios | ✅ | Lista usuarios |
| `obtenerUsuarioPorId()` | GET /admin/usuarios/{id} | ✅ | Un usuario |
| `obtenerProgresoUsuario()` | GET /admin/usuarios/{id}/progreso | ✅ | Progreso de usuario |
| `obtenerLogrosUsuario()` | GET /admin/usuarios/{id}/logros | ✅ | Logros de usuario |
| `obtenerEstadisticas()` | GET /admin/estadisticas | ✅ | Estadísticas |
| `eliminarUsuario()` | DELETE /admin/usuarios/{id} | ✅ | Elimina usuario |
| `cambiarTipoUsuario()` | PUT /admin/usuarios/{id}/tipo | ✅ | Cambia rol |
| `actualizarUsuario()` | PUT /admin/usuarios/{id} | ✅ | Edita usuario |

---

## 6. Manejo de Estado

### 6.1 Estado Local (useState)

La mayoría de las páginas usan `useState` para manejar:

- Formularios (login, registro)
- Datos de API (usuarios, progreso, logros)
- UI (modales, menús, cargas)

### 6.2 Estado con localStorage

**Persistido en localStorage:**

- Token de sesión
- Nombre de usuario
- Tipo de usuario

**No persistido (se carga de API):**

- Progreso del usuario
- Logros obtenidos
- Datos de otros usuarios (admin)

### 6.3 Custom Hooks

**useAdmin:** Encapsula toda la lógica del panel de admin.

```javascript
const { 
    usuarios, 
    estadisticas, 
    cargando, 
    error,
    cargarDatos,
    verDetalleUsuario,
    eliminar,
    cambiarTipo,
    actualizar 
} = useAdmin();
```

---

## 7. Estilos (TailwindCSS)

### 7.1 Configuración

- **Tailwind:** `tailwind.config.js`
- **PostCSS:** `postcss.config.js`
- **Estilos globales:** `src/style.css`

### 7.2 Clases Usadas

| Clase | Uso |
|-------|-----|
| `grid`, `grid-cols-4`, `md:grid-cols-8` | Grids responsivos |
| `flex`, `flex-col` | Layouts |
| `px-4`, `py-2`, `md:px-8` | Padding responsivo |
| `bg-primary`, `text-primary` | Colores del tema |
| `hover:bg-*`, `transition` | Interacciones |
| `rounded-lg`, `shadow-lg` | Bordes y sombras |
| `hidden md:block` | Visibility responsiva |

---

## 8. Diferencias: React Vite vs React Native

### 8.1 Entorno

| Aspecto | React Vite (Web) | React Native (Móvil) |
|---------|------------------|----------------------|
| Plataforma | Navegador | iOS/Android |
| Componentes | `<div>`, `<button>` | `<View>`, `<TouchableOpacity>` |
| Estilos | CSS/Tailwind | StyleSheet |
| Routing | react-router-dom | @react-navigation |
| Storage | localStorage | AsyncStorage |

### 8.2 Lo que cambia en tu código

| Lo que usas | En React Native sería |
|--------------|----------------------|
| `localStorage` | `AsyncStorage` |
| `fetch` | `fetch` (igual) |
| `useState`, `useEffect` | `useState`, `useEffect` (igual) |
| `<Link>` | `navigation.navigate()` |
| TailwindCSS | StyleSheet.create() |

### 8.3 Lo que NO cambia

- Estructura de carpetas (similar)
- Componentes funcionales
- Hooks personalizados
- Lógica de negocio
- Patrones de API (mismo backend)

---

## 9. Checklist de Mejoras Opcionales

### Alta Prioridad

- [x] Cliente API centralizado
- [x] Servicios por módulo
- [x] Router con protección
- [x] Layout con Header/Footer

### Media Prioridad

- [ ] Context API para auth (reemplazar localStorage directo)
- [ ] Hooks globales (useAuth, useFetch)
- [ ] Manejo de errores centralizado
- [ ] Validaciones de formularios

### Baja Prioridad

- [ ] Theme context (modo oscuro)
- [ ] Componentes UI reutilizables
- [ ] Lazy loading
- [ ] Optimización (memo, useMemo)

---

## Resumen

Tu frontend tiene una **estructura funcional y bien organizada**:

- ✅ Cliente API centralizado
- ✅ Servicios bien separados por módulo
- ✅ Router con rutas protegidas
- ✅ Componentes separados (layout, pages, admin)
- ✅ Hook personalizado para admin (useAdmin)
- ✅ Estilos con TailwindCSS responsivos
- ✅ Imágenes organizadas por categorías

**Nivel de madurez:** 4/5 ⭐

Las mejoras sugeridas son opcionales y dependerán del crecimiento del proyecto.
