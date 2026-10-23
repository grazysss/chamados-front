import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

function Header() {
    const [dono, setDono] = useState(null)

    useEffect(() => {
        async function carregar() {
        try {
            const resposta = await api.get("/eu")
            setDono(resposta.data)
        } catch (erro) {
            setDono(null)
        }
    }
    carregar()
    }, [])

    return (
        <header className="header">
        <Link to="/" className="logo">MAINtenance!</Link>
        <span>Oii, {dono ? dono.nome : "..."}</span>
        </header>
    )
}

export default Header
