import React from 'react'

const HomeButton = ({title, ...rest}) => {
  return (
    <>
        <p className='m-0' {...rest}>{title}</p>
    </>
  )
}

export default HomeButton