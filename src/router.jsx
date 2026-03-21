
// import React from 'react'

// // Router
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// // Pages
// import Home from './pages/HomePages.jsx'
// import Diccionario from './pages/Diccionario.jsx'
// import Ruta from './pages/RutaAprendizaje/RutaHome.jsx'
// import Traductor from './pages/Traductor.jsx'



// function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/diccionario" element={<Diccionario />} />
//         <Route path="/ruta" element={<Ruta />} />
//         <Route path="/traductor" element={<Traductor />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default Router

import React from 'react'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Componentes
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

// Pages generales
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Home from './pages/HomePages.jsx'
import Diccionario from './pages/Diccionario.jsx'
import Traductor from './pages/Traductor.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/admin/index.jsx'

// Ruta de Aprendizaje
import RutaHome from './pages/RutaAprendizaje/RutaHome.jsx'
import Retos from './pages/RutaAprendizaje/Retos.jsx'
import Reto from './pages/RutaAprendizaje/Reto.jsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (sin Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas con Layout (Header + Footer) */}
        <Route element={<Layout />}>
          {/* Ruta pública */}
          <Route path="/" element={<Home />} />
          <Route path="/traductor" element={<Traductor />} />

          {/* Rutas protegidas - requieren autenticación */}
          <Route
            path="/diccionario"
            element={
              <ProtectedRoute>
                <Diccionario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ruta"
            element={
              <ProtectedRoute>
                <RutaHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ruta/retos"
            element={
              <ProtectedRoute>
                <Retos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ruta/retos/:id"
            element={
              <ProtectedRoute>
                <Reto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

