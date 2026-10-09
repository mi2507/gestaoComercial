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
        {p.atualizado && (
          <Badge variant="success">Atualizado</Badge>
        )}
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
    return estoqueSalvo ? JSON.parse(estoqueSalvo) : produtosExibidos
  })

  const [historico, setHistorico] = useState(() => {
    const historicoSalvo = localStorage.getItem('estoque-historico')
    return historicoSalvo ? JSON.parse(historicoSalvo) : historicoExibido
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      alert('Informe uma quantidade maior que zero.')
      return
    }

    if (!descricao.trim()) {
      alert('Informe a descrição da movimentação.')
      return
    }

    const produtoSelecionado = produtos.find(
      (item) => item.codigo === Number(produto)
    )

    if (!produtoSelecionado) {
      return
    }

    if (tipo === 'saida' && quantidade > produtoSelecionado.estoque) {
      alert('A quantidade de saída não pode ser maior que o estoque disponível.')
      return
    }

    const novoEstoque = movimentarEstoque(
      produtoSelecionado.estoque,
      tipo,
      quantidade
    )

    const produtosAtualizados = produtos.map((item) =>
      item.codigo === Number(produto)
        ? { ...item, estoque: novoEstoque, atualizado: true }
        : item
    )

    const maiorNumeroId = historico.reduce((maior, movimento) => {
      const numero = Number(movimento.id?.replace('MOV-', '')) || 0
      return Math.max(maior, numero)
    }, 0)

    const novoId = `MOV-${String(maiorNumeroId + 1).padStart(4, '0')}`

    const historicoAtualizado = [
      {
        id: novoId,
        produto: produtoSelecionado.descricao,
        tipo: tipo === 'entrada' ? 'Entrada' : 'Saída',
        quantidade,
        descricao: descricao.trim(),
      },
      ...historico,
    ]

    setEstoqueFinal(novoEstoque)
    setProdutos(produtosAtualizados)
    setHistorico(historicoAtualizado)

    localStorage.setItem(
      'estoque-produtos',
      JSON.stringify(produtosAtualizados)
    )

    localStorage.setItem(
      'estoque-historico',
      JSON.stringify(historicoAtualizado)
    )

    setDescricao('')
    setQuantidade(0)
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
                  min="1"
                  step="1"
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

            {estoqueFinal !== null && (
              <Alert>Estoque final: {estoqueFinal}</Alert>
            )}
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
