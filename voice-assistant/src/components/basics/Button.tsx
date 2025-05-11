type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  label: string
  variant?: 'primary' // prepared for another variants
}
const Button = ({ onClick, label, variant = 'primary' }: ButtonProps) => (
  <button
    onClick={onClick}
    className={
      variant === 'primary'
        ? 'bg-secondary btn hover:bg-secondary-dark text-black px-[16px] py-[10px] text-[14px]'
        : ''
    }
  >
    {label}
  </button>
)

export default Button
