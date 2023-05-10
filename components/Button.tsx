'use client'

import classNames from 'classnames'
import { ButtonHTMLAttributes, Ref, forwardRef, memo } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { loading, disabled, className, ...restProps } = props
  return (
    <button
      {...restProps}
      ref={ref}
      className={classNames(
        'shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-mono text-base font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black',
        'hover:bg-mauve3 bg-white text-blue-500',
        className,
      )}
      disabled={disabled || loading}
    >
      {props.children}
    </button>
  )
})

Button.displayName = 'Button'

export default memo(Button)
