import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const NavMenu = ({ element, activeElement, handleActiveElement, handleImageUpload, imageUploadRef }) => {
    const isShapeMenuActive = element.value.some((item) => item?.value === activeElement?.value);
    return (
        <>
            <DropdownMenu className="no-ring">
                <DropdownMenuTrigger className='no-ring'>
                    <div>
                        <img src={isShapeMenuActive ? activeElement.icon : element.icon} alt={element.name} className="w-full h-full object-contain object-center" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-900 text-slate-300 border-0 translate-y-[1.6rem]">
                    {

                        element.value.map((shape) => {
                            return (
                                <DropdownMenuItem className="" key={shape.name} onClick={() => { handleActiveElement(shape) }}>
                                    <div className="w-5 h-5">
                                        <img src={shape.icon} alt={shape.name} className="w-full h-full object-contain object-center" />
                                    </div>
                                    <p className="ml-5">{shape.name}</p>
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <input
                type="file"
                className="hidden"
                ref={imageUploadRef}
                accept="image/*"
                onChange={handleImageUpload}
            />
        </>
    )
}

export default NavMenu