import PageHeader from '../components/ui/PageHeader.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { vendas } from '../data/vendas.js'
import { useState } from 'react'
import {
  calcularComissao,
  formatarMoeda,
} from '../services/comissoesServices.js'

const colunasResumo = (vendedorSelecionado, setVendedorSelecionado) => [
  {
    key: 'vendedor',
    header: 'Vendedor',
    render: (r) => <strong>{r.vendedor}</strong>,
  },
  {
    key: 'quantidade',
    header: 'Vendas',
    numeric: true,
  },
  {
    key: 'total',
    header: 'Total vendido',
    numeric: true,
  },
  {
    key: 'comissao',
    header: 'Comissão',
    numeric: true,
    render: (r) => <strong>{r.comissao}</strong>,
  },
  {
    key: 'acoes',
    header: <span className="sr-only">Ações</span>,
    numeric: true,
    render: (r) =>
      r.vendedor === vendedorSelecionado ? (
        <Button
          variant="secondary"
          aria-pressed="true"
          onClick={() => setVendedorSelecionado(null)}
        >
          Ocultar detalhes
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={() => setVendedorSelecionado(r.vendedor)}
        >
          Ver detalhes
        </Button>
      ),
  },
]

const colunasDetalhe = [
  {
    key: 'venda',
    header: 'Venda',
  },
  {
    key: 'valor',
    header: 'Valor',
    numeric: true,
  },
  {
    key: 'faixa',
    header: 'Faixa',
    render: (r) => (
      <Badge variant={r.variante}>
        {r.faixa}
      </Badge>
    ),
  },
  {
    key: 'comissao',
    header: 'Comissão',
    numeric: true,
  },
]

const resumoCalculado = Object.values(
  vendas.reduce((acumulado, venda) => {
    if (!acumulado[venda.vendedor]) {
      acumulado[venda.vendedor] = {
        vendedor: venda.vendedor,
        quantidade: 0,
        total: 0,
        comissao: 0,
      }
    }

    const resultado = calcularComissao(venda.valor)

    acumulado[venda.vendedor].quantidade += 1
    acumulado[venda.vendedor].total += venda.valor
    acumulado[venda.vendedor].comissao += resultado.valor

    return acumulado
  }, {})
).map((vendedor) => ({
  vendedor: vendedor.vendedor,
  quantidade: vendedor.quantidade,
  total: formatarMoeda(vendedor.total),
  comissao: formatarMoeda(vendedor.comissao),
}))

export default function Comissoes() {
  const [vendedorSelecionado, setVendedorSelecionado] =
    useState('Maria Souza')

  const vendasSelecionadas = vendedorSelecionado
    ? vendas.filter(
        (venda) => venda.vendedor === vendedorSelecionado
      )
    : []

  const totalVendidoSelecionado = vendasSelecionadas.reduce(
    (total, venda) => total + venda.valor,
    0
  )

  const totalComissaoSelecionado = vendasSelecionadas.reduce(
    (total, venda) =>
      total + calcularComissao(venda.valor).valor,
    0
  )

  const detalheSelecionado = vendasSelecionadas.map(
    (venda, index) => {
      const resultado = calcularComissao(venda.valor)

      return {
        venda: `Venda ${index + 1}`,
        valor: venda.valor,
        faixa: resultado.faixa,
        variante: resultado.variante,
        comissao: formatarMoeda(resultado.valor),
      }
    }
  )

  return (
    <>
      <PageHeader
        title="Comissões"
        description="Comissão de cada vendedor, calculada venda a venda a partir do arquivo de vendas."
      />

      <div className="grid grid--stats">
        <StatCard
          label="Total vendido"
          value="R$ 37.321,30"
        />

        <StatCard
          label="Total de comissões"
          value="R$ 1.746,02"
        />

        <StatCard
          label="Vendas registradas"
          value="36"
        />
      </div>

      <Card
        title="Resumo por vendedor"
        description="Selecione um vendedor para ver o detalhamento."
        actions={
          <div className="badges">
            <Badge variant="neutral">
              Abaixo de R$ 100: 0%
            </Badge>

            <Badge variant="warning">
              Abaixo de R$ 500: 1%
            </Badge>

            <Badge variant="success">
              A partir de R$ 500: 5%
            </Badge>
          </div>
        }
      >
        <DataTable
          columns={colunasResumo(
            vendedorSelecionado,
            setVendedorSelecionado
          )}
          rows={resumoCalculado}
          getRowKey={(r) => r.vendedor}
          highlightKey={vendedorSelecionado}
        />
      </Card>

      {vendedorSelecionado && (
        <Card
          title={`Detalhamento — ${vendedorSelecionado}`}
          description="Cada venda com a faixa de comissão aplicada."
        >
          <DataTable
            columns={colunasDetalhe}
            rows={detalheSelecionado}
            getRowKey={(r) => r.venda}
            footer={{
              venda: 'Total',
              valor: formatarMoeda(
                totalVendidoSelecionado
              ),
              comissao: formatarMoeda(
                totalComissaoSelecionado
              ),
            }}
          />
        </Card>
      )}
    </>
  )
}