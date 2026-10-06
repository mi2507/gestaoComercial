export function movimentarEstoque(estoqueAtual, tipo, quantidade) {
  if (tipo === 'entrada') {
    return estoqueAtual + quantidade
  }

  if (tipo === 'saida') {
    return estoqueAtual - quantidade
  }
}