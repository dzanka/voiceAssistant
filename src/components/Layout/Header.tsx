import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import Button from '../basics/Button'
import Menu from '../Menu/Menu'

const Header = () => {
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen, setRecordings } = generalContext

  const handleOpenVoiceAssistant = () => {
    setIsVoiceAssistantOpen(!isVoiceAssistantOpen)
    setRecordings([])
  }

  return (
    <div className="flex justify-center items-center h-[186px]">
      <div className="flex justify-between w-[962px] items-center">
        <Menu />
        <Button variant="primary" onClick={() => handleOpenVoiceAssistant()} label="Call Jessica" />
      </div>
    </div>
  )
}

export default Header
