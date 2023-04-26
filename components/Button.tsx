import classNames from 'classnames'
import { ButtonHTMLAttributes, Ref, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { loading, disabled, className, ...restProps } = props
  return (
    <button
      ref={ref}
      className={classNames('border border-blue-500 p-4 shadow-lg', className)}
      disabled={disabled || loading}
      {...restProps}
    >
      {props.children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
