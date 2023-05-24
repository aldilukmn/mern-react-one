import React from 'react'

const HomeButton = ({title, ...rest}) => {
  return (
    <>
        <a {...rest}>{title}</a>
    </>
  )
}

export default HomeButton