// ============================================
// Componente ProtectedRoute
// Protege las rutas que requieren autenticación
// ============================================

import { Navigate, useLocation } from 'react-router-dom';
import { estaAutenticado } from '../services/auth';

/**
 * Componente que protege rutas que requieren autenticación
 * Si el usuario no está autenticado, redirige al login
 * @param {React.ReactNode} children - Componente hijo a renderizar
 */
function ProtectedRoute({ children }) {
    const location = useLocation();
    const autenticado = estaAutenticado();

    if (!autenticado) {
        // Redirigir al login, pero guardar la ubicación actual
        // para poder redirigir de vuelta después del login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;
