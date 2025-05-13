import { Link, useLocation } from 'react-router-dom'

type MenuProps = {
  label: string
  to: string
}

const MenuItem = ({ label, to }: MenuProps) => {
  const location = useLocation() // Get the current location
  const isActive = location.pathname === to // Check if the current route matches the `to` prop

  return (
    <li>
      <Link
        to={to}
        className={`${
          isActive ? 'border-b-2 border-secondary' : ''
        } hover:text-primary font-medium px-4 py-2 text-[14px]`}
        aria-label={label}
        title={label}
      >
        {label}
      </Link>
    </li>
  )
}
export default MenuItem
