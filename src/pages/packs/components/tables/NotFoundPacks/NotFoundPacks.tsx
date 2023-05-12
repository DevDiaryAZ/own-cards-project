import React from 'react'

type PropsType = {
  messageError?: string
}

export const NotFoundPacks = ({ messageError }: PropsType) => {
  return (
    <>
      NotFoundPacks
      {messageError && <p>{messageError}</p>}
    </>
  )
}
