import s from './style.module.css'

type Props = {
  children: React.ReactNode
}

export default function AuthTitle({ children }: Props) {
  return (
    <h1 className={s.authTitle}>{children}</h1>
  )
}
