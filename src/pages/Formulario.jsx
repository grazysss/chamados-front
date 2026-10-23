import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { buscarListas } from "../services/listas"
import { mensagemDeErro } from "../utils/helpers"

function Formulario() {
    const { id } = useParams()   // se tiver id, é edição
    const navigate = useNavigate()
    const editando = Boolean(id)

    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        tipo: "",
        local: "",
        prioridade: "",
        data_abertura: new Date().toISOString().slice(0, 10)
    })
    const [tipos, setTipos] = useState([])
    const [locais, setLocais] = useState([])
    const [prioridades, setPrioridades] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")
    const [sucesso, setSucesso] = useState("")
    const [bloqueado, setBloqueado] = useState(false)

    useEffect(() => {
        async function carregar() {
        try {
            const listas = await buscarListas()
            setTipos(listas.tipos)
            setLocais(listas.locais)
            setPrioridades(listas.prioridades)

            // se for edição, busca o chamado e preenche o formulário
            if (editando) {
            const resposta = await api.get(`/chamados/${id}`)
            const c = resposta.data
            if (c.status === "resolvido") {
                setBloqueado(true)
            }
            setForm({
                titulo: c.titulo,
                descricao: c.descricao,
                tipo: c.tipo,
                local: c.local,
                prioridade: c.prioridade,
                data_abertura: c.data_abertura
            })
            }
        } catch (e) {
            setErro(mensagemDeErro(e))
        } finally {
            setCarregando(false)
        }
        }
        carregar()
    }, [id])

    // um único handler serve para todos os campos (usa o atributo name)
    function mudar(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function salvar(e) {
        e.preventDefault()
        try {
        setErro("")
        setSucesso("")
        if (editando) {
            await api.put(`/chamados/${id}`, form)
        } else {
            await api.post("/chamados", form)
        }
        setSucesso("Chamado salvo com sucesso!")
        setTimeout(() => navigate("/"), 1000)
        } catch (e) {
        setErro(mensagemDeErro(e))
        }
    }

    if (carregando) return <p>Carregando...</p>
    if (bloqueado) {
        return <p className="erro">Chamados resolvidos não podem ser editados.</p>
    }

    return (
        <form onSubmit={salvar} className="formulario">
            <h2>{editando ? "Editar chamado" : "Abrir chamado"}</h2>

            <label>Título</label> <br />
            <input name="titulo" value={form.titulo} onChange={mudar} /> <br />
            <br />
            <label>Descrição</label> <br />
            <textarea name="descricao" value={form.descricao} onChange={mudar} />
            <br />

            <div className="forms-selects">
                <div>
                    <label>Tipo</label> <br />
                    <select name="tipo" value={form.tipo} onChange={mudar}>
                        <option value="">Selecione</option>
                        {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label>Local</label> <br />
                    <select name="local" value={form.local} onChange={mudar}>
                        <option value="">Selecione</option>
                        {locais.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <br />
                </div>

                <div>
                    <label>Prioridade</label> <br />
                    <select name="prioridade" value={form.prioridade} onChange={mudar}>
                        <option value="">Selecione</option>
                        {prioridades.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            </div>

            <div className="data-abertura"> 
                <label>Data de abertura</label> <br />
                <input type="date" name="data_abertura" value={form.data_abertura} onChange={mudar} />
            </div>

            {erro && <p className="erro">{erro}</p>}
            {sucesso && <p className="sucesso">{sucesso}</p>}

            <div className="botoes-forms">
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
            </div>
        </form>
    )
}

export default Formulario