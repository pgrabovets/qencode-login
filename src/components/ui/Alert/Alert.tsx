import s from './style.module.css'

type AlertProps = {
  type?: 'danger' | 'info';
  children: React.ReactNode;
}

export default function Alert({ children, type = 'info' }: AlertProps) {
  const getTypeStyle = () => {
    const classes = {
      info: s.alertInfo,
      danger: s.alertDanger,
    }
    return classes[type];
  }

  return (
    <div className={`${s.alert} ${getTypeStyle()}`}>{children}</div>
  )
}
