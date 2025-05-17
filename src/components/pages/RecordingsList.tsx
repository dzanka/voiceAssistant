import { useContext } from 'react'
import { GeneralContext } from '../../context/GeneralContext'

const RecordingsList = () => {
  const generalContext = useContext(GeneralContext)
  if (!generalContext) {
    throw new Error('GeneralContext must be used within a GeneralProvider')
  }

  const { recordings } = generalContext

  // TODO: use custom implementation for audio player
  return (
    <div className="flex flex-col p-4">
      <h1>History of your last voice chat</h1>
      {recordings.length > 0 ? (
        recordings.map((recording, key) => {
          const url = URL.createObjectURL(recording.recording)

          return (
            <div
              key={key}
              className={`flex justify-center p-3 ${recording.entity === 'assistant' ? 'bg-secondary' : 'bg-nude-dark'}`}
            >
              <audio controls>
                <source src={url} type="audio/wav" />
              </audio>
            </div>
          )
        })
      ) : (
        <p>No recordings available</p>
      )}
    </div>
  )
}
export default RecordingsList
