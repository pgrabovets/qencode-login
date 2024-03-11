import s from './style.module.css'

type FormMessageProps = {
  children: React.ReactNode
  error?: boolean
}

export default function FormMessage({ children, error = false }: FormMessageProps) {
  return (
    <p className={`${s.formMessage} ${error && s.errorText }`}>{children}</p>
  )
}
