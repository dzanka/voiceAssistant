import { Button } from '@mui/material'
import VoiceAsistant from './VoiceAssistant/VoiceAssistant'
import { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext'

const Layout = () => {
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen } = generalContext

  const handleOpenVoiceAssistant = () => {
    setIsVoiceAssistantOpen(true)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpenVoiceAssistant()}>
        Call Jessica
      </Button>
      {isVoiceAssistantOpen ? <VoiceAsistant /> : null}
    </div>
  )
}

export default Layout
