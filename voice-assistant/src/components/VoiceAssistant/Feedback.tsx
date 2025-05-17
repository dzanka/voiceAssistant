import { useState } from 'react'
import IconButton from '../basics/IconButton'

const Feedback = () => {
  const [satisfied, setSatisfied] = useState(0)

  return (
    <div className="flex justify-end gap-[5px] p-[10px] items-center">
      {satisfied > 0 && <div className="text-xs">{satisfied}</div>}
      <IconButton
        iconName="SatisfiedIcon"
        variant="small"
        label="Páči sa mi to"
        onClick={() => {
          setSatisfied(satisfied + 1)
        }}
      />
    </div>
  )
}

export default Feedback
