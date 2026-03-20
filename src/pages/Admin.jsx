// ============================================
// Panel de Administrador - SeñaGo Frontend
// Gestión de usuarios y estadísticas
// ============================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    obtenerUsuarios,
    obtenerEstadisticas,
    eliminarUsuario,
    cambiarTipoUsuario,
    obtenerProgresoUsuario,
    obtenerLogrosUsuario,
    actualizarUsuario,
} from "../services/admin";
import { obtenerNombreUsuario } from "../services/auth";

function Admin() {
    const navigate = useNavigate();
    const nombreUsuario = obtenerNombreUsuario();

    // Estados
    const [usuarios, setUsuarios] = useState([]);
    const [estadisticas, setEstadisticas] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [progresoUsuario, setProgresoUsuario] = useState(null);
    const [logrosUsuario, setLogrosUsuario] = useState([]);
    const [cargandoDetalle, setCargandoDetalle] = useState(false);
    
    // Estado para modal de edición
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [editForm, setEditForm] = useState({
        nombre_usuario: '',
        discapacidad: 'ninguna',
        nueva_contrasena: ''
    });
    const [guardando, setGuardando] = useState(false);

    // Cargar datos al montar
    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setCargando(true);
        setError("");
        try {
            const [usuariosData, statsData] = await Promise.all([
                obtenerUsuarios(),
                obtenerEstadisticas(),
            ]);
            setUsuarios(usuariosData);
            setEstadisticas(statsData);
        } catch (err) {
            console.error("Error al cargar datos:", err);
            setError("No tienes permisos para acceder al panel de administrador");
        } finally {
            setCargando(false);
        }
    };

    const verDetalleUsuario = async (usuario) => {
        setUsuarioSeleccionado(usuario);
        setCargandoDetalle(true);
        setProgresoUsuario(null);
        setLogrosUsuario([]);

        try {
            const [progreso, logros] = await Promise.all([
                obtenerProgresoUsuario(usuario.id).catch(() => null),
                obtenerLogrosUsuario(usuario.id).catch(() => []),
            ]);
            setProgresoUsuario(progreso);
            setLogrosUsuario(logros);
        } catch (err) {
            console.error("Error al cargar detalle:", err);
        } finally {
            setCargandoDetalle(false);
        }
    };

    const cerrarDetalle = () => {
        setUsuarioSeleccionado(null);
        setProgresoUsuario(null);
        setLogrosUsuario([]);
    };

    const handleEliminarUsuario = async (usuarioId, nombre) => {
        if (!window.confirm(`¿Estás seguro de eliminar al usuario "${nombre}"? Esta acción no se puede deshacer.`)) {
            return;
        }

        try {
            await eliminarUsuario(usuarioId);
            alert("Usuario eliminado exitosamente");
            cargarDatos();
            cerrarDetalle();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCambiarTipo = async (usuarioId, nombre, tipoActual) => {
        const nuevoTipo = tipoActual === "normal" ? "administrador" : "normal";
        if (!window.confirm(`¿Cambiar a "${nombre}" a tipo "${nuevoTipo}"?`)) {
            return;
        }

        try {
            await cambiarTipoUsuario(usuarioId, nuevoTipo);
            alert(`Usuario actualizado a "${nuevoTipo}"`);
            cargarDatos();
            cerrarDetalle();
        } catch (err) {
            alert(err.message);
        }
    };

    // Funciones para editar usuario
    const abrirEditarUsuario = (usuario) => {
        setUsuarioEditando(usuario);
        setEditForm({
            nombre_usuario: usuario.nombre_usuario || '',
            discapacidad: usuario.discapacidad || 'ninguna',
            nueva_contrasena: ''
        });
    };

    const cerrarEditarUsuario = () => {
        setUsuarioEditando(null);
        setEditForm({
            nombre_usuario: '',
            discapacidad: 'ninguna',
            nueva_contrasena: ''
        });
    };

    const handleGuardarEdicion = async (e) => {
        e.preventDefault();
        setGuardando(true);

        try {
            const datos = {};
            if (editForm.nombre_usuario !== usuarioEditando.nombre_usuario) {
                datos.nombre_usuario = editForm.nombre_usuario;
            }
            if (editForm.discapacidad !== usuarioEditando.discapacidad) {
                datos.discapacidad = editForm.discapacidad;
            }
            if (editForm.nueva_contrasena) {
                datos.nueva_contrasena = editForm.nueva_contrasena;
            }

            if (Object.keys(datos).length === 0) {
                alert("No hay cambios para guardar");
                setGuardando(false);
                return;
            }

            await actualizarUsuario(usuarioEditando.id, datos);
            alert("Usuario actualizado exitosamente");
            cargarDatos();
            cerrarEditarUsuario();
        } catch (err) {
            alert(err.message);
        } finally {
            setGuardando(false);
        }
    };

    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-500">Cargando panel de administrador...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Título */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">Panel de Administrador</h1>
                <p className="text-gray-600">Bienvenida, {nombreUsuario}</p>
            </div>

            {/* Estadísticas */}
            {estadisticas && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-primary to-blue-600 p-6 rounded-2xl text-white">
                        <p className="text-3xl font-bold">{estadisticas.total_usuarios}</p>
                        <p className="text-sm opacity-80">Total Usuarios</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
                        <p className="text-3xl font-bold">{estadisticas.usuarios_ninguna_discapacidad}</p>
                        <p className="text-sm opacity-80">Sin Discapacidad</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
                        <p className="text-3xl font-bold">{estadisticas.usuarios_sordos}</p>
                        <p className="text-sm opacity-80">Personas Sordas</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
                        <p className="text-3xl font-bold">{estadisticas.usuarios_otra_discapacidad}</p>
                        <p className="text-sm opacity-80">Otra Discapacidad</p>
                    </div>
                </div>
            )}

            {/* Lista de Usuarios */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-primary">Usuarios Registrados</h2>
                    <p className="text-gray-500 text-sm">Total: {usuarios.length} usuarios</p>
                </div>

                {usuarios.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No hay usuarios registrados
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discapacidad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Registro</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm">{usuario.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium">{usuario.nombre_usuario}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                usuario.tipo_usuario === "administrador"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                                {usuario.tipo_usuario}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">{usuario.discapacidad || "ninguna"}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {usuario.fecha_creacion
                                                ? new Date(usuario.fecha_creacion).toLocaleDateString("es-CO")
                                                : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => verDetalleUsuario(usuario)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Ver
                                                </button>
                                                <button
                                                    onClick={() => abrirEditarUsuario(usuario)}
                                                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleCambiarTipo(usuario.id, usuario.nombre_usuario, usuario.tipo_usuario)}
                                                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                                >
                                                    {usuario.tipo_usuario === "normal" ? "Hacer Admin" : "Quitar Admin"}
                                                </button>
                                                <button
                                                    onClick={() => handleEliminarUsuario(usuario.id, usuario.nombre_usuario)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal de Detalle */}
            {usuarioSeleccionado && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold text-primary">
                                Detalle de: {usuarioSeleccionado.nombre_usuario}
                            </h2>
                            <button
                                onClick={cerrarDetalle}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Info básica */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">ID</p>
                                    <p className="font-medium">{usuarioSeleccionado.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tipo</p>
                                    <p className="font-medium">{usuarioSeleccionado.tipo_usuario}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Discapacidad</p>
                                    <p className="font-medium">{usuarioSeleccionado.discapacidad || "ninguna"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Fecha Registro</p>
                                    <p className="font-medium">
                                        {usuarioSeleccionado.fecha_creacion
                                            ? new Date(usuarioSeleccionado.fecha_creacion).toLocaleDateString("es-CO")
                                            : "-"}
                                    </p>
                                </div>
                            </div>

                            {/* Progreso */}
                            <div>
                                <h3 className="font-bold text-primary mb-2">Progreso en Retos</h3>
                                {cargandoDetalle ? (
                                    <p className="text-gray-500">Cargando...</p>
                                ) : progresoUsuario ? (
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <p><span className="font-medium">Reto actual:</span> {progresoUsuario.reto_actual}</p>
                                        <p><span className="font-medium">Lección actual:</span> {progresoUsuario.leccion_actual}</p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Lecciones completadas:</span> {progresoUsuario.lecciones_completadas || "Ninguna"}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Sin progreso registrado</p>
                                )}
                            </div>

                            {/* Logros */}
                            <div>
                                <h3 className="font-bold text-primary mb-2">Logros Obtenidos ({logrosUsuario.length})</h3>
                                {cargandoDetalle ? (
                                    <p className="text-gray-500">Cargando...</p>
                                ) : logrosUsuario.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {logrosUsuario.map((logro, index) => (
                                            <div key={index} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                                <p className="font-medium text-sm">{logro.nombre_logro}</p>
                                                <p className="text-xs text-gray-500">{logro.descripcion}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Sin logros obtenidos</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Edición */}
            {usuarioEditando && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold text-primary">
                                Editar Usuario
                            </h2>
                            <button
                                onClick={cerrarEditarUsuario}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleGuardarEdicion} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre de usuario
                                </label>
                                <input
                                    type="text"
                                    value={editForm.nombre_usuario}
                                    onChange={(e) => setEditForm({...editForm, nombre_usuario: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    minLength={3}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Discapacidad
                                </label>
                                <select
                                    value={editForm.discapacidad}
                                    onChange={(e) => setEditForm({...editForm, discapacidad: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="ninguna">Ninguna</option>
                                    <option value="persona_sorda">Persona Sorda</option>
                                    <option value="otra">Otra</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nueva contraseña
                                </label>
                                <input
                                    type="password"
                                    value={editForm.nueva_contrasena}
                                    onChange={(e) => setEditForm({...editForm, nueva_contrasena: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Dejar vacío para no cambiar"
                                    minLength={4}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Mínimo 4 caracteres. Dejar vacío si no desea cambiar.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={cerrarEditarUsuario}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={guardando}
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {guardando ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
