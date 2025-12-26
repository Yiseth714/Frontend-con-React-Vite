// import React from 'react'

// //renderizar el home
// //Components
// import {BrowserRouter, Routes, Route} from 'react-router';
// import Home from './pages/HomePages.jsx';


// function Router(){
//     return(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element = {<Home/>}/>
//             </Routes>
//         </BrowserRouter>
//     )
// }

// export default Router;

import React from 'react'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/HomePages.jsx'
import Diccionario from './pages/Diccionario.jsx'
import Ruta from './pages/Ruta.jsx'
import Traductor from './pages/Traductor.jsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diccionario" element={<Diccionario />} />
        <Route path="/ruta" element={<Ruta />} />
        <Route path="/traductor" element={<Traductor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
