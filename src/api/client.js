/**
 * ============================================
 * Cliente API Centralizado - SeñaGo Frontend
 * ============================================
 * Utiliza fetch para comunicarse con el backend
 * Maneja automáticamente tokens y errores
 */

// URL base del backend desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api/v1';
const BASE_URL = `${API_BASE_URL}${API_PREFIX}`;

/**
 * Obtiene los headers base para las peticiones
 * @returns {Object} - Headers con content-type
 */
function getHeaders() {
    return {
        'Content-Type': 'application/json',
    };
}

/**
 * Obtiene los headers con el token de autenticación
 * @returns {Object} - Headers con token si existe
 */
function getAuthHeaders() {
    const headers = getHeaders();
    const token = localStorage.getItem('token');
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
}

/**
 * Maneja errores de respuesta HTTP
 * @param {Response} response - Objeto response de fetch
 * @returns {Promise} - Response si es OK, lanza error si no
 */
async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Realiza una petición GET
 * @param {string} endpoint - Endpoint de la API
 * @param {boolean} authenticated - Si requiere autenticación
 * @returns {Promise} - Datos de la respuesta
 */
export async function get(endpoint, authenticated = false) {
    const headers = authenticated ? getAuthHeaders() : getHeaders();
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
    });
    
    return handleResponse(response);
}

/**
 * Realiza una petición POST
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a enviar
 * @param {boolean} authenticated - Si requiere autenticación
 * @returns {Promise} - Datos de la respuesta
 */
export async function post(endpoint, data = {}, authenticated = false) {
    const headers = authenticated ? getAuthHeaders() : getHeaders();
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    
    return handleResponse(response);
}

/**
 * Realiza una petición PUT
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a enviar
 * @param {boolean} authenticated - Si requiere autenticación
 * @returns {Promise} - Datos de la respuesta
 */
export async function put(endpoint, data = {}, authenticated = false) {
    const headers = authenticated ? getAuthHeaders() : getHeaders();
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    });
    
    return handleResponse(response);
}

/**
 * Realiza una petición DELETE
 * @param {string} endpoint - Endpoint de la API
 * @param {boolean} authenticated - Si requiere autenticación
 * @returns {Promise} - Datos de la respuesta
 */
export async function del(endpoint, authenticated = false) {
    const headers = authenticated ? getAuthHeaders() : getHeaders();
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers,
    });
    
    if (response.status === 204) {
        return true;
    }
    
    return handleResponse(response);
}

// Exportar URL base para uso externo
export { BASE_URL, API_BASE_URL, API_PREFIX };
