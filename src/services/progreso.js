// ============================================
// Servicio de Progreso - SeñaGo Frontend
// Maneja el progreso del usuario en la Ruta de Aprendizaje
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
 * Crear el progreso inicial del usuario
 * Endpoint: POST /api/v1/progreso/
 * @param {number} reto_actual - Número del reto actual (1-3)
 * @param {number} leccion_actual - Número de la lección actual (1-3)
 * @param {string} lecciones_completadas - Lista de lecciones separadas por coma (ej: "1-1,1-2")
 * @returns {Object} - Datos del progreso creado
 */
export async function crearProgreso(reto_actual = 1, leccion_actual = 1, lecciones_completadas = '') {
    try {
        const response = await fetch(`${API_BASE_URL}/progreso/`, {
            method: 'POST',
            headers: obtenerHeaders(),
            body: JSON.stringify({
                usuario_id: 0, // El backend lo obtiene del token
                reto_actual,
                leccion_actual,
                lecciones_completadas,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al crear progreso');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en crearProgreso:', error);
        throw error;
    }
}

/**
 * Obtener el progreso del usuario actual
 * Endpoint: GET /api/v1/progreso/
 * @returns {Object} - Datos del progreso del usuario
 */
export async function obtenerProgreso() {
    try {
        const response = await fetch(`${API_BASE_URL}/progreso/`, {
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
        console.error('Error en obtenerProgreso:', error);
        throw error;
    }
}

/**
 * Actualizar el progreso del usuario
 * Endpoint: PUT /api/v1/progreso/
 * @param {number} reto_actual - Nuevo reto actual (opcional)
 * @param {number} leccion_actual - Nueva lección actual (opcional)
 * @param {string} lecciones_completadas - Lista de lecciones completadas (opcional)
 * @returns {Object} - Datos del progreso actualizado
 */
export async function actualizarProgreso(reto_actual = null, leccion_actual = null, lecciones_completadas = null) {
    try {
        const body = {};

        if (reto_actual !== null) body.reto_actual = reto_actual;
        if (leccion_actual !== null) body.leccion_actual = leccion_actual;
        if (lecciones_completadas !== null) body.lecciones_completadas = lecciones_completadas;

        const response = await fetch(`${API_BASE_URL}/progreso/`, {
            method: 'PUT',
            headers: obtenerHeaders(),
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al actualizar progreso');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en actualizarProgreso:', error);
        throw error;
    }
}

/**
 * Marcar una lección como completada
 * Endpoint: POST /api/v1/progreso/completar-leccion
 * @param {number} reto_numero - Número del reto (1-3)
 * @param {number} leccion_numero - Número de la lección (1-3)
 * @returns {Object} - Datos del progreso actualizado
 */
export async function marcarLeccionCompletada(reto_numero, leccion_numero) {
    try {
        const response = await fetch(`${API_BASE_URL}/progreso/completar-leccion`, {
            method: 'POST',
            headers: obtenerHeaders(),
            body: JSON.stringify({
                reto_numero,
                leccion_numero,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al marcar lección completada');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en marcarLeccionCompletada:', error);
        throw error;
    }
}

/**
 * Verificar si una lección específica está completada
 * @param {Object} progreso - Objeto de progreso del usuario
 * @param {number} reto_numero - Número del reto (1-3)
 * @param {number} leccion_numero - Número de la lección (1-3)
 * @returns {boolean} - True si la lección está completada
 */
export function estaLeccionCompletada(progreso, reto_numero, leccion_numero) {
    if (!progreso || !progreso.lecciones_completadas) {
        return false;
    }

    const leccion_key = `${reto_numero}-${leccion_numero}`;
    const lecciones = progreso.lecciones_completadas.split(',');

    return lecciones.includes(leccion_key);
}
