// ============================================
// Servicio de Autenticación - SeñaGo Frontend
// Conecta con el Backend de FastAPI
// ============================================

// URL base del backend (FastAPI)
const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Función auxiliar para obtener los headers con el token de autenticación
 * @returns {Object} - Headers con el token si existe
 */
function obtenerHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    };

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

/**
 * Iniciar sesión de usuario
 * Endpoint: POST /api/v1/auth/login
 * @param {string} nombre_usuario - Nombre de usuario
 * @param {string} contrasena - Contraseña del usuario
 * @returns {Object} - Token de acceso y datos del usuario
 */
export async function iniciarSesion(nombre_usuario, contrasena) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario,
                contrasena,
            }),
        });

        // Si la respuesta no es exitosa, lanzar error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al iniciar sesión');
        }

        const data = await response.json();

        // Guardar el token en localStorage
        localStorage.setItem('token', data.token_acceso);

        // También guardamos el nombre de usuario para mostrarlo
        localStorage.setItem('nombre_usuario', nombre_usuario);

        // Guardamos el tipo de usuario si viene en la respuesta
        if (data.tipo_usuario) {
            localStorage.setItem('tipo_usuario', data.tipo_usuario);
        }

        return data;
    } catch (error) {
        console.error('Error en iniciarSesion:', error);
        throw error;
    }
}

/**
 * Registrar un nuevo usuario
 * Endpoint: POST /api/v1/auth/registro
 * @param {string} nombre_usuario - Nombre de usuario (mínimo 3 caracteres)
 * @param {string} contrasena - Contraseña (mínimo 4 caracteres)
 * @param {string} discapacidad - Tipo de discapacidad: "ninguna", "persona_sorda", "otra"
 * @returns {Object} - Datos del usuario creado
 */
export async function registrarUsuario(nombre_usuario, contrasena, discapacidad = 'ninguna') {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario,
                contrasena,
                discapacidad,
            }),
        });

        // Si la respuesta no es exitosa, lanzar error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al registrar usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en registrarUsuario:', error);
        throw error;
    }
}

/**
 * Obtener el perfil del usuario actual
 * Endpoint: GET /api/v1/auth/perfil
 * Requiere token de autenticación
 * @returns {Object} - Datos del usuario actual
 */
export async function obtenerPerfil() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
            method: 'GET',
            headers: obtenerHeaders(),
        });

        // Si la respuesta no es exitosa, lanzar error
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al obtener perfil');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerPerfil:', error);
        throw error;
    }
}

/**
 * Cerrar sesión del usuario
 * Elimina el token del localStorage
 */
export function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('tipo_usuario');
}

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean} - True si hay un token válido
 */
export function estaAutenticado() {
    const token = localStorage.getItem('token');
    return token !== null;
}

/**
 * Obtener el nombre de usuario actual
 * @returns {string|null} - Nombre de usuario o null
 */
export function obtenerNombreUsuario() {
    return localStorage.getItem('nombre_usuario');
}

/**
 * Obtener el tipo de usuario actual
 * @returns {string|null} - Tipo de usuario ('normal' o 'administrador') o null
 */
export function obtenerTipoUsuario() {
    return localStorage.getItem('tipo_usuario');
}

/**
 * Verificar si el usuario es administrador
 * @returns {boolean} - True si es administrador
 */
export function esAdministrador() {
    return localStorage.getItem('tipo_usuario') === 'administrador';
}
