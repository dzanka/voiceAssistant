import { Route, Routes } from 'react-router-dom'
import Template from '../pages/Template'
import RecordingsList from '../pages/RecordingsList'

const MenuRoutes = () => (
  <Routes>
    <Route path="/" element={<Template />} />
    <Route path="/home" element={<Template />} />
    <Route path="/products" element={<Template />} />
    <Route path="/organization" element={<Template />} />
    <Route path="/account" element={<Template />} />
    <Route path="/help" element={<Template />} />
    <Route path="/recordings-list" element={<RecordingsList />} />
  </Routes>
)

export default MenuRoutes
