import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import { buscarListas } from "../services/listas"
import { mensagemDeErro } from "../utils/helpers"

function Inicio() {
    const [chamados, setChamados] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")

    // selects
    const [tipos, setTipos] = useState([])
    const [locais, setLocais] = useState([])
    const [prioridades, setPrioridades] = useState([])

    // filtros
    const [busca, setBusca] = useState("")
    const [status, setStatus] = useState("")
    const [tipo, setTipo] = useState("")
    const [local, setLocal] = useState("")
    const [prioridade, setPrioridade] = useState("")

    // 1) carrega as listas dos selects (uma vez)
    useEffect(() => {
        async function carregarListas() {
        try {
            const listas = await buscarListas()
            setTipos(listas.tipos)
            setLocais(listas.locais)
            setPrioridades(listas.prioridades)
        } catch (e) {
            setErro(mensagemDeErro(e))
        }
        }
        carregarListas()
    }, [])

    // 2) carrega os chamados sempre que algum filtro mudar
    useEffect(() => {
        async function carregarChamados() {
        try {
            setCarregando(true)
            setErro("")

            // só envia o filtro se estiver preenchido
            const params = {}
            if (busca) paramssca = busca
            if (status) paramss = status
            if (tipo) params.tipo = tipo
            if (local) params.local = local
            if (prioridade) params.prioridade = prioridade

            const resposta = await api.get("/chamados", { params })
            setChamados(resposta.data)
        } catch (e) {
            setErro(mensagemDeErro(e))
        } finally {
            setCarregando(false)
        }
        }
        carregarChamados()
    }, [busca, status, tipo, local, prioridade])

    return (
        <div>
        <div className="top-lista">
            <h2>Chamados</h2>
            <Link to="/novo" className="botao">+ Abrir chamado</Link>
        </div>

        <input
            className="busca"
            placeholder="Buscar por título ou descrição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
        />

        <div className="filtros">
            <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="aberto">aberto</option>
            <option value="em andamento">em andamento</option>
            <option value="resolvido">resolvido</option>
            </select>

            <select 
                value={tipo} 
                onChange={(e) => setTipo(e.target.value)}>
            <option 
                value="">Tipo</option>
            {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select 
                value={local} 
                onChange={(e) => setLocal(e.target.value)}>
            <option value="">Local</option>
            {locais.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            <select 
                value={prioridade} 
                onChange={(e) => setPrioridade(e.target.value)}>
            <option value="">Prioridade</option>
            {prioridades.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
        </div>

        {carregando && <p>Carregando chamados... :D</p>}
        {erro && <p className="erro">{erro}</p>}
        {!carregando && !erro && chamados.length === 0 && (
            <p>Nenhum chamado encontrado.</p>
        )}

        {!carregando && chamados.map((c) => (
            <Link to={`/chamado/${c.id}`} key={c.id} className="card">
            <strong>{c.titulo}</strong>
            <span>{c.local} · {c.tipo}</span>
            <span className={`tag ${c.status.replace(" ", "-")}`}>{c.status}</span>
            <span className="tag">{c.prioridade}</span>
            </Link>
        ))}
        </div>
    )
}

export default Inicio