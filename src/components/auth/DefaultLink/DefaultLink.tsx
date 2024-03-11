import s from './style.module.css'
import { Link } from "react-router-dom";

type LinkProps = {
  to: string
  children: React.ReactNode
}

export default function DefaultLink({ to, children }: LinkProps) {
  return (
    <Link className={s.link} to={to}>{ children }</Link>
  )
}
