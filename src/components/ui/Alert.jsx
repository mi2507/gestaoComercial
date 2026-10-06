export default function Alert({ children }) {
  return (
    <div role="status" className="alert alert--success">
      {children}
    </div>
  )
}
