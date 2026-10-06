// Tabela genérica.
// columns: [{ key, header, numeric?, render?(row) }]
// getRowKey(row): chave única da linha | highlightKey: linha destacada
// footer: { [key]: conteúdo } para a linha de total
export default function DataTable({ columns, rows, getRowKey, highlightKey, footer }) {
  const cellClass = (col) => (col.numeric ? 'num' : undefined)

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cellClass(col)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = getRowKey(row)
            return (
              <tr key={key} className={key === highlightKey ? 'is-highlighted' : undefined}>
                {columns.map((col) => (
                  <td key={col.key} className={cellClass(col)}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
        {footer && (
          <tfoot>
            <tr>
              {columns.map((col) => (
                <td key={col.key} className={cellClass(col)}>
                  {footer[col.key]}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
