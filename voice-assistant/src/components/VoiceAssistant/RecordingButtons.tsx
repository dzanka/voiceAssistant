import IconButton from '../basics/IconButton'

type RecordingButtonsProps = {
  recordingStatus: 'recording' | 'stopped' | 'playing' | 'paused'
  handleRecording: (action: 'start' | 'stop' | 'pause' | 'resume') => void
}

const RecordingButtons = ({ recordingStatus, handleRecording }: RecordingButtonsProps) => (
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
)

export default RecordingButtons
