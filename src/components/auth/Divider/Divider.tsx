import s from './style.module.css'

export default function Divider() {
  return (
    <div className={s.divider}>
      <div className={s.line}></div>
      OR
      <div className={s.line}></div>
    </div>
  )
}
