import s from './style.module.css'
import google from '@/assets/google.svg'
import github from '@/assets/github.svg'

export default function SocialLogin() {
  return (
    <div className={s.socialLoginContainer}>
      <button className={s.socialLoginBtn}><img width={18} height={18} src={google} alt="google logo image" />Google</button>
      <button className={s.socialLoginBtn}><img width={18} height={18} src={github} alt="github logo image" />Github</button>
    </div>
  )
}
