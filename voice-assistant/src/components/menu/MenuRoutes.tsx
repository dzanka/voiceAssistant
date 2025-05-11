import { Route, Routes } from 'react-router-dom'
import Main from '../Layout/Main'

const MenuRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/home" element={<Main />} />
    <Route path="/products" element={<Main />} />
    <Route path="/organization" element={<Main />} />
    <Route path="/account" element={<Main />} />
    <Route path="/help" element={<Main />} />
  </Routes>
)

export default MenuRoutes
