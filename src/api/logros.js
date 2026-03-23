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
    // ================= LECCIONES =================
    LECCION_1_1: 'leccion_1_1',
    LECCION_1_2: 'leccion_1_2',
    LECCION_1_3: 'leccion_1_3',

    LECCION_2_1: 'leccion_2_1',
    LECCION_2_2: 'leccion_2_2',
    LECCION_2_3: 'leccion_2_3',

    LECCION_3_1: 'leccion_3_1',
    LECCION_3_2: 'leccion_3_2',
    LECCION_3_3: 'leccion_3_3',

    LECCION_4_1: 'leccion_4_1',
    LECCION_4_2: 'leccion_4_2',
    LECCION_4_3: 'leccion_4_3',

    LECCION_5_1: 'leccion_5_1',
    LECCION_5_2: 'leccion_5_2',
    LECCION_5_3: 'leccion_5_3',

    LECCION_6_1: 'leccion_6_1',
    LECCION_6_2: 'leccion_6_2',
    LECCION_6_3: 'leccion_6_3',

    LECCION_7_1: 'leccion_7_1',
    LECCION_7_2: 'leccion_7_2',
    LECCION_7_3: 'leccion_7_3',

    LECCION_8_1: 'leccion_8_1',
    LECCION_8_2: 'leccion_8_2',
    LECCION_8_3: 'leccion_8_3',

    LECCION_9_1: 'leccion_9_1',
    LECCION_9_2: 'leccion_9_2',
    LECCION_9_3: 'leccion_9_3',

    LECCION_10_1: 'leccion_10_1',
    LECCION_10_2: 'leccion_10_2',
    LECCION_10_3: 'leccion_10_3',

    // ================= RETOS =================
    RETO_1_COMPLETADO: 'reto_1_completado',
    RETO_2_COMPLETADO: 'reto_2_completado',
    RETO_3_COMPLETADO: 'reto_3_completado',
    RETO_4_COMPLETADO: 'reto_4_completado',
    RETO_5_COMPLETADO: 'reto_5_completado',
    RETO_6_COMPLETADO: 'reto_6_completado',
    RETO_7_COMPLETADO: 'reto_7_completado',
    RETO_8_COMPLETADO: 'reto_8_completado',
    RETO_9_COMPLETADO: 'reto_9_completado',
    RETO_10_COMPLETADO: 'reto_10_completado',

    // ================= ESPECIALES =================
    PRIMERA_LECCION: 'primera_leccion',
    PRIMER_RETO: 'primer_reto',
};

/**
 * Descripciones predefinidas para los logros
 */
export const DESCRIPCIONES_LOGROS = {
    // ===== LECCIONES =====

    // Reto 1
    [NOMBRES_LOGROS.LECCION_1_1]: 'Completaste la lección 1 del Reto 1',
    [NOMBRES_LOGROS.LECCION_1_2]: 'Completaste la lección 2 del Reto 1',
    [NOMBRES_LOGROS.LECCION_1_3]: 'Completaste la lección 3 del Reto 1',

    // Reto 2
    [NOMBRES_LOGROS.LECCION_2_1]: 'Completaste la lección 1 del Reto 2',
    [NOMBRES_LOGROS.LECCION_2_2]: 'Completaste la lección 2 del Reto 2',
    [NOMBRES_LOGROS.LECCION_2_3]: 'Completaste la lección 3 del Reto 2',

    // Reto 3
    [NOMBRES_LOGROS.LECCION_3_1]: 'Completaste la lección 1 del Reto 3',
    [NOMBRES_LOGROS.LECCION_3_2]: 'Completaste la lección 2 del Reto 3',
    [NOMBRES_LOGROS.LECCION_3_3]: 'Completaste la lección 3 del Reto 3',

    // Reto 4
    [NOMBRES_LOGROS.LECCION_4_1]: 'Completaste la lección 1 del Reto 4',
    [NOMBRES_LOGROS.LECCION_4_2]: 'Completaste la lección 2 del Reto 4',
    [NOMBRES_LOGROS.LECCION_4_3]: 'Completaste la lección 3 del Reto 4',

    // Reto 5
    [NOMBRES_LOGROS.LECCION_5_1]: 'Completaste la lección 1 del Reto 5',
    [NOMBRES_LOGROS.LECCION_5_2]: 'Completaste la lección 2 del Reto 5',
    [NOMBRES_LOGROS.LECCION_5_3]: 'Completaste la lección 3 del Reto 5',

    // Reto 6
    [NOMBRES_LOGROS.LECCION_6_1]: 'Completaste la lección 1 del Reto 6',
    [NOMBRES_LOGROS.LECCION_6_2]: 'Completaste la lección 2 del Reto 6',
    [NOMBRES_LOGROS.LECCION_6_3]: 'Completaste la lección 3 del Reto 6',

    // Reto 7
    [NOMBRES_LOGROS.LECCION_7_1]: 'Completaste la lección 1 del Reto 7',
    [NOMBRES_LOGROS.LECCION_7_2]: 'Completaste la lección 2 del Reto 7',
    [NOMBRES_LOGROS.LECCION_7_3]: 'Completaste la lección 3 del Reto 7',

    // Reto 8
    [NOMBRES_LOGROS.LECCION_8_1]: 'Completaste la lección 1 del Reto 8',
    [NOMBRES_LOGROS.LECCION_8_2]: 'Completaste la lección 2 del Reto 8',
    [NOMBRES_LOGROS.LECCION_8_3]: 'Completaste la lección 3 del Reto 8',

    // Reto 9
    [NOMBRES_LOGROS.LECCION_9_1]: 'Completaste la lección 1 del Reto 9',
    [NOMBRES_LOGROS.LECCION_9_2]: 'Completaste la lección 2 del Reto 9',
    [NOMBRES_LOGROS.LECCION_9_3]: 'Completaste la lección 3 del Reto 9',

    // Reto 10
    [NOMBRES_LOGROS.LECCION_10_1]: 'Completaste la lección 1 del Reto 10',
    [NOMBRES_LOGROS.LECCION_10_2]: 'Completaste la lección 2 del Reto 10',
    [NOMBRES_LOGROS.LECCION_10_3]: 'Completaste la lección 3 del Reto 10',

    // ===== RETOS =====
    [NOMBRES_LOGROS.RETO_1_COMPLETADO]: '¡Felicidades! Has completado el Reto 1',
    [NOMBRES_LOGROS.RETO_2_COMPLETADO]: '¡Felicidades! Has completado el Reto 2',
    [NOMBRES_LOGROS.RETO_3_COMPLETADO]: '¡Felicidades! Has completado el Reto 3',
    [NOMBRES_LOGROS.RETO_4_COMPLETADO]: '¡Felicidades! Has completado el Reto 4',
    [NOMBRES_LOGROS.RETO_5_COMPLETADO]: '¡Felicidades! Has completado el Reto 5',
    [NOMBRES_LOGROS.RETO_6_COMPLETADO]: '¡Felicidades! Has completado el Reto 6',
    [NOMBRES_LOGROS.RETO_7_COMPLETADO]: '¡Felicidades! Has completado el Reto 7',
    [NOMBRES_LOGROS.RETO_8_COMPLETADO]: '¡Felicidades! Has completado el Reto 8',
    [NOMBRES_LOGROS.RETO_9_COMPLETADO]: '¡Felicidades! Has completado el Reto 9',
    [NOMBRES_LOGROS.RETO_10_COMPLETADO]: '¡Felicidades! Has completado el Reto 10',

    // ===== ESPECIALES =====
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
