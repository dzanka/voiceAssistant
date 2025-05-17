import MenuItem from './MenuItem'

const Menu = () => {
  return (
    <ul className="flex gap-[48px]">
      <MenuItem label="Home" to="/home" />
      <MenuItem label="Products" to="/products" />
      <MenuItem label="Organization" to="/organization" />
      <MenuItem label="Account" to="/account" />
      <MenuItem label="Help" to="/help" />
    </ul>
  )
}
export default Menu
