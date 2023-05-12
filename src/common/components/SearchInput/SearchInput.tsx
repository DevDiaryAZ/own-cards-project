import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react'
import {
  SInput,
  SInputLeftIcon,
  SInputRightIcon,
  SInputWrapper,
} from 'common/components/SearchInput/styles'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SearchInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  value: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  placeholder?: string
} & {
  onDebouncedChange?: (value: string) => void
}

export const SearchInput: React.FC<SearchInputPropsType> = ({
  onChangeText,
  onDebouncedChange,
  value,
  leftIcon,
  rightIcon,
  placeholder,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  const onChangeTextCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText?.(e.currentTarget.value)

    let inputText = ''

    if (e.currentTarget.value) {
      inputText = e.currentTarget.value
    }

    if (onDebouncedChange) {
      timerId && clearInterval(timerId)

      let newTimerId = setTimeout(function () {
        onDebouncedChange(inputText)
      }, 1500)
      setTimerId(Number(newTimerId))
    }
  }

  return (
    <SInputWrapper>
      {leftIcon && <SInputLeftIcon>{leftIcon}</SInputLeftIcon>}
      <SInput
        onChange={onChangeTextCallback}
        value={value}
        placeholder={placeholder || ''}
        inputProps={{
          autoComplete: 'new-password',
          ...restProps,
        }}
      />
      {rightIcon && <SInputRightIcon>{rightIcon}</SInputRightIcon>}
    </SInputWrapper>
  )
}
