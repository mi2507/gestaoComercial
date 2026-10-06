import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Comissoes from './pages/Comissoes.jsx'
import Estoque from './pages/Estoque.jsx'
import Juros from './pages/Juros.jsx'

// Todas as rotas usam o mesmo Layout (sidebar + área principal).
// Cada página é renderizada dentro do <Outlet /> do Layout.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/comissoes" replace />} />
        <Route path="/comissoes" element={<Comissoes />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/juros" element={<Juros />} />
        <Route path="*" element={<Navigate to="/comissoes" replace />} />
      </Route>
    </Routes>
  )
}
