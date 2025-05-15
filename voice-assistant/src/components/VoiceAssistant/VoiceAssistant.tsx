import { useAudioRecorder } from 'react-audio-voice-recorder'
import useVoiceAssistantWebsocket from './useVoiceAssistantWebsocket'
import { convertToWav } from './utils'
import Modal from '../basics/Modal'
import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import IconButton from '../basics/IconButton'

const VoiceAsistant = () => {
  const { sendMessage, lastMessage } = useVoiceAssistantWebsocket()
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { setIsVoiceAssistantOpen } = generalContext

  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const audio = document.createElement('audio')
    audio.src = url
    audio.controls = true
    document.body.appendChild(audio)
  }

  const handleRecordingComplete = (blob: Blob) => {
    const wavBlob = convertToWav(blob)
    addAudioElement(wavBlob)
    sendMessage(wavBlob)
  }

  const handleCloseVoiceAssistant = () => {
    setIsVoiceAssistantOpen(false)
  }
  // useEffect(() => {
  //   if (!lastMessage) return
  //   const audio = document.createElement('audio')
  //   const url = URL.createObjectURL(lastMessage.data)
  //   audio.src = url
  //   audio.controls = true
  //   document.body.appendChild(audio)
  //   audio.play()
  // }, [lastMessage])

  return (
    // <div>
    //   <AudioRecorder
    //     onRecordingComplete={(blob) => handleRecordingComplete(blob)}
    //     recorderControls={recorderControls}
    //   />
    //   <Player />
    //   <button onClick={recorderControls.stopRecording}>Stop recording</button>
    // </div>
    <Modal>
      <div className="bg-gradient-to-bl from-nude-neutral to-nude-light w-[280px] h-[280px]">
        <div className="flex h-[76px] p-[24px] justify-between items-center">
          <div className="font-normal text-[12px] tracking-[5%]">Calling Jessica</div>
          {/* <button
            onClick={() => handleCloseVoiceAssistant()}
            className="flex justify-center items-center gap-[10px] rounded-[100px] bg-[#EF7679] w-[28px] h-[28px]"
          >
            <Icon name="Call" size={12} className="border-white border-1 rotate-[-135]" />
          </button> */}
          <IconButton
            onClick={() => handleCloseVoiceAssistant()}
            variant="small"
            label="Ukončiť hovor"
            iconName="Call"
          />
        </div>
        <div className="pt-[39px] pl-[115px]">
          <IconButton
            onClick={() => console.log('recording')}
            variant="large"
            label="Začať hovor"
            iconName="Waveform"
          />
        </div>
      </div>
    </Modal>
  )
}

export default VoiceAsistant
