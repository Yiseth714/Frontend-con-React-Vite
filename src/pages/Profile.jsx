// ============================================
// Página de Perfil - SeñaGo Frontend
// Muestra información del usuario y sus logros
// ============================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cerrarSesion, obtenerNombreUsuario } from "../services/auth";
import { obtenerLogros } from "../services/logros";

function Profile() {
    const navigate = useNavigate();
    const nombreUsuario = obtenerNombreUsuario();
    const [logros, setLogros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarLogros = async () => {
            try {
                const datos = await obtenerLogros();
                // El backend devuelve { logros: [...], total: number }
                setLogros(datos.logros || []);
            } catch (err) {
                console.error("Error al cargar logros:", err);
                setError("No se pudieron cargar los logros");
            } finally {
                setCargando(false);
            }
        };
        cargarLogros();
    }, []);

    const handleLogout = () => {
        cerrarSesion();
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Cabecera del perfil */}
            <div className="bg-gradient-to-r from-primary via-primary to-accent rounded-3xl p-6 md:p-8 mb-6 md:mb-8 text-white shadow-2xl">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-white/20 rounded-full flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg">
                        {nombreUsuario ? nombreUsuario.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center md:text-left">
                            {nombreUsuario || "Usuario"}
                        </h1>
                        <p className="text-white/80 text-lg">Aprendiz de Lengua de Señas Colombiana</p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                                🎯 {logros.length} Logros
                            </span>
                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                                📚 {logros.filter(l => l.nombre_logro?.includes('leccion')).length} Lecciones
                            </span>
                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                                🏆 {logros.filter(l => l.nombre_logro?.includes('reto') && l.nombre_logro?.includes('completado')).length} Retos
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón de cerrar sesión */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                </button>
            </div>

            {/* Sección de Logros */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                    <span className="text-3xl">🏆</span> Mis Logros
                </h2>

                {cargando ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-500 text-lg">Cargando logros...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl">
                        <p className="font-medium">{error}</p>
                    </div>
                ) : logros.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-7xl mb-6">🎯</div>
                        <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                            ¡Aún no tienes logros! Completa lecciones en la Ruta de Aprendizaje para ganar logros.
                        </p>
                        <button
                            onClick={() => navigate("/ruta")}
                            className="mt-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition"
                        >
                            Ir a la Ruta de Aprendizaje
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {logros.map((logro, index) => (
                            <div 
                                key={index} 
                                className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition hover:scale-105"
                            >
                                <div className="text-4xl">🏅</div>
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                    {logro.nombre_logro.startsWith('leccion_') 
                                        ? `Lección ${logro.nombre_logro.replace('leccion_', '').replace('_', '.')}`
                                        : logro.nombre_logro === 'primera_leccion' 
                                            ? 'Primera Lección'
                                            : logro.nombre_logro.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </h3>
                                    <p className="text-sm text-gray-600">{logro.descripcion}</p>
                                    {logro.fecha_obtenido && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Obtenido: {new Date(logro.fecha_obtenido).toLocaleDateString('es-CO', { timeZone: 'America/Bogota' })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats adicionales */}
                {logros.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-center gap-8">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-primary">{logros.length}</p>
                                <p className="text-gray-500">Logros obtenidos</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-600">
                                    {logros.filter(l => l.nombre_logro?.includes('leccion')).length}
                                </p>
                                <p className="text-gray-500">Lecciones completadas</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-accent">
                                    {logros.filter(l => l.nombre_logro?.includes('reto') && l.nombre_logro?.includes('completado')).length}
                                </p>
                                <p className="text-gray-500">Retos completados</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
