import PageHeader from '../components/ui/PageHeader.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import { resumoVendedores, detalheMaria } from '../data/mocks.js'

const colunasResumo = [
  { key: 'vendedor', header: 'Vendedor', render: (r) => <strong>{r.vendedor}</strong> },
  { key: 'quantidade', header: 'Vendas', numeric: true },
  { key: 'total', header: 'Total vendido', numeric: true },
  { key: 'comissao', header: 'Comissão', numeric: true, render: (r) => <strong>{r.comissao}</strong> },
  {
    key: 'acoes',
    header: <span className="sr-only">Ações</span>,
    numeric: true,
    render: (r) =>
      r.vendedor === 'Maria Souza' ? (
        <Button variant="secondary" aria-pressed="true">Ocultar detalhes</Button>
      ) : (
        <Button variant="secondary">Ver detalhes</Button>
      ),
  },
]

const colunasDetalhe = [
  { key: 'venda', header: 'Venda' },
  { key: 'valor', header: 'Valor', numeric: true },
  { key: 'faixa', header: 'Faixa', render: (r) => <Badge variant={r.variante}>{r.faixa}</Badge> },
  { key: 'comissao', header: 'Comissão', numeric: true },
]

export default function Comissoes() {
  return (
    <>
      <PageHeader
        title="Comissões"
        description="Comissão de cada vendedor, calculada venda a venda a partir do arquivo de vendas."
      />

      <div className="grid grid--stats">
        <StatCard label="Total vendido" value="R$ 37.321,30" />
        <StatCard label="Total de comissões" value="R$ 1.746,02" />
        <StatCard label="Vendas registradas" value="36" />
      </div>

      <Card
        title="Resumo por vendedor"
        description="Selecione um vendedor para ver o detalhamento."
        actions={
          <div className="badges">
            <Badge variant="neutral">Abaixo de R$ 100: 0%</Badge>
            <Badge variant="warning">Abaixo de R$ 500: 1%</Badge>
            <Badge variant="success">A partir de R$ 500: 5%</Badge>
          </div>
        }
      >
        <DataTable
          columns={colunasResumo}
          rows={resumoVendedores}
          getRowKey={(r) => r.vendedor}
          highlightKey="Maria Souza"
        />
      </Card>

      <Card
        title="Detalhamento — Maria Souza"
        description="Cada venda com a faixa de comissão aplicada."
      >
        <DataTable
          columns={colunasDetalhe}
          rows={detalheMaria}
          getRowKey={(r) => r.venda}
          footer={{ venda: 'Total', valor: 'R$ 9.874,30', comissao: 'R$ 465,96' }}
        />
      </Card>
    </>
  )
}
