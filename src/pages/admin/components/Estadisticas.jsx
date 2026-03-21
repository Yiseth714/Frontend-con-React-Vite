/**
 * ============================================
 * Componente: Estadisticas
 * ============================================
 * Muestra las tarjetas de estadísticas del panel admin
 */

const TARJETAS_ESTADISTICAS = [
    {
        key: 'total',
        label: 'Total Usuarios',
        emoji: '👥',
        gradient: 'from-primary to-blue-600',
    },
    {
        key: 'ninguna',
        label: 'Sin Discapacidad',
        emoji: '✅',
        gradient: 'from-green-500 to-green-600',
    },
    {
        key: 'sordos',
        label: 'Personas Sordas',
        emoji: '👂',
        gradient: 'from-purple-500 to-purple-600',
    },
    {
        key: 'otra',
        label: 'Otra Discapacidad',
        emoji: '🌈',
        gradient: 'from-orange-500 to-orange-600',
    },
];

/**
 * Componente de tarjetas de estadísticas
 * @param {Object} stats - Objeto con las estadísticas
 */
export function Estadisticas({ stats }) {
    if (!stats) return null;

    // Mapeo de claves
    const valores = {
        total: stats.total_usuarios,
        ninguna: stats.usuarios_ninguna_discapacidad,
        sordos: stats.usuarios_sordos,
        otra: stats.usuarios_otra_discapacidad,
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {TARJETAS_ESTADISTICAS.map(({ key, label, emoji, gradient }) => (
                <div
                    key={key}
                    className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-transform`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-4xl font-bold">{valores[key] || 0}</p>
                            <p className="text-sm opacity-90 mt-1">{label}</p>
                        </div>
                        <span className="text-5xl opacity-50">{emoji}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Estadisticas;
