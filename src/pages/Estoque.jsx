import PageHeader from '../components/ui/PageHeader.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Field from '../components/ui/Field.jsx'
import Alert from '../components/ui/Alert.jsx'
import DataTable from '../components/ui/DataTable.jsx'
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
        <strong>{p.estoque}</strong> {p.atualizado && <Badge variant="success">Atualizado</Badge>}
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
    render: (m) => <Badge variant={m.tipo === 'Entrada' ? 'success' : 'warning'}>{m.tipo}</Badge>,
  },
  { key: 'quantidade', header: 'Qtd.', numeric: true },
  { key: 'descricao', header: 'Descrição' },
]

export default function Estoque() {
  // Por enquanto o formulário não faz nada: só impede o recarregamento da página.
  const handleSubmit = (event) => event.preventDefault()

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
            rows={produtosExibidos}
            getRowKey={(p) => p.codigo}
            highlightKey={102}
          />
        </Card>

        <Card title="Registrar movimentação" description="Informe os dados da entrada ou saída.">
          <form className="form" onSubmit={handleSubmit}>
            <Field id="mov-id" label="Identificador" hint="Número único, gerado automaticamente.">
              <input id="mov-id" value="MOV-0003" readOnly />
            </Field>
            <Field id="mov-produto" label="Produto">
              <select id="mov-produto" defaultValue="102">
                <option value="102">102 — Caderno Universitário</option>
              </select>
            </Field>
            <div className="form__row">
              <Field id="mov-tipo" label="Tipo">
                <select id="mov-tipo" defaultValue="saida">
                  <option value="saida">Saída</option>
                  <option value="entrada">Entrada</option>
                </select>
              </Field>
              <Field id="mov-qtd" label="Quantidade">
                <input id="mov-qtd" type="number" defaultValue={25} />
              </Field>
            </div>
            <Field
              id="mov-desc"
              label="Descrição da movimentação"
              hint="Identifica o tipo da movimentação realizada."
            >
              <input id="mov-desc" defaultValue="Venda no balcão" />
            </Field>
            <Button type="submit">Registrar movimentação</Button>
            <Alert>Movimentação MOV-0003 registrada. Estoque final de Caderno Universitário: 50 un.</Alert>
          </form>
        </Card>
      </div>

      <Card title="Histórico de movimentações" description="Da mais recente para a mais antiga.">
        <DataTable columns={colunasHistorico} rows={historicoExibido} getRowKey={(m) => m.id} />
      </Card>
    </>
  )
}
