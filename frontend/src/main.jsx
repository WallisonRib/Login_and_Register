import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./assets/index.css"
import PrivateRoute from './components/PrivateRoute.jsx'
import User from './components/User.jsx'
import Home from './components/Home.jsx'
import Cadastro from './components/Cadastro.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<Home/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/registrar" element={<Cadastro/>} />

        <Route path="/logado" element={
         <PrivateRoute>
          <User/>
         </PrivateRoute>
        } />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
