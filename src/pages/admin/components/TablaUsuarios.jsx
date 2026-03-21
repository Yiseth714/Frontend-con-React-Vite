/**
 * ============================================
 * Componente: TablaUsuarios
 * ============================================
 * Tabla de usuarios con acciones
 */

import { TipoUsuarioBadge, DiscapacidadBadge } from './UsuarioBadge';
import { formatDateShort } from '../utils/dateUtils';

/**
 * Iconos de acciones
 */
const IconosAcciones = {
    ver: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ),
    editar: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
    cambiarTipo: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    eliminar: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    ),
};

/**
 * Componente de tabla de usuarios
 * @param {Array} usuarios - Lista de usuarios
 * @param {Function} onVer - Función para ver detalles
 * @param {Function} onEditar - Función para editar
 * @param {Function} onCambiarTipo - Función para cambiar tipo
 * @param {Function} onEliminar - Función para eliminar
 */
export function TablaUsuarios({ 
    usuarios = [], 
    onVer, 
    onEditar, 
    onCambiarTipo, 
    onEliminar 
}) {
    if (usuarios.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                        <span>📋</span> Usuarios Registrados
                    </h2>
                </div>
                <div className="p-8 text-center text-gray-500">
                    No hay usuarios registrados
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                            <span>📋</span> Usuarios Registrados
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Total: {usuarios.length} usuarios</p>
                    </div>
                    <div className="bg-primary/10 px-4 py-2 rounded-full">
                        <span className="text-primary font-semibold">{usuarios.length}</span>
                        <span className="text-gray-500 text-sm ml-1">usuarios</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Usuario</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Discapacidad</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Fecha Registro</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {usuarios.map((usuario, index) => (
                            <FilaUsuario
                                key={usuario.id}
                                usuario={usuario}
                                index={index}
                                onVer={onVer}
                                onEditar={onEditar}
                                onCambiarTipo={onCambiarTipo}
                                onEliminar={onEliminar}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/**
 * Fila individual de usuario
 */
function FilaUsuario({ usuario, index, onVer, onEditar, onCambiarTipo, onEliminar }) {
    return (
        <tr className={`hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
            <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-medium text-xs">
                    {usuario.id}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold">
                        {usuario.nombre_usuario?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{usuario.nombre_usuario}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <TipoUsuarioBadge tipo={usuario.tipo_usuario} />
            </td>
            <td className="px-6 py-4 text-sm">
                <DiscapacidadBadge discapacidad={usuario.discapacidad} />
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <span>📅</span>
                    {formatDateShort(usuario.fecha_creacion)}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                    <BotonAccion
                        onClick={() => onVer(usuario)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Ver detalles"
                    >
                        {IconosAcciones.ver}
                    </BotonAccion>
                    <BotonAccion
                        onClick={() => onEditar(usuario)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Editar usuario"
                    >
                        {IconosAcciones.editar}
                    </BotonAccion>
                    <BotonAccion
                        onClick={() => onCambiarTipo(usuario.id, usuario.nombre_usuario, usuario.tipo_usuario)}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                        title={usuario.tipo_usuario === 'normal' ? 'Hacer administrador' : 'Quitar administrador'}
                    >
                        {IconosAcciones.cambiarTipo}
                    </BotonAccion>
                    <BotonAccion
                        onClick={() => onEliminar(usuario.id, usuario.nombre_usuario)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Eliminar usuario"
                    >
                        {IconosAcciones.eliminar}
                    </BotonAccion>
                </div>
            </td>
        </tr>
    );
}

/**
 * Botón de acción helper
 */
function BotonAccion({ onClick, className, children, title }) {
    return (
        <button onClick={onClick} className={className} title={title}>
            {children}
        </button>
    );
}

export default TablaUsuarios;
