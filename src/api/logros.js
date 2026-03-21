/**
 * ============================================
 * Servicio de Logros - SeñaGo Frontend
 * ============================================
 * Maneja los logros del usuario en la Ruta de Aprendizaje
 */

import { get, post } from './client';

/**
 * Obtener todos los logros del usuario actual
 * Endpoint: GET /api/v1/logros/
 * @returns {Object} - Lista de logros y total
 */
export async function obtenerLogros() {
    return await get('/logros/', true);
}

/**
 * Crear un nuevo logro para el usuario
 * Endpoint: POST /api/v1/logros/
 * @param {string} nombre_logro - Nombre del logro
 * @param {string} descripcion - Descripción del logro
 * @returns {Object} - Datos del logro creado
 */
export async function crearLogro(nombre_logro, descripcion = null) {
    return await post('/logros/', {
        usuario_id: 0, // El backend lo obtiene del token
        nombre_logro,
        descripcion,
    }, true);
}

/**
 * Constantes con los nombres de logros predefinidos
 */
export const NOMBRES_LOGROS = {
    // Logros por lección individual
    LECCION_1_1: 'leccion_1_1',
    LECCION_1_2: 'leccion_1_2',
    LECCION_1_3: 'leccion_1_3',
    LECCION_2_1: 'leccion_2_1',
    LECCION_2_2: 'leccion_2_2',
    LECCION_2_3: 'leccion_2_3',
    LECCION_3_1: 'leccion_3_1',
    LECCION_3_2: 'leccion_3_2',
    LECCION_3_3: 'leccion_3_3',
    // Logros por retos completados
    RETO_1_COMPLETADO: 'reto_1_completado',
    RETO_2_COMPLETADO: 'reto_2_completado',
    RETO_3_COMPLETADO: 'reto_3_completado',
    // Logros especiales
    PRIMERA_LECCION: 'primera_leccion',
    PRIMER_RETO: 'primer_reto',
};

/**
 * Descripciones predefinidas para los logros
 */
export const DESCRIPCIONES_LOGROS = {
    // Lecciones Reto 1
    [NOMBRES_LOGROS.LECCION_1_1]: 'Completaste la lección 1 del Reto 1',
    [NOMBRES_LOGROS.LECCION_1_2]: 'Completaste la lección 2 del Reto 1',
    [NOMBRES_LOGROS.LECCION_1_3]: 'Completaste la lección 3 del Reto 1',
    // Lecciones Reto 2
    [NOMBRES_LOGROS.LECCION_2_1]: 'Completaste la lección 1 del Reto 2',
    [NOMBRES_LOGROS.LECCION_2_2]: 'Completaste la lección 2 del Reto 2',
    [NOMBRES_LOGROS.LECCION_2_3]: 'Completaste la lección 3 del Reto 2',
    // Lecciones Reto 3
    [NOMBRES_LOGROS.LECCION_3_1]: 'Completaste la lección 1 del Reto 3',
    [NOMBRES_LOGROS.LECCION_3_2]: 'Completaste la lección 2 del Reto 3',
    [NOMBRES_LOGROS.LECCION_3_3]: 'Completaste la lección 3 del Reto 3',
    // Retos completados
    [NOMBRES_LOGROS.RETO_1_COMPLETADO]: '¡Felicidades! Has completado el Reto 1',
    [NOMBRES_LOGROS.RETO_2_COMPLETADO]: '¡Felicidades! Has completado el Reto 2',
    [NOMBRES_LOGROS.RETO_3_COMPLETADO]: '¡Felicidades! Has completado el Reto 3',
    // Logros especiales
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
