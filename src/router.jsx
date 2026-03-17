
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

// Pages generales
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Home from './pages/HomePages.jsx'
import Diccionario from './pages/Diccionario.jsx'
import Traductor from './pages/Traductor.jsx'

// Ruta de Aprendizaje
import RutaHome from './pages/RutaAprendizaje/RutaHome.jsx'
import Retos from './pages/RutaAprendizaje/Retos.jsx'
import Reto from './pages/RutaAprendizaje/Reto.jsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Home />} />

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
          path="/traductor"
          element={
            <ProtectedRoute>
              <Traductor />
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
      </Routes>
    </BrowserRouter>
  )
}

export default Router

