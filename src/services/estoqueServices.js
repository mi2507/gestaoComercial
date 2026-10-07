export function movimentarEstoque(estoqueAtual, tipo, quantidade) {
  if (tipo === 'entrada') {
    return estoqueAtual + quantidade
  }

  if (tipo === 'saida' && quantidade > estoqueAtual) {
    return estoqueAtual
  }

  if (tipo === 'saida') {
    return estoqueAtual - quantidade
  }

  throw new Error('Tipo de movimentação inválido')
}