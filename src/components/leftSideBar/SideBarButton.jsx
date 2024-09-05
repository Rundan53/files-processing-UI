import React, { memo, useState } from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const SideBarButton = ({sectionName, url, active}) => {
  const navigate = useNavigate();
  function handleSideBarButtonClick(){
    navigate(url)
  }
  return (
    <Button variant="ghost" className={`w-full text-sm justify-start font-normal gap-2 ${active.url===url && "bg-blue-500 hover:bg-blue-500"}`}
     onClick={handleSideBarButtonClick}>
        {sectionName}
    </Button>
  )
}

export default  memo(SideBarButton)