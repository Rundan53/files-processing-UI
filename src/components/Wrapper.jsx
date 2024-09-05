import React from 'react'

const Wrapper = () => {
  return (
    <ScrollArea className="w-[calc(100%-18%)] h-full">
      <div className="">
        <CategorySection type="video"/>
        <EventSection type="video"/>
      </div>
    </ScrollArea>
  )
}

export default Wrapper