// ============================================
// Servicio de Admin - SeñaGo Frontend
// Maneja las funcionalidades del panel de administrador
// ============================================

// URL base del backend (FastAPI)
const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Función auxiliar para obtener los headers con el token de autenticación
 * @returns {Object} - Headers con el token
 */
function obtenerHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

/**
 * Obtener todos los usuarios
 * Endpoint: GET /api/v1/admin/usuarios
 * @returns {Array} - Lista de usuarios
 */
export async function obtenerUsuarios() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/usuarios`, {
            method: 'GET',
            headers: obtenerHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al obtener usuarios');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerUsuarios:', error);
        throw error;
    }
}

/**
 * Obtener un usuario por ID
 * Endpoint: GET /api/v1/admin/usuarios/{id}
 * @param {number} usuarioId - ID del usuario
 * @returns {Object} - Datos del usuario
 */
export async function obtenerUsuarioPorId(usuarioId) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/usuarios/${usuarioId}`, {
            method: 'GET',
            headers: obtenerHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al obtener usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerUsuarioPorId:', error);
        throw error;
    }
}

/**
 * Obtener el progreso de un usuario
 * Endpoint: GET /api/v1/admin/usuarios/{id}/progreso
 * @param {number} usuarioId - ID del usuario
 * @returns {Object} - Progreso del usuario
 */
export async function obtenerProgresoUsuario(usuarioId) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/usuarios/${usuarioId}/progreso`, {
            method: 'GET',
            headers: obtenerHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al obtener progreso');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerProgresoUsuario:', error);
        throw error;
    }
}

/**
 * Obtener los logros de un usuario
 * Endpoint: GET /api/v1/admin/usuarios/{id}/logros
 * @param {number} usuarioId - ID del usuario
 * @returns {Array} - Lista de logros
 */
export async function obtenerLogrosUsuario(usuarioId) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/usuarios/${usuarioId}/logros`, {
            method: 'GET',
            headers: obtenerHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al obtener logros');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerLogrosUsuario:', error);
        throw error;
    }
}

/**
 * Obtener estadísticas
 * Endpoint: GET /api/v1/admin/estadisticas
 * @returns {Object} - Estadísticas
 */
export async function obtenerEstadisticas() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/estadisticas`, {
            method: 'GET',
            headers: obtenerHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al obtener estadísticas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en obtenerEstadisticas:', error);
        throw error;
    }
}

/**
 * Eliminar un usuario
 * Endpoint: DELETE /api/v1/admin/usuarios/{id}
 * @param {number} usuarioId - ID del usuario a eliminar
 * @returns {void}
 */
export async function eliminarUsuario(usuarioId) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/usuarios/${usuarioId}`, {
            method: 'DELETE',
            headers: obtenerHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al eliminar usuario');
        }

        return true;
    } catch (error) {
        console.error('Error en eliminarUsuario:', error);
        throw error;
    }
}

/**
 * Cambiar tipo de usuario
 * Endpoint: PUT /api/v1/admin/usuarios/{id}/tipo?nuevo_tipo=xxx
 * @param {number} usuarioId - ID del usuario
 * @param {string} nuevoTipo - 'normal' o 'administrador'
 * @returns {Object} - Resultado
 */
export async function cambiarTipoUsuario(usuarioId, nuevoTipo) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/admin/usuarios/${usuarioId}/tipo?nuevo_tipo=${nuevoTipo}`,
            {
                method: 'PUT',
                headers: obtenerHeaders(),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al cambiar tipo de usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en cambiarTipoUsuario:', error);
        throw error;
    }
}

/**
 * Actualizar usuario
 * Endpoint: PUT /api/v1/admin/usuarios/{id}
 * @param {number} usuarioId - ID del usuario
 * @param {Object} datos - Datos a actualizar {nombre_usuario, discapacidad, nueva_contrasena}
 * @returns {Object} - Usuario actualizado
 */
export async function actualizarUsuario(usuarioId, datos) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/admin/usuarios/${usuarioId}`,
            {
                method: 'PUT',
                headers: obtenerHeaders(),
                body: JSON.stringify(datos),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al actualizar usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en actualizarUsuario:', error);
        throw error;
    }
}
