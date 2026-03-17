// ============================================
// Página de Registro - SeñaGo Frontend
// Permite al usuario crear una nueva cuenta
// ============================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registrarUsuario, iniciarSesion } from '../services/auth';
import { crearProgreso } from '../services/progreso';

function Registro() {
    // Estado para manejar los datos del formulario
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [discapacidad, setDiscapacidad] = useState('ninguna');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    // Hook para navegación
    const navigate = useNavigate();

    /**
     * Manejar el envío del formulario de registro
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            // Validar que los campos no estén vacíos
            if (!nombre_usuario.trim() || !contrasena.trim() || !confirmarContrasena.trim()) {
                throw new Error('Por favor completa todos los campos');
            }

            // Validar longitud mínima del nombre de usuario
            if (nombre_usuario.length < 3) {
                throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
            }

            // Validar longitud mínima de la contraseña
            if (contrasena.length < 4) {
                throw new Error('La contraseña debe tener al menos 4 caracteres');
            }

            // Validar que las contraseñas coincidan
            if (contrasena !== confirmarContrasena) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Registrar el usuario en el backend
            await registrarUsuario(nombre_usuario, contrasena, discapacidad);

            // Iniciar sesión automáticamente después del registro
            await iniciarSesion(nombre_usuario, contrasena);

            // Crear progreso inicial para el usuario
            await crearProgreso(1, 1, '');

            // Redirigir al Home después del registro exitoso
            navigate('/');

        } catch (err) {
            // Mostrar el error al usuario
            setError(err.message || 'Error al registrar usuario');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-fadeIn">

                {/* Título */}
                <h1 className="text-3xl font-bold text-primary text-center mb-2">
                    Crear Cuenta
                </h1>
                <p className="text-gray-500 text-center mb-8">
                    Únete a SeñaGo y aprende lengua de señas
                </p>

                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Formulario de Registro */}
                <form onSubmit={handleSubmit} className="space-y-5">

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
                            placeholder="Mínimo 3 caracteres"
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
                            placeholder="Mínimo 4 caracteres"
                            disabled={cargando}
                        />
                    </div>

                    {/* Campo: Confirmar Contraseña */}
                    <div>
                        <label
                            htmlFor="confirmar_contrasena"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmar_contrasena"
                            type="password"
                            value={confirmarContrasena}
                            onChange={(e) => setConfirmarContrasena(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder="Repite tu contraseña"
                            disabled={cargando}
                        />
                    </div>

                    {/* Campo: Tipo de discapacidad */}
                    <div>
                        <label
                            htmlFor="discapacidad"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            ¿Tienes alguna discapacidad?
                        </label>
                        <select
                            id="discapacidad"
                            value={discapacidad}
                            onChange={(e) => setDiscapacidad(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                            disabled={cargando}
                        >
                            <option value="ninguna">Ninguna</option>
                            <option value="persona_sorda">Persona sord@</option>
                            <option value="otra">Otra</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Esta información nos ayuda a personalizar tu experiencia
                        </p>
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
                        {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>

                {/* Enlace a Login */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Link
                            to="/login"
                            className="text-primary font-semibold hover:underline"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Registro;
