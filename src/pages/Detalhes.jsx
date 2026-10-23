import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { mensagemDeErro, formatarData } from "../utils/helpers"

function Detalhes() {
    const { id } = useParams() // useParams pega o :id da URL (chamado/5 fica id = "5")
    const navigate = useNavigate() // useNavigate troca de tela por código (depois de excluir, volta para /) - início.

    const [chamado, setChamado] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")
    const [responsavel, setResponsavel] = useState("")
    const [solucao, setSolucao] = useState("")
    const [confirmando, setConfirmando] = useState(false)

    async function carregar() {
        try {
            setCarregando(true)
            const resposta = await api.get(`/chamados/${id}`)
            setChamado(resposta.data)
        } catch (e) {
            setErro(mensagemDeErro(e))
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        carregar()
    }, [id])

    async function iniciar() {
        try {
            setErro("")
            await api.patch(`/chamados/${id}/iniciar`, {responsavel})
            setResponsavel("")
            await carregar()
        } catch (e) {
            setErro(mensagemDeErro(e))
        }
    }

    async function resolver() {
        try {
            setErro("")
            await api.patch(`/chamados/${id}/resolver`, {solucao})
            setSolucao("")
            await carregar()
        } catch (e) {
            setErro(mensagemDeErro(e))
        }
    }

    async function excluir() {
        try {
            await api.delete(`/chamados/${id}`)
            navigate("/") 
        } catch (e) {
            setErro(mensagemDeErro(e))
            setConfirmando(false)
        }
    }

    if (carregando) return <p>Carregando chamado...</p>
    if (!chamado) 
        return <p className="erro">{erro || "Chamado não encontrado."}</p>

    return (
        <div className="detalhe">
            <Link to="/">← Voltar</Link>

            <h2>{chamado.titulo}</h2>
            <span className={`tag ${chamado.status.replace(" ", "-")}`}>{chamado.status}</span>
            <span className="tag">{chamado.prioridade}</span>

            <p><b>Descrição:</b> {chamado.descricao}</p>
            <p><b>Tipo:</b> {chamado.tipo}</p>
            <p><b>Local:</b> {chamado.local}</p>
            <p><b>Aberto em:</b> {formatarData(chamado.data_abertura)}</p>
            <p><b>Responsável:</b> {chamado.responsavel || "-"}</p>
            <p><b>Solução:</b> {chamado.solucao || "-"}</p>
            {chamado.status === "resolvido" && (
                <p><b>Resolvido em:</b> {formatarData(chamado.data_resolucao)}</p>
            )}

            {erro && <p className="erro">{erro}</p>}

            {/* Próxima etapa: só aparece a ação que vale para o status atual */}
            {chamado.status === "aberto" && (
                <div className="etapa">
                <h3>Iniciar atendimento</h3>
                <input
                    placeholder="Nome do responsável"
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                />
                <button onClick={iniciar}>Iniciar</button>
                </div>
            )}

            {chamado.status === "em andamento" && (
                <div className="etapa">
                <h3>Resolver chamado</h3>
                <input
                    placeholder="Descreva a solução"
                    value={solucao}
                    onChange={(e) => setSolucao(e.target.value)}
                />
                <button onClick={resolver}>Resolver</button>
                </div>
            )}

            <div className="acoes">
                {chamado.status !== "resolvido" && (
                <Link to={`/editar/${chamado.id}`} className="botao">Editar</Link>
                )}
                <button className="perigo" onClick={() => setConfirmando(true)}>Excluir</button>
            </div> 

            {confirmando && (
                <div className="confirmacao">
                <p>Tem certeza que deseja excluir este chamado?</p>
                <button className="perigo" onClick={excluir}>Excluir</button> {/* excluindo de verdade, quando Confirmando = true */}
                <button onClick={() => setConfirmando(false)}>Cancelar</button> 
                </div>
            )}
        </div>
    )
}

export default Detalhes