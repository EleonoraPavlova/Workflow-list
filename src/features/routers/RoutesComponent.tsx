import { TodolistsPage } from 'features/pages'
import { Login } from 'features/pages/Login'
import { NotFound } from 'features/pages/NotFound'
import { Navigate, Route, Routes } from 'react-router-dom'

type Props = {
  lightMode: boolean
}

export const RoutesComponent = ({ lightMode }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<TodolistsPage lightMode={lightMode} />} />
      <Route path="/login" element={<Login lightMode={lightMode} />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}
