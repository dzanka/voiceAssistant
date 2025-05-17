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
    <>
      {recordings.length > 0 ? (
        recordings.map((recording, key) => {
          const url = URL.createObjectURL(recording.recording)

          return (
            <audio key={key} controls>
              <source src={url} type="audio/wav" />
            </audio>
          )
        })
      ) : (
        <p>No recordings available</p>
      )}
    </>
  )
}
export default RecordingsList
