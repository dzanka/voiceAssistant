import { useNavigate } from 'react-router-dom'
import IconButton from '../basics/IconButton'

type VoiceAssistantHeaderProps = {
  handleClose: () => void
  showList: boolean
}

const VoiceAssistantHeader = ({ handleClose, showList }: VoiceAssistantHeaderProps) => {
  const navigate = useNavigate()

  const handleShowList = () => {
    handleClose()
    navigate('/recordings-list')
  }

  return (
    <div className="flex h-[76px] p-[24px] justify-between items-center">
      <div className="font-normal text-[12px] tracking-[5%]">Calling Jessica</div>
      <div className="flex jusitfy-end items-center gap-[10px]">
        {showList && (
          <IconButton
            onClick={handleShowList}
            variant="small"
            label="Zobraziť zoznam"
            iconName="HeadsetIcon"
          />
        )}
        <IconButton
          onClick={handleClose}
          variant="small"
          label="Ukončiť asistenta"
          iconName="Call"
          bgColor="bg-red"
        />
      </div>
    </div>
  )
}

export default VoiceAssistantHeader
