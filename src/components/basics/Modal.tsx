type ModalProps = {
  children: React.ReactNode
}

const Modal = ({ children }: ModalProps) => (
  <div className="relative z-10" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-black bg-opacity-15" aria-hidden="true"></div>
    <div className="fixed inset-0 z-20 flex min-h-full justify-center items-center">
      <div className="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8">
        <div className="">{children}</div>
      </div>
    </div>
  </div>
)
export default Modal
