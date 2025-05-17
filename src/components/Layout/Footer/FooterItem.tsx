import Icon, { IconName } from '../../basics/Icon'

type FooterProps = {
  icon: IconName
  title: string
}
const FooterItem = ({ icon, title }: FooterProps) => (
  <div className="flex items-center gap-[12px]">
    <Icon name={icon} />
    <div className="font-normal text-large">{title}</div>
  </div>
)

export default FooterItem
