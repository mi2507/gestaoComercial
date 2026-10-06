export default function PageHeader({ title, description }) {
  return (
    <header>
      <h1>{title}</h1>
      <p className="sub">{description}</p>
    </header>
  )
}
