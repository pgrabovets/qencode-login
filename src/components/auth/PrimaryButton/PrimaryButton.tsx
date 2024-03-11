import s from './style.module.css'

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button' | undefined
  children: React.ReactNode
  onClick?: () => void
}

export default function PrimaryButton({ children, type, onClick }: ButtonProps) {
  const handleClick = () => {
    onClick && onClick();
  }
  return (
    <button onClick={handleClick} type={type} className={s.primaryButton}>{children}</button>
  )
}
