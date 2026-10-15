import { useEffect, useState } from "react"
import api from "./services/api"

function App() {
  const [dados, setDados] = useState(null)

  useEffect(() => {
    api.get("/eu").then(resposta => {
      setDados(resposta.data)
    })
  }, [])

  return (
    <div>
      <h1>TESTE DA API</h1>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
    </div>
  )
}

export default App