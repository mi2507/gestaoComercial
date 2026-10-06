export default function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="k">{label}</div>
      <div className="v">{value}</div>
    </div>
  )
}
