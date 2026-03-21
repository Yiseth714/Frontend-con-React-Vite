/**
 * ============================================
 * Componente: UsuarioBadge
 * ============================================
 * Badge reutilizable para mostrar tipo y discapacidad de usuario
 */

const TIPOS_DISCPACIDAD = {
    persona_sorda: { icono: '👂', clase: 'bg-blue-100 text-blue-700' },
    otra: { icono: '🌈', clase: 'bg-orange-100 text-orange-700' },
    ninguna: { icono: '✅', clase: 'bg-green-100 text-green-700' },
};

const TIPOS_USUARIO = {
    administrador: { icono: '👑', clase: 'from-purple-100 to-purple-200 text-purple-700' },
    normal: { icono: '👤', clase: 'from-gray-100 to-gray-200 text-gray-700' },
};

/**
 * Badge para el tipo de usuario
 * @param {string} tipo - 'administrador' o 'normal'
 */
export function TipoUsuarioBadge({ tipo }) {
    const config = TIPOS_USUARIO[tipo] || TIPOS_USUARIO.normal;
    
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${config.clase}`}>
            {config.icono} {tipo}
        </span>
    );
}

/**
 * Badge para la discapacidad
 * @param {string} discapacidad - Tipo de discapacidad
 */
export function DiscapacidadBadge({ discapacidad }) {
    const config = TIPOS_DISCPACIDAD[discapacidad] || TIPOS_DISCPACIDAD.ninguna;
    
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.clase}`}>
            {config.icono} {discapacidad || 'ninguna'}
        </span>
    );
}

export default { TipoUsuarioBadge, DiscapacidadBadge };
