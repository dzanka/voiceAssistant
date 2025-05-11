import logo from './logo.svg'
import './App.css'
import { AudioRecorder } from 'react-audio-voice-recorder'
import useWebSocket from 'react-use-websocket'
import { useAppSelector } from './redux/hooks'

interface RootState {
  isOn: boolean
}

const App = () => {
  // TS infers type: (state: RootState) => boolean
  const isOn = useAppSelector((state: RootState) => state.isOn)
  console.log('isOn', isOn)

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const audio = document.createElement('audio')
    audio.src = url
    audio.controls = true
    document.body.appendChild(audio)
  }

  const socketUrl = 'ws://localhost:8080'

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket(socketUrl, {
      onOpen: () => console.log('opened'),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
            // autoGainControl,
            // channelCount,
            // deviceId,
            // groupId,
            // sampleRate,
            // sampleSize,
          }}
          // onNotAllowedOrFound={(err: DOMException) => console.table(err)}
          // downloadOnSavePress={true}
          // downloadFileExtension="webm"
          // mediaRecorderOptions={{
          //   audioBitsPerSecond: 128000,
          // }}
          // showVisualizer={true}
        />
      </div>
    </div>
  )
}

export default App
