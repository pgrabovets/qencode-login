import s from './style.module.css'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export default function LightButton({ children, onClick }: ButtonProps) {
  const handleClick = () => {
    onClick && onClick();
  }
  return (
    <button onClick={handleClick} className={s.primaryButton}>{children}</button>
  )
}
