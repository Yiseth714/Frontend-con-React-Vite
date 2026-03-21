/**
 * ============================================
 * Componente: ModalDetalle
 * ============================================
 * Modal para ver los detalles de un usuario
 */

import { TipoUsuarioBadge, DiscapacidadBadge } from './UsuarioBadge';
import { formatDateLong } from '../utils/dateUtils';

/**
 * Componente modal de detalles
 * @param {Object} usuario - Usuario seleccionado
 * @param {Object} progreso - Progreso del usuario
 * @param {Array} logros - Logros del usuario
 * @param {boolean} cargando - Si está cargando
 * @param {Function} onClose - Función para cerrar
 */
export function ModalDetalle({ usuario, progreso, logros, cargando, onClose }) {
    if (!usuario) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-blue-50 flex justify-between items-center sticky top-0">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xl">
                            {usuario.nombre_usuario?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-primary">
                                {usuario.nombre_usuario}
                            </h2>
                            <p className="text-sm text-gray-500">Detalles del usuario</p>
                        </div>
                    </div>
                    <BotonCerrar onClick={onClose} />
                </div>

                <div className="p-6 space-y-6">
                    {/* Info básica */}
                    <div className="grid grid-cols-2 gap-4">
                        <CampoInfo label="ID" valor={`#${usuario.id}`} icono="🆔" />
                        <CampoInfo 
                            label="Tipo" 
                            valor={<TipoUsuarioBadge tipo={usuario.tipo_usuario} />} 
                            icono="👤" 
                        />
                        <CampoInfo 
                            label="Discapacidad" 
                            valor={<DiscapacidadBadge discapacidad={usuario.discapacidad} />} 
                            icono="🦻" 
                        />
                        <CampoInfo 
                            label="Registro" 
                            valor={formatDateLong(usuario.fecha_creacion)} 
                            icono="📅" 
                        />
                    </div>

                    {/* Progreso */}
                    <SeccionProgreso progreso={progreso} cargando={cargando} />

                    {/* Logros */}
                    <SeccionLogros logros={logros} cargando={cargando} />
                </div>
            </div>
        </div>
    );
}

/**
 * Campo de información individual
 */
function CampoInfo({ label, valor, icono }) {
    return (
        <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500 flex items-center gap-1">{icono} {label}</p>
            <div className="mt-1">{valor}</div>
        </div>
    );
}

/**
 * Sección de progreso
 */
function SeccionProgreso({ progreso, cargando }) {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                <span>🎯</span> Progreso en Retos
            </h3>
            {cargando ? (
                <Cargando />
            ) : progreso ? (
                <div className="space-y-2">
                    <FilaProgreso label="Reto actual" valor={progreso.reto_actual} />
                    <FilaProgreso label="Lección actual" valor={progreso.leccion_actual} />
                    <FilaProgreso 
                        label="Lecciones completadas" 
                        valor={progreso.lecciones_completadas || 0} 
                        color="green"
                    />
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">
                    <span className="text-4xl block mb-2">📚</span>
                    <p>Sin progreso registrado</p>
                </div>
            )}
        </div>
    );
}

/**
 * Fila de progreso
 */
function FilaProgreso({ label, valor, color = 'primary' }) {
    return (
        <div className="flex items-center justify-between bg-white p-3 rounded-lg">
            <span className="text-gray-600">{label}</span>
            <span className={`font-semibold text-${color}-600`}>{valor}</span>
        </div>
    );
}

/**
 * Sección de logros
 */
function SeccionLogros({ logros, cargando }) {
    return (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-100">
            <h3 className="font-bold text-yellow-700 mb-3 flex items-center gap-2">
                <span>🏆</span> Logros Obtenidos{' '}
                <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
                    {logros?.length || 0}
                </span>
            </h3>
            {cargando ? (
                <Cargando />
            ) : logros?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {logros.map((logro, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-2">
                                <span className="text-2xl">🎖️</span>
                                <div>
                                    <p className="font-semibold text-sm text-gray-800">{logro.nombre_logro}</p>
                                    <p className="text-xs text-gray-500 mt-1">{logro.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">
                    <span className="text-4xl block mb-2">🏅</span>
                    <p>Sin logros obtenidos</p>
                </div>
            )}
        </div>
    );
}

/**
 * Indicador de carga
 */
function Cargando() {
    return (
        <div className="flex items-center gap-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            Cargando...
        </div>
    );
}

/**
 * Botón cerrar
 */
function BotonCerrar({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );
}

export default ModalDetalle;
