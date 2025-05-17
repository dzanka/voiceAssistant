import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import Header from './Header'
import Footer from './Footer/Footer'
import MenuRoutes from '../Menu/MenuRoutes'
import VoiceAsistant from '../VoiceAssistant/VoiceAssistant'
import Main from './Main'

const Layout = () => {
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { isVoiceAssistantOpen } = generalContext

  return (
    <div className="flex flex-col gap-[25px] pb-[10px]">
      <Header />
      <Main>
        <MenuRoutes />
      </Main>
      <Footer />

      {isVoiceAssistantOpen ? <VoiceAsistant /> : null}
    </div>
  )
}

export default Layout
