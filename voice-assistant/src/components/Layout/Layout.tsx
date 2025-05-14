import VoiceAsistant from '../VoiceAssistant/VoiceAssistant'
import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import Header from './Header'
import Footer from './Footer/Footer'
import MenuRoutes from '../menu/MenuRoutes'

const Layout = () => {
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { isVoiceAssistantOpen } = generalContext

  return (
    <div className="flex flex-col gap-[25px] pb-[10px]">
      <Header />
      {isVoiceAssistantOpen ? <VoiceAsistant /> : null}
      <MenuRoutes />
      <Footer />
    </div>
  )
}

export default Layout
