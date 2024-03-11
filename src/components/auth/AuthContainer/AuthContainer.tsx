import s from './style.module.css';

type Props = {
  children: React.ReactNode
}

export default function AuthContainer({ children }: Props) {
  return (
    <div className={s.container}>
      <div className={s.authFormContainer}>
        {children}
      </div>
    </div>
  )
}
