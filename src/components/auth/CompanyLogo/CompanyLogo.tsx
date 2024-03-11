import s from './style.module.css'
import logo from '@/assets/logo.svg'

export default function CompanyLogo() {
  return (
    <img className={s.companyLogo} src={logo} width={178} height={32} alt="Company logo" />
  )
}
