import { Tooltip } from "flowbite-react";
import type { Placement } from '@floating-ui/core';
import {ChangeEvent, ChangeEventHandler, MouseEventHandler, ReactNode, cloneElement, isValidElement, useRef, useState} from "react";
export enum IconButtonType {
    FILE = 'file'
}
export interface IconButtonInterface {
    icon : ReactNode
    description?: string
    tooltip?: string
    tooltipPlacement?: Placement 
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement>
    )=> void
    onChangeFile?: (
        event: ChangeEvent<HTMLInputElement>
    ) => void
    type?: IconButtonType
}
export default function IconButton(props: IconButtonInterface){
    const [tooltip] = useState(props.tooltip);
    const [type] = useState(props.type === undefined ? false : props.type);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileInput = (event:  ChangeEvent<HTMLInputElement>) => {
        if (props.onChangeFile) {
            props.onChangeFile(event);

        }
    }
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {

        if(type === IconButtonType.FILE && fileInputRef && fileInputRef.current){
            fileInputRef.current.click();
        }else{
            if(props.onClick){
                props.onClick(event);
            }
        }
    }
    

    const DefaultButton = () => (
        <button
        data-tooltip-target="tooltip-default"
        type="button"
        className="text-black-700 border hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        onClick={(event)=>{
            event.stopPropagation();
            handleButtonClick(event);
        }}
        >
                {isValidElement(props.icon)
                ? cloneElement<any>(props.icon,{
                    className: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                })
                : props.icon}
                
            
        </button>
    )
    return (
        <>
        {type
        && <input
                ref={fileInputRef}
                type={"file"}
                className={"hidden"}
                onChange={(event) => {
                    event.stopPropagation();
                    handleFileInput(event);
                }}
                // onChange={handleFileInput}
        />}
            {tooltip 
            ? <Tooltip content={tooltip} placement={`${props.tooltipPlacement ? props.tooltipPlacement : 'auto'}`} style="auto"> <DefaultButton /> </Tooltip>
            : <DefaultButton />}

        </>
    )
}