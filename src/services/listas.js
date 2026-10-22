import api from "./api"

export async function buscarListas() {
    const [tipos, locais, prioridades] = await Promise.all([ // três requisições simultaneas na api
        api.get("/tipos"),
        api.get("/locais"),
        api.get("/prioridades")
    ])

    return {
        tipos: tipos.data,
        locais: locais.data,
        prioridades: prioridades.data
    }
}