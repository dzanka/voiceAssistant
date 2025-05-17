import { LiveAudioVisualizer } from 'react-audio-visualize'
import IconButton from '../basics/IconButton'

type RecordingButtonsProps = {
  recordingStatus: 'recording' | 'stopped' | 'playing' | 'paused'
  handleRecording: (action: 'start' | 'stop' | 'pause' | 'resume') => void
  mediaRecorder: MediaRecorder | undefined
}

const RecordingButtons = ({
  recordingStatus,
  handleRecording,
  mediaRecorder,
}: RecordingButtonsProps) => {
  return (
    <div className="flex flex-col">
      {mediaRecorder && (
        <div className="flex justify-center">
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            width={150}
            height={75}
            barColor={'#4F1650'}
          />
        </div>
      )}
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
    </div>
  )
}

export default RecordingButtons
