import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

const useVoiceAssistantWebsocket = (
  addRecording: Function,
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const websocketUrl = process.env.REACT_APP_WEBSOCKET || 'ws://localhost:8080'

  const { sendMessage, lastMessage } = useWebSocket(websocketUrl, {
    shouldReconnect: (closeEvent) => true,
  })

  useEffect(() => {
    if (!lastMessage || !lastMessage.data) return
    addRecording(lastMessage.data, 'assistant')
    const blobUrl = URL.createObjectURL(lastMessage.data)
    audioRef.current = new Audio(blobUrl)
    audioRef.current.play().catch((error) => {
      console.error('Error playing audio:', error)
    })
  }, [lastMessage, addRecording, audioRef])

  return { sendMessage, lastMessage, audioRef }
}

export default useVoiceAssistantWebsocket
