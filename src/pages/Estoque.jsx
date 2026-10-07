import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Field from '../components/ui/Field.jsx'
import Alert from '../components/ui/Alert.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { movimentarEstoque } from '../services/estoqueServices.js'
import { useState } from 'react'
import { produtosExibidos, historicoExibido } from '../data/mocks.js'

const colunasEstoque = [
  { key: 'codigo', header: 'Código' },
  { key: 'descricao', header: 'Descrição' },
  {
    key: 'estoque',
    header: 'Estoque',
    numeric: true,
    render: (p) => (
      <>
        <strong>{p.estoque}</strong>{' '}
        {p.atualizado && <Badge variant="success">Atualizado</Badge>}
      </>
    ),
  },
]

const colunasHistorico = [
  { key: 'id', header: 'ID' },
  { key: 'produto', header: 'Produto' },
  {
    key: 'tipo',
    header: 'Tipo',
    render: (m) => (
      <Badge variant={m.tipo === 'Entrada' ? 'success' : 'warning'}>
        {m.tipo}
      </Badge>
    ),
  },
  { key: 'quantidade', header: 'Qtd.', numeric: true },
  { key: 'descricao', header: 'Descrição' },
]

export default function Estoque() {
  const [produto, setProduto] = useState('102')
  const [tipo, setTipo] = useState('saida')
  const [quantidade, setQuantidade] = useState(0)
  const [descricao, setDescricao] = useState('')
  const [estoqueFinal, setEstoqueFinal] = useState(null)  
  const [produtos, setProdutos] = useState(() => {
    const estoqueSalvo = localStorage.getItem('estoque-produtos')

    if (estoqueSalvo) {
      return JSON.parse(estoqueSalvo)
    }

    return produtosExibidos
  })
  const [historico, setHistorico] = useState(() => {
    const historicoSalvo = localStorage.getItem('estoque-historico')

    if (historicoSalvo) {
      return JSON.parse(historicoSalvo)
    }

    return historicoExibido
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const novoId = `MOV-${String(historico.length + 1).padStart(4, '0')}`

    console.log('Produto:', produto)
    console.log('Tipo:', tipo)
    console.log('Quantidade:', quantidade)
    console.log('Descrição:', descricao)

    const produtoSelecionado = produtos.find(
      (item) => item.codigo === Number(produto)
    )

    if (!produtoSelecionado) {
      return
    }

    const novoEstoque = movimentarEstoque(
      produtoSelecionado.estoque,
      tipo,
      quantidade
    )

    setEstoqueFinal(novoEstoque)

    const produtosAtualizados = produtos.map((item) =>
      item.codigo === Number(produto)
        ? { ...item, estoque: novoEstoque, atualizado: true }
        : item
    )

    setProdutos(produtosAtualizados)
    localStorage.setItem(
      'estoque-produtos',
      JSON.stringify(produtosAtualizados)
    )
    
    const historicoAtualizado = [

      {
        id: novoId,
        produto: produtoSelecionado.descricao,
        tipo: tipo === 'entrada' ? 'Entrada' : 'Saída',
        quantidade: quantidade,
        descricao: descricao,
      },
      ...historico,
    ]

    setHistorico(historicoAtualizado)

    localStorage.setItem(
      'estoque-historico',
      JSON.stringify(historicoAtualizado),
      setIdMovimentacao(`MOV-${Date.now()}`)
    )
  }

  return (
    <>
      <PageHeader
        title="Estoque"
        description="Lance entradas e saídas de mercadoria no depósito e acompanhe o saldo de cada produto."
      />

      <div className="grid grid--estoque">
        <Card title="Estoque atual" description="Saldo por produto.">
          <DataTable
            columns={colunasEstoque}
            rows={produtos}
            getRowKey={(p) => p.codigo}
            highlightKey={102}
          />
        </Card>

        <Card
          title="Registrar movimentação"
          description="Informe os dados da entrada ou saída."
        >
          <form className="form" onSubmit={handleSubmit}>
            

            <Field id="mov-produto" label="Produto">
              <select
                id="mov-produto"
                value={produto}
                onChange={(event) => setProduto(event.target.value)}
              >
                <option value="102">102 — Caderno Universitário</option>
                <option value="101">101 — Caneta Azul</option>
                <option value="103">103 — Borracha Branca</option>
                <option value="104">104 — Lápis Preto HB</option>
                <option value="105">105 — Marcador de Texto Amarelo</option>
              </select>
            </Field>

            <div className="form__row estoque-form-row">
              <Field id="mov-tipo" label="Tipo">
                <select
                  id="mov-tipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                >
                  <option value="saida">Saída</option>
                  <option value="entrada">Entrada</option>
                </select>
              </Field>

              <Field id="mov-qtd" label="Quantidade">
                <input
                  id="mov-qtd"
                  type="number"
                  value={quantidade}
                  onChange={(event) =>
                    setQuantidade(Number(event.target.value))
                  }
                />
              </Field>
            </div>

            <Field
              id="mov-desc"
              label="Descrição da movimentação"
              hint="Identifica o tipo da movimentação realizada."
            >
              <input
                id="mov-desc"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                placeholder="Ex.: Venda no balcão"
              />
            </Field>

            <Button type="submit">Registrar movimentação</Button>

            <Alert>
              Estoque final: {estoqueFinal}
            </Alert>
          </form>
        </Card>
      </div>

      <Card
        title="Histórico de movimentações"
        description="Da mais recente para a mais antiga."
      >
        <DataTable
          columns={colunasHistorico}
          rows={historico}
          getRowKey={(m) => m.id}
        />
      </Card>
    </>
  )
}