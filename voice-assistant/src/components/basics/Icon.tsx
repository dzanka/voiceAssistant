import * as Icons from '../../assets/icons'

export type IconName = keyof typeof Icons
const TypedIcons: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = Icons

type IconProps = {
  name: IconName
  className?: string
  size?: number | string
}

const Icon = ({ name, className, size = 24 }: IconProps) => {
  const IconComponent = TypedIcons[name]

  if (!IconComponent) console.warn(`Icon "${name}" not found.`)

  return (
    <IconComponent className={`${className} shrink-0`} aria-label={name} width={size} height={size}>
      <title>{name}</title>
    </IconComponent>
  )
}

export default Icon
