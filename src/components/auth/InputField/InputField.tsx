import { useState } from 'react'
import s from './style.module.css'
import showPasswordIcon from '@/assets/show-paswd.svg'

type InputProps = {
  type?: string
  placeholder?: string
  name?: string
  label?: string
  error?: boolean
  value?: string,
  helperText?: string,
}

export default function InputField({
  name,
  type,
  label,
  placeholder,
  helperText,
  error
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((value) => {
      return !value;
    })
  }

  return (
    <div className={s.marginBottom}>
      {label ? <label className={s.inputLabel} htmlFor={name}>{label}</label> : null}
      <div className={s.relative}>
        <input 
          className={`${s.inputField} ${error && s.inputFieldError}`}
          name={name} id={name}
          type={showPassword ? 'text' : type} 
          placeholder={placeholder}
        />
        { type === 'password' ? (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className={s.showPasswordBtn}
          >
            <img width={20} height={20} src={showPasswordIcon} alt="show password icon" />
          </button>
        ) : null }
      </div>
      { helperText ? <p className={`${s.helperText} ${error &&  s.errorText}`}>{helperText}</p> : null }
    </div>
  )
}
