import { createContext, useCallback, useMemo, useState } from 'react'

export type RecordingEntity = 'user' | 'assistant'
export type RecordingItem = {
  recording: Blob
  entity: RecordingEntity
}

interface GeneralContextType {
  isVoiceAssistantOpen: boolean
  setIsVoiceAssistantOpen: (isOpen: boolean) => void
  recordings: RecordingItem[]
  addRecording: (newRecording: Blob, entity: RecordingEntity) => void
  setRecordings: (recordings: RecordingItem[]) => void
}

type GeneralProviderProps = { children: React.ReactNode }

export const GeneralContext = createContext<GeneralContextType | null>(null)

const GeneralProvider = ({ children }: GeneralProviderProps) => {
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false)
  const [recordings, setRecordings] = useState<RecordingItem[]>([])

  const addRecording = useCallback((newRecording: Blob, entity: RecordingEntity) => {
    console.log('Adding new recording:', newRecording, entity)
    setRecordings((prevState) => [...prevState, { recording: newRecording, entity }])
  }, [])

  const value = useMemo(
    () => ({
      isVoiceAssistantOpen,
      setIsVoiceAssistantOpen,
      recordings,
      addRecording,
      setRecordings,
    }),
    [isVoiceAssistantOpen, recordings, addRecording],
  )

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
}

export default GeneralProvider
