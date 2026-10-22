export function mensagemDeErro(erro) {
    const detail = erro.response?.data?.detail
    if (typeof detail === "string") return detail
    if (Array.isArray(detail)) return detail.map((d) => d.msg).join(". ")
    if (erro.response?.status === 401) return "Chave inválida. Verifique seu .env."
    return "Não foi possível conectar à API."
}

export function formatarData(data) {
    if (!data) return "-"
    return data.split("-").reverse().join("/")
}