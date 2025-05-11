import { Link } from 'react-router-dom'

type MenuProps = {
  label: string
  to: string
}

const MenuItem = ({ label, to }: MenuProps) => {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-800 hover:text-primary font-medium px-4 py-2 text-[14px]"
        aria-label={label}
        title={label}
      >
        {label}
      </Link>
    </li>
  )
}
export default MenuItem
