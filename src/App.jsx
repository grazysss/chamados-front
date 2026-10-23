import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Inicio from "./pages/Inicio"
import Detalhe from "./pages/Detalhes"
import Formulario from "./pages/Formulario" 

function App() {
    return (
        <>
        <Header />
        <main className="container">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/chamado/:id" element={<Detalhe />} /> 
              <Route path="/novo" element={<Formulario />} />          {/* ← nova */}
              <Route path="/editar/:id" element={<Formulario />} />
            </Routes>
        </main>
        </>
    )
}

export default App