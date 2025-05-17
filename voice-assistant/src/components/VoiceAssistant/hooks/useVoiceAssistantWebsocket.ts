// import useWebSocket from 'react-use-websocket'

// const useVoiceAssistantWebsocket = () => {
//   const websocketUrl = process.env.REACT_APP_WEBSOCKET || 'ws://localhost:8080'

//   const { sendMessage, lastMessage } = useWebSocket(websocketUrl, {
//     //Will attempt to reconnect on all close events, such as server shutting down
//     shouldReconnect: (closeEvent) => true,
//   })

//   return { sendMessage, lastMessage }
// }

// export default useVoiceAssistantWebsocket

import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

const useVoiceAssistantWebsocket = (
  addRecording: Function,
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  // const audioRef = useRef<HTMLAudioElement | null>(null)

  // Simulate WebSocket connection (replace with actual WebSocket logic)
  // const sendMessage = (message: Blob) => {
  //   console.log('Sending message:', message)
  //   // WebSocket send logic here
  // }

  const websocketUrl = process.env.REACT_APP_WEBSOCKET || 'ws://localhost:8080'

  const { sendMessage, lastMessage } = useWebSocket(websocketUrl, {
    //     //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  })

  // const lastMessage = { data: null } // Replace with actual WebSocket message logic

  useEffect(() => {
    console.log('lastMessage', lastMessage)
    if (!lastMessage || !lastMessage.data) return
    addRecording(lastMessage.data, 'assistant')
    const blobUrl = URL.createObjectURL(lastMessage.data)
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
  }, [lastMessage, addRecording, audioRef])

  return { sendMessage, lastMessage, audioRef }
}

export default useVoiceAssistantWebsocket
