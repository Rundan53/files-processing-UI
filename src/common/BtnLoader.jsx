import React from 'react'
import { ClipLoader } from 'react-spinners'

const BtnLoader = ({text=""}) => {
  return (
    <>
    {text}
    <ClipLoader size={22} color={"#777"} className='ml-2'/>
    </>
  )
}

export default BtnLoader