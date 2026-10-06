// Junta label + controle (input/select) + dica opcional.
// O controle é passado como children e deve usar o mesmo "id".
export default function Field({ id, label, hint, children }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <div className="hint">{hint}</div>}
    </div>
  )
}
