import Icon, { IconName } from './Icon'

type IconButtonProps = {
  iconName: IconName
  onClick: React.MouseEventHandler<HTMLButtonElement>
  label: string
  variant?: 'small' | 'large'
}
const IconButton = ({ iconName, variant, onClick, label }: IconButtonProps) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`flex justify-center items-center gap-[10px] ${variant === 'small' ? 'w-[28px]' : 'w-[50px]'} ${variant === 'small' ? 'h-[28px]' : 'h-[50px]'} rounded-full ${variant === 'small' ? 'bg-red' : 'bg-secondary'} `}
  >
    <Icon name={iconName} size={variant === 'small' ? 18 : 24} className={'-rotate-[135]'} />
  </button>
)

export default IconButton
