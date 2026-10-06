import { NavLink } from 'react-router-dom'

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const links = [
  {
    to: '/comissoes',
    label: 'Comissões',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 15l6-6M9.5 9.5h.01M14.5 14.5h.01" />
      </svg>
    ),
  },
  {
    to: '/estoque',
    label: 'Estoque',
    icon: (
      <svg {...iconProps}>
        <path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />
      </svg>
    ),
  },
  {
    to: '/juros',
    label: 'Juros',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  return (
    <aside className="side">
      <div className="brand">
        <span className="logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 20V10M12 20V4M20 20v-7" />
          </svg>
        </span>
        Gestão Comercial
      </div>

      <nav className="nav" aria-label="Módulos">
        {/* NavLink adiciona a classe "active" e aria-current="page" na rota atual */}
        {links.map(({ to, label, icon }) => (
          <NavLink key={to} to={to}>
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
