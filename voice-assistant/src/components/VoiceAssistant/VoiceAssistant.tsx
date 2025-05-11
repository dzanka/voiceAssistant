import { useEffect } from 'react'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import Player from '../basics/Player'
import useVoiceAssistantWebsocket from './useVoiceAssistantWebsocket'
import { convertToWav } from './utils'

const VoiceAsistant = () => {
  // const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } =
  //   useWebSocket(websocketUrl, {
  //     onOpen: () => console.log('opened'),
  //     //Will attempt to reconnect on all close events, such as server shutting down
  //     shouldReconnect: (closeEvent) => true,
  //   })
  const { sendMessage, lastMessage } = useVoiceAssistantWebsocket()

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

  useEffect(() => {
    if (!lastMessage) return
    console.log('received message', lastMessage)
    const audio = document.createElement('audio')
    const url = URL.createObjectURL(lastMessage.data)
    audio.src = url
    audio.controls = true
    document.body.appendChild(audio)
    audio.play()
  }, [lastMessage])

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => handleRecordingComplete(blob)}
        recorderControls={recorderControls}
      />
      <Player />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
    </div>
  )
}

export default VoiceAsistant
