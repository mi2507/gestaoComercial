import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Field from '../components/ui/Field.jsx'
import { resultadoJuros } from '../data/mocks.js'
import { calcularJuros } from '../services/jurosServices.js'
import { useState } from 'react'



export default function Juros() {
  const [valor, setValor] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [resultado, setResultado] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()

    const resultado = calcularJuros(valor, dataVencimento)
    console.log('valor:', valor)
    console.log('data:', dataVencimento)
    console.log('resultado:', resultado)
    setResultado(resultado)

  }

  return (
    <>
      <PageHeader
        title="Juros"
        description="Informe o valor e a data de vencimento para calcular os juros até hoje."
      />

      <div className="grid grid--juros">
        <Card title="Dados da cobrança">
          <form className="form" onSubmit={handleSubmit}>
            <Field id="juros-valor" label="Valor (R$)">
              <input
                id="juros-valor"
                inputMode="decimal"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </Field>
            <Field id="juros-venc" label="Data de vencimento">
              <input id="juros-venc" type="date" value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)} />
            </Field>
            <div className="hint">Multa de 2,5% ao dia de atraso, calculada até a data de hoje.</div>
            <Button type="submit">Calcular juros</Button>
          </form>
        </Card>

        <Card title="Resultado" aria-label="Resultado do cálculo" actions={<Badge variant="warning">Em atraso</Badge>}>
          <div className="highlight-result">
            <div className="k">Valor atualizado</div>
            <div className="v v--large">
              R$ {resultado ? resultado.valorAtualizado.toFixed(2) : '0,00'}
            </div>
          </div>
          <dl className="result-grid">
            {resultado && (
              <>
                <div className="result-grid__item">
                  <dt className="k">Valor original</dt>
                  <dd>R$ {resultado.valorOriginal.toFixed(2)}</dd>
                </div>
                <div className="result-grid__item">
                  <dt className="k">Dias em atraso</dt>
                  <dd>{resultado.diasAtraso} dias</dd>
                </div>
                <div className="result-grid__item">
                  <dt className="k">Percentual aplicado</dt>
                  <dd>{(resultado.percentualJuros * 100).toFixed(2)}%</dd>
                </div>
                <div className="result-grid__item">
                  <dt className="k">Valor dos juros</dt>
                  <dd>R$ {resultado.juros.toFixed(2)}</dd>
                </div>
                <div className="result-grid__item">
                  <dt className="k">Data de vencimento</dt>
                  <dd>{dataVencimento}</dd>
                </div>
                <div className="result-grid__item">
                  <dt className="k">Data do cálculo (hoje)</dt>
                  <dd>{new Date().toLocaleDateString('pt-BR')}</dd>
                </div>
              </>

            )}
          </dl>
        </Card>
      </div>
    </>
  )
}
