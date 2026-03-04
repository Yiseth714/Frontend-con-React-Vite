
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

// Pages generales
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
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/diccionario" element={<Diccionario />} />
        <Route path="/traductor" element={<Traductor />} />

        {/* Ruta de Aprendizaje */}
        <Route path="/ruta" element={<RutaHome />} />
        <Route path="/ruta/retos" element={<Retos />} />
        <Route path="/ruta/retos/:id" element={<Reto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router

