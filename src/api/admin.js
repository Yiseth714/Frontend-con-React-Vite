/**
 * ============================================
 * Servicio de Admin - SeñaGo Frontend
 * ============================================
 * Maneja las funcionalidades del panel de administrador
 */

import { get, put, del } from './client';

/**
 * Obtener todos los usuarios
 * Endpoint: GET /api/v1/admin/usuarios
 * @returns {Array} - Lista de usuarios
 */
export async function obtenerUsuarios() {
    return await get('/admin/usuarios', true);
}

/**
 * Obtener un usuario por ID
 * Endpoint: GET /api/v1/admin/usuarios/{id}
 * @param {number} usuarioId - ID del usuario
 * @returns {Object} - Datos del usuario
 */
export async function obtenerUsuarioPorId(usuarioId) {
    return await get(`/admin/usuarios/${usuarioId}`, true);
}

/**
 * Obtener el progreso de un usuario
 * Endpoint: GET /api/v1/admin/usuarios/{id}/progreso
 * @param {number} usuarioId - ID del usuario
 * @returns {Object} - Progreso del usuario
 */
export async function obtenerProgresoUsuario(usuarioId) {
    return await get(`/admin/usuarios/${usuarioId}/progreso`, true);
}

/**
 * Obtener los logros de un usuario
 * Endpoint: GET /api/v1/admin/usuarios/{id}/logros
 * @param {number} usuarioId - ID del usuario
 * @returns {Array} - Lista de logros
 */
export async function obtenerLogrosUsuario(usuarioId) {
    return await get(`/admin/usuarios/${usuarioId}/logros`, true);
}

/**
 * Obtener estadísticas
 * Endpoint: GET /api/v1/admin/estadisticas
 * @returns {Object} - Estadísticas
 */
export async function obtenerEstadisticas() {
    return await get('/admin/estadisticas', true);
}

/**
 * Eliminar un usuario
 * Endpoint: DELETE /api/v1/admin/usuarios/{id}
 * @param {number} usuarioId - ID del usuario a eliminar
 * @returns {boolean} - True si se eliminó correctamente
 */
export async function eliminarUsuario(usuarioId) {
    return await del(`/admin/usuarios/${usuarioId}`, true);
}

/**
 * Cambiar tipo de usuario
 * Endpoint: PUT /api/v1/admin/usuarios/{id}/tipo?nuevo_tipo=xxx
 * @param {number} usuarioId - ID del usuario
 * @param {string} nuevoTipo - 'normal' o 'administrador'
 * @returns {Object} - Resultado
 */
export async function cambiarTipoUsuario(usuarioId, nuevoTipo) {
    return await put(`/admin/usuarios/${usuarioId}/tipo?nuevo_tipo=${nuevoTipo}`, {}, true);
}

/**
 * Actualizar usuario
 * Endpoint: PUT /api/v1/admin/usuarios/{id}
 * @param {number} usuarioId - ID del usuario
 * @param {Object} datos - Datos a actualizar {nombre_usuario, discapacidad, nueva_contrasena}
 * @returns {Object} - Usuario actualizado
 */
export async function actualizarUsuario(usuarioId, datos) {
    return await put(`/admin/usuarios/${usuarioId}`, datos, true);
}
