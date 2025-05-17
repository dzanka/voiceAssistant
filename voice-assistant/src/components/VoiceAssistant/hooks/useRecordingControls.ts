import { useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

type RecordingStatus = 'recording' | 'stopped' | 'playing' | 'paused'
type RecordingAction = 'start' | 'stop' | 'pause' | 'resume'

const useRecordingControls = (onRecordingComplete: (blob: Blob | undefined) => void) => {
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('stopped')
  const { startRecording, stopRecording, togglePauseResume, recordingBlob, mediaRecorder } =
    useAudioRecorder()

  const handleRecording = (recordingAction: RecordingAction) => {
    switch (recordingAction) {
      case 'start':
        startRecording()
        setRecordingStatus('recording')
        break
      case 'pause':
        togglePauseResume()
        setRecordingStatus('paused')
        break
      case 'resume':
        togglePauseResume()
        setRecordingStatus('recording')
        break
      case 'stop':
        stopRecording()
        setRecordingStatus('stopped')
        if (recordingStatus === 'recording') onRecordingComplete(recordingBlob)
        break
      default:
        setRecordingStatus('stopped')
    }
  }

  return { recordingStatus, mediaRecorder, handleRecording, recordingBlob }
}

export default useRecordingControls
