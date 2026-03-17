// ============================================
// Servicio de Logros - SeñaGo Frontend
// Maneja los logros del usuario en la Ruta de Aprendizaje
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
 * Obtener todos los logros del usuario actual
 * Endpoint: GET /api/v1/logros/
 * @returns {Object} - Lista de logros y total
 */
export async function obtenerLogros() {
    try {
        const response = await fetch(`${API_BASE_URL}/logros/`, {
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
        console.error('Error en obtenerLogros:', error);
        throw error;
    }
}

/**
 * Crear un nuevo logro para el usuario
 * Endpoint: POST /api/v1/logros/
 * @param {string} nombre_logro - Nombre del logro
 * @param {string} descripcion - Descripción del logro
 * @returns {Object} - Datos del logro creado
 */
export async function crearLogro(nombre_logro, descripcion = null) {
    try {
        const response = await fetch(`${API_BASE_URL}/logros/`, {
            method: 'POST',
            headers: obtenerHeaders(),
            body: JSON.stringify({
                usuario_id: 0, // El backend lo obtiene del token
                nombre_logro,
                descripcion,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al crear logro');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en crearLogro:', error);
        throw error;
    }
}

/**
 * Constantes con los nombres de logros predefinidos
 */
export const NOMBRES_LOGROS = {
    RETO_1_COMPLETADO: 'reto_1_completado',
    RETO_2_COMPLETADO: 'reto_2_completado',
    RETO_3_COMPLETADO: 'reto_3_completado',
    PRIMERA_LECCION: 'primera_leccion',
    PRIMER_RETO: 'primer_reto',
};

/**
 * Descripciones predefinidas para los logros
 */
export const DESCRIPCIONES_LOGROS = {
    [NOMBRES_LOGROS.RETO_1_COMPLETADO]: '¡Felicidades! Has completado el Reto 1',
    [NOMBRES_LOGROS.RETO_2_COMPLETADO]: '¡Felicidades! Has completado el Reto 2',
    [NOMBRES_LOGROS.RETO_3_COMPLETADO]: '¡Felicidades! Has completado el Reto 3',
    [NOMBRES_LOGROS.PRIMERA_LECCION]: 'Has completado tu primera lección',
    [NOMBRES_LOGROS.PRIMER_RETO]: 'Has comenzado tu primer reto',
};

/**
 * Verificar si el usuario tiene un logro específico
 * @param {Array} logros - Lista de logros del usuario
 * @param {string} nombre_logro - Nombre del logro a verificar
 * @returns {boolean} - True si el usuario tiene el logro
 */
export function tieneLogro(logros, nombre_logro) {
    if (!logros || !Array.isArray(logros)) {
        return false;
    }

    return logros.some(logro => logro.nombre_logro === nombre_logro);
}

/**
 * Obtener el total de logros del usuario
 * @param {Array} logros - Lista de logros del usuario
 * @returns {number} - Total de logros
 */
export function obtenerTotalLogros(logros) {
    if (!logros || !Array.isArray(logros)) {
        return 0;
    }

    return logros.length;
}
