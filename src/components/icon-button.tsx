import { Tooltip } from "flowbite-react";
import {ChangeEvent, ChangeEventHandler, MouseEventHandler, ReactNode, useRef, useState} from "react";

export enum IconButtonType {
    FILE = 'file'
}
export interface IconButtonInterface {
    icon : ReactNode
    description?: string
    tooltip?: string
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
            {props.icon}
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
            ? <Tooltip content={tooltip} placement="auto" style="auto"> <DefaultButton /> </Tooltip>
            : <DefaultButton />}

        </>
    )
}