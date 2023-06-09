import React, { DetailedHTMLProps, FC } from 'react'
import { SButton } from './styles'

export type TDefaultHTMLButton = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type TButtonProps = TDefaultHTMLButton & {
  label: string
  isDisabled?: boolean
  backgroundColor?: string
  size?: 'lg' | 'sm'
  isLoading?: boolean
  icon?: React.ReactElement
  needAuth?: boolean
  withShadow?: boolean
  withBorder?: boolean
  severity?: 'success' | 'neutral'
  isNoActive?: boolean
  padding?: string
}

export const Button: FC<TButtonProps> = ({ isDisabled, ...props }) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick && props.onClick(e)
  }
  return (
    <SButton
      type={props.type}
      hasIcon={!!props.icon}
      disabled={isDisabled}
      onClick={e => onClickHandler(e)}
      backgroundColor={props.backgroundColor}
      size={props.size}
      isLoading={props.isLoading}
      withShadow={props.withShadow}
      withBorder={props.withBorder}
      severity={props.severity}
      isNoActive={props.isNoActive}
      padding={props.padding}
    >
      {props.icon}
      {props.label}
    </SButton>
  )
}
