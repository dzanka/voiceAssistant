type MainProps = {
  children: React.ReactNode
}

const Main = ({ children }: MainProps) => (
  <div className="flex items-center justify-center gap-[25px]">
    <div className="w-[962px]">{children}</div>
  </div>
)
export default Main
