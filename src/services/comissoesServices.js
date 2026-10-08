export function calcularComissao(valor) {
  if (valor < 100) {
    return {
      percentual: 0,
      valor: 0,
      faixa: '0%',
      variante: 'neutral',
    }
  }

  if (valor < 500) {
    return {
      percentual: 0.01,
      valor: valor * 0.01,
      faixa: '1%',
      variante: 'warning',
    }
  }

  return {
    percentual: 0.05,
    valor: valor * 0.05,
    faixa: '5%',
    variante: 'success',
  }
}

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}