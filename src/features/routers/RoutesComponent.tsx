import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, NotFound, TodolistsPage } from 'features/pages'

type Props = {
  lightMode: boolean
  demo: boolean
}

export const RoutesComponent = ({ lightMode, demo }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<TodolistsPage demo={demo} lightMode={lightMode} />} />
      <Route path="/login" element={<LoginPage lightMode={lightMode} />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}
