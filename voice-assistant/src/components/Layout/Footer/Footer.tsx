import FooterItem from './FooterItem'

const Footer = () => (
  <div className="flex justify-center py-[120px] text-primary">
    <div className="flex justify-between w-[962px]">
      <FooterItem icon="Coins" title="Reduce costs by 40%." />
      <FooterItem icon="ChartLineUp" title="Increase customer satisfaction by 30%." />
      <FooterItem icon="ShieldCheck" title="Trusted by those you know." />
    </div>
  </div>
)
export default Footer
