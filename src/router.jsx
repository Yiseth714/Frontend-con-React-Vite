import React from 'react'

//renderizar el home
//Components
import {BrowserRouter, Routes, Route} from 'react-router';
import Home from './pages/HomePages.jsx';


function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;