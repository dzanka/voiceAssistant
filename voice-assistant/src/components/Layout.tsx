import { Button } from '@mui/material'
import VoiceAsistant from './VoiceAssistant/VoiceAssistant'
import { useState } from 'react'

const Layout = () => {
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false)

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
