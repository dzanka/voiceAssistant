import { useCallback, useEffect, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

type RecordingStatus = 'recording' | 'stopped' | 'playing' | 'paused'
type RecordingAction = 'start' | 'stop' | 'pause' | 'resume'

// TODO: refactor this to separate SilenceAnalyzer
const useRecordingControls = (audioRef: React.RefObject<HTMLAudioElement | null>) => {
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('stopped')
  const silenceStartRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  const recordingStatusRef = useRef(recordingStatus)
  const recordingTimeRef = useRef(0)
  const recordingBlobRef = useRef<Blob | undefined>(undefined)

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    mediaRecorder,
    recordingTime,
  } = useAudioRecorder()

  recordingStatusRef.current = recordingStatus
  recordingTimeRef.current = recordingTime
  recordingBlobRef.current = recordingBlob

  const SilenceThreshold = 20
  const MaxSilenceDuration = 1000 // 1 second
  const MinRecordingDuration = 2 // 2 seconds

  const checkSilence = useCallback(() => {
    const analyser = analyserRef.current
    const dataArray = dataArrayRef.current
    if (!analyser || !dataArray) return

    analyser.getByteTimeDomainData(dataArray)
    const isSilentNow = dataArray.every((value) => Math.abs(value - 128) < SilenceThreshold)

    if (isSilentNow) {
      if (silenceStartRef.current === null) {
        silenceStartRef.current = performance.now()
      }
      const silenceLength = performance.now() - (silenceStartRef.current || 0)

      if (
        silenceLength > MaxSilenceDuration &&
        recordingTimeRef.current > MinRecordingDuration &&
        recordingStatusRef.current === 'recording'
      ) {
        stopRecording()
        setRecordingStatus('stopped')
      }
    } else {
      silenceStartRef.current = null
    }

    if (recordingStatusRef.current === 'recording') {
      requestAnimationFrame(checkSilence)
    }
  }, [stopRecording])

  useEffect(() => {
    if (mediaRecorder) {
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(mediaRecorder.stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048

      const dataArray = new Uint8Array(analyser.fftSize)
      source.connect(analyser)

      audioContextRef.current = audioContext
      analyserRef.current = analyser
      dataArrayRef.current = dataArray

      checkSilence()

      return () => {
        if (analyser) {
          analyser.disconnect()
        }
        if (audioContext && audioContext.state !== 'closed') {
          audioContext.close()
        }
        audioContextRef.current = null
        analyserRef.current = null
        dataArrayRef.current = null
      }
    }
  }, [mediaRecorder, recordingStatus, checkSilence])

  const handleRecording = (recordingAction: RecordingAction) => {
    switch (recordingAction) {
      case 'start':
        audioRef.current?.pause()
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
        if (audioContextRef.current) {
          audioContextRef.current.close()
          audioContextRef.current = null
        }
        if (analyserRef.current) {
          analyserRef.current.disconnect()
          analyserRef.current = null
        }
        break
      default:
        setRecordingStatus('stopped')
    }
  }

  return {
    recordingStatus,
    mediaRecorder,
    handleRecording,
    recordingBlob,
  }
}

export default useRecordingControls
