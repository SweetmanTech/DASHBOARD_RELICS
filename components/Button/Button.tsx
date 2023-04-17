const Button = ({ children, onClick, disabled = false }: any) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-black text-white text-5xl font-bold py-4 px-8 rounded-2xl hover:bg-opacity-80"
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
