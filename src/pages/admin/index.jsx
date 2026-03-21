/**
 * ============================================
 * Panel de Administrador - Componente Principal
 * ============================================
 * Orchestrator que une todos los componentes
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from './hooks/useAdmin';
import { obtenerNombreUsuario } from '../../services/auth';
import Estadisticas from './components/Estadisticas';
import TablaUsuarios from './components/TablaUsuarios';
import ModalDetalle from './components/ModalDetalle';
import ModalEditar from './components/ModalEditar';

function Admin() {
    const navigate = useNavigate();
    const nombreUsuario = obtenerNombreUsuario();
    
    // Estados locales para modales
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [editando, setEditando] = useState(null);
    
    // Usar el hook de admin
    const {
        usuarios,
        estadisticas,
        cargando,
        error,
        progresoUsuario,
        logrosUsuario,
        cargandoDetalle,
        cargarDatos,
        verDetalleUsuario,
        eliminar,
        cambiarTipo,
        actualizar,
    } = useAdmin();

    // Cargar datos al montar
    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    // Handlers para acciones
    const handleVerDetalle = async (usuario) => {
        setUsuarioSeleccionado(usuario);
        await verDetalleUsuario(usuario);
    };

    const handleCerrarDetalle = () => {
        setUsuarioSeleccionado(null);
    };

    const handleEditar = (usuario) => {
        setEditando(usuario);
    };

    const handleCerrarEditar = () => {
        setEditando(null);
    };

    const handleEliminar = async (usuarioId, nombre) => {
        const resultado = await eliminar(usuarioId, nombre);
        if (resultado.success) {
            alert(resultado.message);
            handleCerrarDetalle();
        } else if (resultado.message !== 'Cancelled') {
            alert(resultado.message);
        }
    };

    const handleCambiarTipo = async (usuarioId, nombre, tipoActual) => {
        const resultado = await cambiarTipo(usuarioId, nombre, tipoActual);
        if (resultado.success) {
            alert(resultado.message);
        } else if (resultado.message !== 'Cancelled') {
            alert(resultado.message);
        }
    };

    const handleGuardarEdicion = async (usuarioId, datos) => {
        return await actualizar(usuarioId, datos);
    };

    // Estados de carga
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
                        onClick={() => navigate('/')}
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
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">⚙️</span>
                    <h1 className="text-3xl font-bold text-primary">Panel de Administrador</h1>
                </div>
                <p className="text-gray-600 text-lg">Gestiona usuarios, estadísticas y contenido</p>
                <p className="text-gray-500">
                    Bienvenido, <span className="font-medium text-primary">{nombreUsuario}</span>
                </p>
            </div>

            {/* Estadísticas */}
            <Estadisticas stats={estadisticas} />

            {/* Tabla de usuarios */}
            <TablaUsuarios
                usuarios={usuarios}
                onVer={handleVerDetalle}
                onEditar={handleEditar}
                onCambiarTipo={handleCambiarTipo}
                onEliminar={handleEliminar}
            />

            {/* Modal de detalle */}
            {usuarioSeleccionado && (
                <ModalDetalle
                    usuario={usuarioSeleccionado}
                    progreso={progresoUsuario}
                    logros={logrosUsuario}
                    cargando={cargandoDetalle}
                    onClose={handleCerrarDetalle}
                />
            )}

            {/* Modal de edición */}
            {editando && (
                <ModalEditar
                    usuario={editando}
                    onSave={handleGuardarEdicion}
                    onClose={handleCerrarEditar}
                />
            )}
        </div>
    );
}

export default Admin;
