import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import Button from '../basics/Button'
import Menu from '../menu/Menu'

const Header = () => {
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen } = generalContext

  const handleToggleVoiceAssistant = () => {
    setIsVoiceAssistantOpen(!isVoiceAssistantOpen)
  }

  return (
    <div className="flex justify-center items-center h-[186px]">
      <div className="flex justify-between w-[962px] items-center">
        <Menu />
        <Button
          variant="primary"
          onClick={() => handleToggleVoiceAssistant()}
          label="Call Jessica"
        />
      </div>
    </div>
  )
}

export default Header
