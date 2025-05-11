import useWebSocket from 'react-use-websocket'

const Websocket = () => {
  const socketUrl = 'ws://localhost:8080'

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(socketUrl, {
      onOpen: () => console.log('opened'),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    })
}

export default Websocket
