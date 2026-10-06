// ATENÇÃO: valores PRÉ-FORMATADOS e FIXOS, só para mostrar o visual aprovado.
// Nada aqui é calculado. Cada bloco será removido quando a regra real for
// implementada (comissões, estoque e juros).

// --- Comissões ---
export const resumoVendedores = [
  { vendedor: 'João Silva', quantidade: 10, total: 'R$ 10.754,70', comissao: 'R$ 495,69' },
  { vendedor: 'Maria Souza', quantidade: 9, total: 'R$ 9.874,30', comissao: 'R$ 465,96' },
  { vendedor: 'Carlos Oliveira', quantidade: 8, total: 'R$ 7.928,35', comissao: 'R$ 379,38' },
  { vendedor: 'Ana Lima', quantidade: 9, total: 'R$ 8.763,95', comissao: 'R$ 404,99' },
]

export const detalheMaria = [
  { venda: 'Venda 1', valor: 'R$ 2.100,40', faixa: '5%', variante: 'success', comissao: 'R$ 105,02' },
  { venda: 'Venda 2', valor: 'R$ 1.350,60', faixa: '5%', variante: 'success', comissao: 'R$ 67,53' },
  { venda: 'Venda 3', valor: 'R$ 950,20', faixa: '5%', variante: 'success', comissao: 'R$ 47,51' },
  { venda: 'Venda 4', valor: 'R$ 1.600,75', faixa: '5%', variante: 'success', comissao: 'R$ 80,04' },
  { venda: 'Venda 5', valor: 'R$ 1.750,00', faixa: '5%', variante: 'success', comissao: 'R$ 87,50' },
  { venda: 'Venda 6', valor: 'R$ 1.450,90', faixa: '5%', variante: 'success', comissao: 'R$ 72,55' },
  { venda: 'Venda 7', valor: 'R$ 400,50', faixa: '1%', variante: 'warning', comissao: 'R$ 4,01' },
  { venda: 'Venda 8', valor: 'R$ 180,20', faixa: '1%', variante: 'warning', comissao: 'R$ 1,80' },
  { venda: 'Venda 9', valor: 'R$ 90,75', faixa: '0%', variante: 'neutral', comissao: 'R$ 0,00' },
]

// --- Estoque (estado de exemplo após a movimentação MOV-0003) ---
export const produtosExibidos = [
  { codigo: 101, descricao: 'Caneta Azul', estoque: 200 },
  { codigo: 102, descricao: 'Caderno Universitário', estoque: 50, atualizado: true },
  { codigo: 103, descricao: 'Borracha Branca', estoque: 170 },
  { codigo: 104, descricao: 'Lápis Preto HB', estoque: 320 },
  { codigo: 105, descricao: 'Marcador de Texto Amarelo', estoque: 90 },
]

export const historicoExibido = [
  { id: 'MOV-0003', produto: '102 — Caderno Universitário', tipo: 'Saída', quantidade: 25, descricao: 'Venda no balcão' },
  { id: 'MOV-0002', produto: '103 — Borracha Branca', tipo: 'Saída', quantidade: 30, descricao: 'Venda para escola' },
  { id: 'MOV-0001', produto: '101 — Caneta Azul', tipo: 'Entrada', quantidade: 50, descricao: 'Reposição do fornecedor' },
]

// --- Juros ---
export const resultadoJuros = [
  { label: 'Valor original', value: 'R$ 1.000,00' },
  { label: 'Data de vencimento', value: '25/09/2026' },
  { label: 'Dias em atraso', value: '10 dias' },
  { label: 'Percentual aplicado', value: '25%' },
  { label: 'Valor dos juros', value: 'R$ 250,00' },
  { label: 'Data do cálculo (hoje)', value: '05/10/2026' },
]
