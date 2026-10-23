// import { useEffect, useState } from "react"
// import { Routes, Route } from "react-router-dom"
// // import Header from "./components/Header"
// // import Inicio from "./pages/Inicio"
// // import Detalhes from "./pages/Detalhes"
// // import Formulario from "./pages/Formulario"
// import api from "./services/api"

import { useEffect } from "react"
import { buscarListas } from "./services/listas"

function App() {
  useEffect(() => {
    buscarListas().then((l) => console.log(l))
  }, [])
  return <h1>Sistema de chamados</h1>
}

export default App

// <> // anulando a div <> e </> 
//   <Header />
//   <main className="container">
//     {/* <Routes>
//       <Route path="/" element={<Inicio />} />
//       <Route path="/chamado/:id" element={<Detalhes />} />
//       <Route path="/novo" element={<Formulario />} />
//       <Route path="/editar/:id" element={<Formulario />} />
//     </Routes> */}
//   </main>
// </>