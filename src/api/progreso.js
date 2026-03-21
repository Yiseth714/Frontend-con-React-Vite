/**
 * ============================================
 * Servicio de Progreso - SeñaGo Frontend
 * ============================================
 * Maneja el progreso del usuario en la Ruta de Aprendizaje
 */

import { get, post, put } from './client';

/**
 * Crear el progreso inicial del usuario
 * Endpoint: POST /api/v1/progreso/
 * @param {number} reto_actual - Número del reto actual (1-3)
 * @param {number} leccion_actual - Número de la lección actual (1-3)
 * @param {string} lecciones_completadas - Lista de lecciones separadas por coma
 * @returns {Object} - Datos del progreso creado
 */
export async function crearProgreso(reto_actual = 1, leccion_actual = 1, lecciones_completadas = '') {
    return await post('/progreso/', {
        usuario_id: 0, // El backend lo obtiene del token
        reto_actual,
        leccion_actual,
        lecciones_completadas,
    }, true);
}

/**
 * Obtener el progreso del usuario actual
 * Endpoint: GET /api/v1/progreso/
 * @returns {Object} - Datos del progreso del usuario
 */
export async function obtenerProgreso() {
    return await get('/progreso/', true);
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
    const body = {};
    
    if (reto_actual !== null) body.reto_actual = reto_actual;
    if (leccion_actual !== null) body.leccion_actual = leccion_actual;
    if (lecciones_completadas !== null) body.lecciones_completadas = lecciones_completadas;
    
    return await put('/progreso/', body, true);
}

/**
 * Marcar una lección como completada
 * Endpoint: POST /api/v1/progreso/completar-leccion
 * @param {number} reto_numero - Número del reto (1-3)
 * @param {number} leccion_numero - Número de la lección (1-3)
 * @returns {Object} - Datos del progreso actualizado
 */
export async function marcarLeccionCompletada(reto_numero, leccion_numero) {
    return await post('/progreso/completar-leccion', {
        reto_numero,
        leccion_numero,
    }, true);
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
