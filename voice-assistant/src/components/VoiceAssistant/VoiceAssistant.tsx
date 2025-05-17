import useVoiceAssistantWebsocket from './hooks/useVoiceAssistantWebsocket'
import { convertToWav } from './utils'
import Modal from '../basics/Modal'
import { useContext, useRef } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import Feedback from './Feedback'
import useRecordingControls from './hooks/useRecordingControls'
import VoiceAssistantHeader from './VoiceAssistantHeader'
import RecordingButtons from './RecordingButtons'
import useProcessRecordingBlob from './hooks/useProcessRecordingBlob'

const VoiceAsistant = () => {
  const generalContext = useContext(GeneralContext)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleRecordingComplete = (blob: Blob | undefined) => {
    console.log('blob', blob)
    if (!blob) return
    const wavBlob = convertToWav(blob)
    addRecording(wavBlob, 'user')
    sendMessage(wavBlob)
  }

  const { recordingStatus, handleRecording, recordingBlob } =
    useRecordingControls(handleRecordingComplete)

  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { setIsVoiceAssistantOpen, addRecording, recordings } = generalContext
  const { sendMessage } = useVoiceAssistantWebsocket(addRecording, audioRef)

  useProcessRecordingBlob(recordingBlob, recordingStatus, addRecording, sendMessage)

  const handleCloseVoiceAssistant = () => {
    console.log('close')
    setIsVoiceAssistantOpen(false)
    handleRecording('stop')
    audioRef.current?.pause()
  }

  return (
    <Modal>
      <div className="flex flex-col justify-between bg-gradient-to-bl from-nude-neutral to-nude-light w-[280px] h-[280px]">
        <VoiceAssistantHeader
          handleClose={() => handleCloseVoiceAssistant()}
          showList={recordings.length > 0}
        />
        <RecordingButtons handleRecording={handleRecording} recordingStatus={recordingStatus} />
        <Feedback />
      </div>
    </Modal>
  )
}

export default VoiceAsistant
