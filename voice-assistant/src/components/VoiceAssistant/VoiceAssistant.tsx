import { useAudioRecorder } from 'react-audio-voice-recorder'
import useVoiceAssistantWebsocket from './useVoiceAssistantWebsocket'
import { convertToWav } from './utils'
import Modal from '../basics/Modal'
import { useContext, useEffect, useRef, useState } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import IconButton from '../basics/IconButton'
import Feedback from './Feedback'
import VoiceAssistantHeader from './VoiceAssistantHeader'

type RecordingStatus = 'recording' | 'stopped' | 'playing' | 'paused'
type RecordingAction = 'start' | 'stop' | 'pause' | 'resume'

const VoiceAsistant = () => {
  const { sendMessage, lastMessage } = useVoiceAssistantWebsocket()
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('stopped')
  const generalContext = useContext(GeneralContext)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { setIsVoiceAssistantOpen, addRecording, recordings } = generalContext

  const recorderControls = useAudioRecorder()

  useEffect(() => {
    console.log('recordings', recordings)
  }, [recordings])

  const handleRecordingComplete = (blob: Blob | undefined) => {
    console.log('blob', blob)
    if (!blob) return
    const wavBlob = convertToWav(blob)
    addRecording(wavBlob, 'user')
    sendMessage(wavBlob)
  }

  const handleRecording = (recordingAction: RecordingAction) => {
    switch (recordingAction) {
      case 'start':
        recorderControls.startRecording()
        setRecordingStatus('recording')
        break
      case 'pause':
        recorderControls.togglePauseResume()
        setRecordingStatus('paused')
        break
      case 'resume':
        recorderControls.togglePauseResume()
        setRecordingStatus('recording')
        break
      case 'stop':
        recorderControls.stopRecording()
        setRecordingStatus('stopped')
        if (recordingStatus === 'recording') handleRecordingComplete(recorderControls.recordingBlob)
        break
      default:
        setRecordingStatus('stopped')
    }
  }

  useEffect(() => {
    console.log('blob', recorderControls.recordingBlob)
    if (recordingStatus === 'stopped' && recorderControls.recordingBlob) {
      const wavBlob = convertToWav(recorderControls.recordingBlob)
      addRecording(wavBlob, 'user')
      sendMessage(wavBlob)
    }
  }, [recorderControls.recordingBlob, recordingStatus, addRecording, sendMessage])

  const handleCloseVoiceAssistant = () => {
    console.log('close')
    setIsVoiceAssistantOpen(false)
    handleRecording('stop')
    audioRef.current?.pause()
  }

  useEffect(() => {
    console.log('lastMessage', lastMessage)
    if (!lastMessage) return
    addRecording(lastMessage.data, 'assistant')
    const blobUrl = URL.createObjectURL(lastMessage.data)
    // const audio = new Audio(blobUrl)
    audioRef.current = new Audio(blobUrl)
    audioRef.current
      .play()
      .then(() => {
        console.log('Audio playback started successfully')
      })
      .then(() => {
        console.log('Audio playback finished successfully')
      })
      .catch((error) => {
        console.error('Error playing audio:', error)
      })
  }, [lastMessage, addRecording])

  return (
    <Modal>
      <div className="flex flex-col justify-between bg-gradient-to-bl from-nude-neutral to-nude-light w-[280px] h-[280px]">
        <VoiceAssistantHeader
          handleClose={() => handleCloseVoiceAssistant()}
          showList={recordings.length > 0}
        />
        <div className="flex justify-center gap-4">
          {recordingStatus === 'stopped' && (
            <IconButton
              onClick={() => handleRecording('start')}
              variant="large"
              label="Začať hovor"
              iconName="Waveform"
            />
          )}
          {recordingStatus === 'paused' && (
            <IconButton
              onClick={() => handleRecording('resume')}
              variant="large"
              label="Pokračovať v hovore"
              iconName="Waveform"
            />
          )}
          {recordingStatus === 'recording' && (
            <IconButton
              onClick={() => handleRecording('pause')}
              variant="large"
              label="Zastaviť hovor"
              iconName={recordingStatus === 'recording' ? 'PauseIcon' : 'Waveform'}
            />
          )}
          {(recordingStatus === 'recording' || recordingStatus === 'paused') && (
            <IconButton
              onClick={() => handleRecording('stop')}
              variant="large"
              label="Ukončiť hovor"
              iconName="StopIcon"
            />
          )}
        </div>
        {/* <Player /> */}
        <Feedback />
      </div>
    </Modal>
  )
}

export default VoiceAsistant
