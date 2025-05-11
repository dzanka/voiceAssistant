import useWebSocket from 'react-use-websocket'

const useVoiceAssistantWebsocket = () => {
  const websocketUrl = process.env.REACT_APP_WEBSOCKET || 'ws://localhost:8080'

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(websocketUrl, {
      onOpen: () => console.log('opened'),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    })

  return { sendMessage, lastMessage }
}

export default useVoiceAssistantWebsocket
