/**
 * ============================================
 * Utilidades de Fecha
 * ============================================
 * Funciones helper para formatear fechas
 */

/**
 * Formatea una fecha en formato corto (ej: "15 mar 2024")
 * @param {string} fechaString - Fecha en string
 * @returns {string} - Fecha formateada
 */
export function formatDateShort(fechaString) {
    if (!fechaString) return '-';
    
    return new Date(fechaString).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Formatea una fecha en formato largo (ej: "15 de marzo de 2024")
 * @param {string} fechaString - Fecha en string
 * @returns {string} - Fecha formateada
 */
export function formatDateLong(fechaString) {
    if (!fechaString) return '-';
    
    return new Date(fechaString).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export default { formatDateShort, formatDateLong };
