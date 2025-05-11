import { useEffect } from 'react'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import useWebSocket from 'react-use-websocket'

const VoiceAsistant = () => {
  const websocketUrl = process.env.REACT_APP_WEBSOCKET || 'ws://localhost:8080'

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(websocketUrl, {
      onOpen: () => console.log('opened'),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    })

  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const audio = document.createElement('audio')
    audio.src = url
    audio.controls = true
    document.body.appendChild(audio)
  }

  const convertToWav = (blob: Blob) => {
    // conversion needed due to cross-origin policy in v2, could be solved https://web.dev/articles/coop-coep
    return blob.type !== 'audio/wav' ? new Blob([blob], { type: 'audio/wav' }) : blob
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
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
    </div>
  )
}

export default VoiceAsistant
