import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Inicio"
import Detalhe from "./pages/Detalhe"
import Formulario from "./pages/Formulario"
import api from "./services/api"

function App() {
  return ( // anulando a div <> e </>
    <> 
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chamado/:id" element={<Detalhe />} />
          <Route path="/novo" element={<Formulario />} />
          <Route path="/editar/:id" element={<Formulario />} />
        </Routes>
      </main>
    </>
  )
}

export default App