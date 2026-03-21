/**
 * ============================================
 * Componente: ModalEditar
 * ============================================
 * Modal para editar un usuario
 */

import { useState } from 'react';

/**
 * Opciones de discapacidad
 */
const OPCIONES_DISCAPACIDAD = [
    { value: 'ninguna', label: 'Ninguna' },
    { value: 'persona_sorda', label: 'Persona Sorda' },
    { value: 'otra', label: 'Otra' },
];

/**
 * Componente modal de edición
 * @param {Object} usuario - Usuario a editar
 * @param {Function} onSave - Función para guardar
 * @param {Function} onClose - Función para cerrar
 */
export function ModalEditar({ usuario, onSave, onClose }) {
    const [guardando, setGuardando] = useState(false);
    const [formData, setFormData] = useState({
        nombre_usuario: usuario?.nombre_usuario || '',
        discapacidad: usuario?.discapacidad || 'ninguna',
        nueva_contrasena: '',
    });

    if (!usuario) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);

        try {
            // Construir objeto con solo los campos modificados
            const datos = {};
            if (formData.nombre_usuario !== usuario.nombre_usuario) {
                datos.nombre_usuario = formData.nombre_usuario;
            }
            if (formData.discapacidad !== usuario.discapacidad) {
                datos.discapacidad = formData.discapacidad;
            }
            if (formData.nueva_contrasena) {
                datos.nueva_contrasena = formData.nueva_contrasena;
            }

            if (Object.keys(datos).length === 0) {
                alert('No hay cambios para guardar');
                setGuardando(false);
                return;
            }

            const resultado = await onSave(usuario.id, datos);
            
            if (resultado.success) {
                alert(resultado.message);
                onClose();
            } else if (resultado.message !== 'Cancelled') {
                alert(resultado.message);
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b bg-gradient-to-r from-green-50 to-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 text-xl">✏️</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Editar Usuario</h2>
                            <p className="text-sm text-gray-500">{usuario.nombre_usuario}</p>
                        </div>
                    </div>
                    <BotonCerrar onClick={onClose} />
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <CampoFormulario
                        label="Nombre de usuario"
                        name="nombre_usuario"
                        type="text"
                        value={formData.nombre_usuario}
                        onChange={handleChange}
                        required
                    />

                    <CampoSelect
                        label="Discapacidad"
                        name="discapacidad"
                        value={formData.discapacidad}
                        onChange={handleChange}
                        opciones={OPCIONES_DISCAPACIDAD}
                    />

                    <CampoFormulario
                        label="Nueva contraseña (opcional)"
                        name="nueva_contrasena"
                        type="password"
                        value={formData.nueva_contrasena}
                        onChange={handleChange}
                        placeholder="Dejar en blanco para mantener actual"
                    />

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                        <BotonCancelar onClick={onClose} />
                        <BotonGuardar guardando={guardando} />
                    </div>
                </form>
            </div>
        </div>
    );
}

/**
 * Campo de formulario
 */
function CampoFormulario({ label, name, type, value, onChange, placeholder, required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
        </div>
    );
}

/**
 * Campo select
 */
function CampoSelect({ label, name, value, onChange, opciones }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
                {opciones.map(opcion => (
                    <option key={opcion.value} value={opcion.value}>
                        {opcion.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

/**
 * Botón guardar
 */
function BotonGuardar({ guardando }) {
    return (
        <button
            type="submit"
            disabled={guardando}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
            {guardando ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                </>
            ) : (
                '💾 Guardar cambios'
            )}
        </button>
    );
}

/**
 * Botón cancelar
 */
function BotonCancelar({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
            Cancelar
        </button>
    );
}

/**
 * Botón cerrar
 */
function BotonCerrar({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );
}

export default ModalEditar;
