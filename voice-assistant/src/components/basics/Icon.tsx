import * as Icons from '../../assets/icons'
import { muiIconMap } from '../../assets/muiIcons'

export type IconName = keyof typeof Icons | keyof typeof muiIconMap
const TypedIcons: Record<string, React.ElementType> = { ...Icons, ...muiIconMap }

type IconProps = {
  name: IconName
  className?: string
  size?: number | string
}

const Icon = ({ name, className, size = 24 }: IconProps) => {
  let IconComponent = TypedIcons[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`)

    return null
  }

  return (
    <IconComponent className={`${className} shrink-0`} aria-label={name} width={size} height={size}>
      <title>{name}</title>
    </IconComponent>
  )
}

export default Icon
