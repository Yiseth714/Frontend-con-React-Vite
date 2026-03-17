// ============================================
// Página de Login - SeñaGo Frontend
// Permite al usuario iniciar sesión
// ============================================

import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { iniciarSesion, estaAutenticado } from '../services/auth';

function Login() {
    // Estado para manejar los datos del formulario
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    // Hook para navegación
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener la ubicación anterior (donde intentaba acceder)
    const from = location.state?.from?.pathname || '/';

    // Si ya está autenticado, redirigir al Home
    if (estaAutenticado()) {
        navigate('/', { replace: true });
        return null;
    }

    /**
     * Manejar el envío del formulario de login
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            // Validar que los campos no estén vacíos
            if (!nombre_usuario.trim() || !contrasena.trim()) {
                throw new Error('Por favor ingresa nombre de usuario y contraseña');
            }

            // Llamar al servicio de autenticación
            await iniciarSesion(nombre_usuario, contrasena);

            // Redirigir al Home después del login exitoso
            navigate(from, { replace: true });

        } catch (err) {
            // Mostrar el error al usuario
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-fadeIn">

                {/* Título */}
                <h1 className="text-3xl font-bold text-primary text-center mb-2">
                    Iniciar Sesión
                </h1>
                <p className="text-gray-500 text-center mb-8">
                    Bienvenido de nuevo a SeñaGo
                </p>

                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Formulario de Login */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Campo: Nombre de usuario */}
                    <div>
                        <label
                            htmlFor="nombre_usuario"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Nombre de usuario
                        </label>
                        <input
                            id="nombre_usuario"
                            type="text"
                            value={nombre_usuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder="Ingresa tu nombre de usuario"
                            disabled={cargando}
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div>
                        <label
                            htmlFor="contrasena"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            id="contrasena"
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder="Ingresa tu contraseña"
                            disabled={cargando}
                        />
                    </div>

                    {/* Botón de Submit */}
                    <button
                        type="submit"
                        disabled={cargando}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                            cargando
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-primary hover:bg-blue-900'
                        }`}
                    >
                        {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {/* Enlace a Registro */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <Link
                            to="/registro"
                            className="text-primary font-semibold hover:underline"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;
