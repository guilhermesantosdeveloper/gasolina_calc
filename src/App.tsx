import './App.css'
import logoImg from './assets/logo.png'
import { useState, FormEvent } from 'react'

interface InfoProps{
  title: string,
  gasolina: string | number,
  alcool: string | number
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(1)
  const [alcoolInput, setAlcoolInput] = useState(1)
  const [result, setResult] = useState<InfoProps>()


  function calcular(event: FormEvent) {
    // previnindo f5 
    event.preventDefault()

    const calculo = (alcoolInput / gasolinaInput)

    if (calculo <= 0.7) {
      setResult({
        title: 'Compensa usar Alcool',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    } else {
      setResult({
        title: 'Compensa usar Gasolina',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }

  }

  function formatarMoeda(valor:number){
    const valorFormatado = valor.toLocaleString('pt-br', {
      style:"currency",
      currency: "BRL"
    })

    return valorFormatado
  }

  return (
    <div>
      <main className='container'>
        <img src={logoImg} alt="Logo da calculadora de gasolina ou alcool" className='logo' />
        <h1 className='title'>Qual melhor opção?</h1>
        <form className='form' onSubmit={calcular}>
          <label>Álcool(preço por litro):</label>
          <input type="number" className='input' placeholder='4,90' min={1} step={0.01} required value={alcoolInput} onChange={(e) => setAlcoolInput(Number(e.target.value))} />

          <label>Gasolina(preço por litro):</label>
          <input type="number" className='input' placeholder='4,90' min={1} step={0.01} required value={gasolinaInput} onChange={(e) => setGasolinaInput(Number(e.target.value))} />

          <input type="submit" value="Calcular" className='button' />
        </form>

        {/* renderização condicional */}
        {result && Object.keys(result).length > 0 && (
          <section className='result'>
          <h2 className='result-title'>{result?.title}</h2>
          <span>Álcool {result?.alcool}</span>
          <span>Gasolina {result?.gasolina}</span>
        </section>
        )}
      </main>
    </div>

  )
}

export default App
