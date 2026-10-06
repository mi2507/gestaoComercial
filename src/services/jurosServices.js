const TAXA_DIARIA = 0.025

export function calcularJuros(valor, dataVencimento) {
    const valorNumerico = Number(
        valor.replace(/\./g, '').replace(',', '.')
    )
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const [ano, mes, dia] = dataVencimento.split('-')
    const vencimento = new Date(ano, mes - 1, dia)

    if (vencimento >= hoje) {
        return {
            valorOriginal: valorNumerico,
            diasAtraso: 0,
            percentualJuros: 0,
            juros: 0,
            valorAtualizado: valorNumerico
        }
    }

    let diferenca = hoje - vencimento
    let diasAtraso = diferenca / 86400000
    let totalJuros = diasAtraso * TAXA_DIARIA
    let juros = valorNumerico * totalJuros

    return {
        valorOriginal: valorNumerico,
        diasAtraso,
        percentualJuros: totalJuros,
        juros,
        valorAtualizado: valorNumerico + juros
    }
}
