/**
 * ============================================
 * Custom Hook para Admin - Lógica de Negocio
 * ============================================
 * Maneja toda la lógica de datos del panel de admin
 */

import { useState, useCallback } from 'react';
import {
    obtenerUsuarios,
    obtenerEstadisticas,
    eliminarUsuario,
    cambiarTipoUsuario,
    obtenerProgresoUsuario,
    obtenerLogrosUsuario,
    actualizarUsuario,
} from '../../../api/admin';

/**
 * Hook principal para el panel de administración
 * @returns {Object} - Estados y funciones para el componente Admin
 */
export function useAdmin() {
    // Estados principales
    const [usuarios, setUsuarios] = useState([]);
    const [estadisticas, setEstadisticas] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    
    // Estados para detalles
    const [progresoUsuario, setProgresoUsuario] = useState(null);
    const [logrosUsuario, setLogrosUsuario] = useState([]);
    const [cargandoDetalle, setCargandoDetalle] = useState(false);

    // Cargar datos iniciales
    const cargarDatos = useCallback(async () => {
        setCargando(true);
        setError('');
        
        try {
            const [usuariosData, statsData] = await Promise.all([
                obtenerUsuarios(),
                obtenerEstadisticas(),
            ]);
            setUsuarios(usuariosData);
            setEstadisticas(statsData);
        } catch (err) {
            console.error('Error al cargar datos:', err);
            setError('No tienes permisos para acceder al panel de administrador');
        } finally {
            setCargando(false);
        }
    }, []);

    // Ver detalle de usuario (progreso y logros)
    const verDetalleUsuario = useCallback(async (usuario) => {
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
            console.error('Error al cargar detalle:', err);
        } finally {
            setCargandoDetalle(false);
        }
    }, []);

    // Eliminar usuario
    const eliminar = useCallback(async (usuarioId, nombre) => {
        if (!window.confirm(`¿Estás seguro de eliminar al usuario "${nombre}"? Esta acción no se puede deshacer.`)) {
            return { success: false, message: 'Cancelled' };
        }

        try {
            await eliminarUsuario(usuarioId);
            // Actualizar lista local
            setUsuarios(prev => prev.filter(u => u.id !== usuarioId));
            return { success: true, message: 'Usuario eliminado exitosamente' };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }, []);

    // Cambiar tipo de usuario
    const cambiarTipo = useCallback(async (usuarioId, nombre, tipoActual) => {
        const nuevoTipo = tipoActual === 'normal' ? 'administrador' : 'normal';
        
        if (!window.confirm(`¿Cambiar a "${nombre}" a tipo "${nuevoTipo}"?`)) {
            return { success: false, message: 'Cancelled' };
        }

        try {
            await cambiarTipoUsuario(usuarioId, nuevoTipo);
            // Actualizar lista local
            setUsuarios(prev => prev.map(u => 
                u.id === usuarioId ? { ...u, tipo_usuario: nuevoTipo } : u
            ));
            return { success: true, message: `Usuario actualizado a "${nuevoTipo}"` };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }, []);

    // Actualizar usuario
    const actualizar = useCallback(async (usuarioId, datos) => {
        try {
            await actualizarUsuario(usuarioId, datos);
            // Actualizar lista local
            setUsuarios(prev => prev.map(u => 
                u.id === usuarioId ? { ...u, ...datos } : u
            ));
            return { success: true, message: 'Usuario actualizado exitosamente' };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }, []);

    // Limpiar estados de detalle
    const limpiarDetalle = useCallback(() => {
        setProgresoUsuario(null);
        setLogrosUsuario([]);
    }, []);

    return {
        // Estados
        usuarios,
        estadisticas,
        cargando,
        error,
        progresoUsuario,
        logrosUsuario,
        cargandoDetalle,
        
        // Funciones
        cargarDatos,
        verDetalleUsuario,
        eliminar,
        cambiarTipo,
        actualizar,
        limpiarDetalle,
    };
}

export default useAdmin;
