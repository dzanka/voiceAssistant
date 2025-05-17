import { useEffect } from 'react'
import { convertToWav } from '../utils'

const useProcessRecordingBlob = (
  recordingBlob: Blob | undefined,
  recordingStatus: string,
  addRecording: Function,
  sendMessage: Function,
) => {
  useEffect(() => {
    if (recordingStatus === 'stopped' && recordingBlob) {
      try {
        console.log('Processing recording blob:', recordingBlob)
        const wavBlob = convertToWav(recordingBlob)
        addRecording(wavBlob, 'user')
        sendMessage(wavBlob)
      } catch (error) {
        console.error('Error processing recording blob:', error)
      }
    }
  }, [recordingBlob, recordingStatus, addRecording, sendMessage])
}

export default useProcessRecordingBlob
