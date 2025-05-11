import VoiceAsistant from '../VoiceAssistant/VoiceAssistant'
import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import Header from './Header'
import Footer from './Footer'
import MenuRoutes from '../menu/MenuRoutes'

const Layout = () => {
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { isVoiceAssistantOpen } = generalContext

  return (
    <>
      <Header />
      {isVoiceAssistantOpen ? <VoiceAsistant /> : null}
      <MenuRoutes />
      <Footer />
    </>
  )
}

export default Layout
