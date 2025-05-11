import { createContext, useMemo, useState } from 'react'

interface GeneralContextType {
  isVoiceAssistantOpen: boolean
  setIsVoiceAssistantOpen: (isOpen: boolean) => void
}

type GeneralProviderProps = { children: React.ReactNode }

export const GeneralContext = createContext<GeneralContextType | null>(null)

const GeneralProvider = ({ children }: GeneralProviderProps) => {
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false)
  const value = useMemo(
    () => ({ isVoiceAssistantOpen, setIsVoiceAssistantOpen }),
    [isVoiceAssistantOpen],
  )

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
}

export default GeneralProvider
