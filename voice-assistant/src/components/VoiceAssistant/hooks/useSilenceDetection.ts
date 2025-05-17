import { useCallback, useEffect, useRef, useState } from 'react'
import { RecordingStatus } from './useRecordingControls'

const useSilenceDetection = (
  mediaRecorder: MediaRecorder | undefined,
  recordingStatus: string,
  stopRecording: () => void,
  getRecordingTime: () => number,
  setRecordingStatus: (status: RecordingStatus) => void,
  silenceThreshold = 20,
  maxSilenceDuration = 1000,
  minRecordingDuration = 2,
) => {
  const [isSilent, setIsSilent] = useState(false)
  const [silenceDuration, setSilenceDuration] = useState(0)
  const silenceStartRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  const checkSilence = useCallback(() => {
    const analyser = analyserRef.current
    const dataArray = dataArrayRef.current
    if (!analyser || !dataArray) return

    analyser.getByteTimeDomainData(dataArray)
    const isSilentNow = dataArray.every((value) => Math.abs(value - 128) < silenceThreshold)
    setIsSilent(isSilentNow)

    if (isSilentNow) {
      if (silenceStartRef.current === null) {
        silenceStartRef.current = performance.now()
      }
      const silenceLength = performance.now() - (silenceStartRef.current || 0)
      setSilenceDuration(silenceLength)
      if (
        silenceLength > maxSilenceDuration &&
        getRecordingTime() > minRecordingDuration &&
        recordingStatus === 'recording'
      ) {
        stopRecording()
        setRecordingStatus('stopped')
      }
    } else {
      silenceStartRef.current = null
      setSilenceDuration(0)
    }

    if (recordingStatus === 'recording') {
      requestAnimationFrame(checkSilence)
    }
  }, [
    stopRecording,
    getRecordingTime,
    recordingStatus,
    silenceThreshold,
    maxSilenceDuration,
    minRecordingDuration,
    setRecordingStatus,
  ])

  useEffect(() => {
    if (mediaRecorder && recordingStatus === 'recording') {
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
        // if (audioContextRef.current) {
        //   audioContextRef.current.close()
        //   audioContextRef.current = null
        // }

        // if (analyserRef.current) {
        //   analyserRef.current.disconnect()
        //   analyserRef.current = null
        // }

        analyser.disconnect()
        if (audioContext.state !== 'closed') {
          audioContext.close()
        }
        audioContextRef.current = null
        analyserRef.current = null
        dataArrayRef.current = null
      }
    }
  }, [mediaRecorder, recordingStatus, checkSilence])

  return { isSilent, silenceDuration }
}

export default useSilenceDetection
