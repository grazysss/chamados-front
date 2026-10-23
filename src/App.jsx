// import { useEffect, useState } from "react"
// import { Routes, Route } from "react-router-dom"
// // import Header from "./components/Header"
// // import Inicio from "./pages/Inicio"
// // import Detalhes from "./pages/Detalhes"
// // import Formulario from "./pages/Formulario"
// import api from "./services/api"

import Header from "./components/Header"

export default function App() {
  return (
    <>
      <Header />
      <main>
        <h1>Sistema de chamados</h1>
      </main>
    </>
  )
}

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