// Container branco com borda. "title", "description" e "actions" são opcionais.
export default function Card({ title, description, actions, children, ...rest }) {
  return (
    <section className="card" {...rest}>
      {(title || actions) && (
        <div className="card__header">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p className="sub sub--small">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}
