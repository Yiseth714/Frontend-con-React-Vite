/**
 * ============================================
 * Servicio de Autenticación - SeñaGo Frontend
 * ============================================
 * Conecta con el Backend de FastAPI
 */

import { get, post } from './client';

/**
 * Iniciar sesión de usuario
 * Endpoint: POST /api/v1/auth/login
 * @param {string} nombre_usuario - Nombre de usuario
 * @param {string} contrasena - Contraseña del usuario
 * @returns {Object} - Token de acceso y datos del usuario
 */
export async function iniciarSesion(nombre_usuario, contrasena) {
    const data = await post('/auth/login', { nombre_usuario, contrasena }, false);
    
    // Guardar token y datos en localStorage
    localStorage.setItem('token', data.token_acceso);
    localStorage.setItem('nombre_usuario', nombre_usuario);
    if (data.tipo_usuario) {
        localStorage.setItem('tipo_usuario', data.tipo_usuario);
    }
    
    return data;
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
    return await post('/auth/registro', { 
        nombre_usuario, 
        contrasena, 
        discapacidad 
    }, false);
}

/**
 * Obtener el perfil del usuario actual
 * Endpoint: GET /api/v1/auth/perfil
 * Requiere token de autenticación
 * @returns {Object} - Datos del usuario actual
 */
export async function obtenerPerfil() {
    return await get('/auth/perfil', true);
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
