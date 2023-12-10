import {ChangeEvent, ChangeEventHandler, MouseEventHandler, ReactNode, useRef, useState} from "react";

export enum IconButtonType {
    FILE = 'file'
}
export interface IconButtonInterface {
    icon : ReactNode
    description?: string
    tooltip?: boolean
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement>
    )=> void
    onChangeFile?: (
        event: ChangeEvent<HTMLInputElement>
    ) => void
    type?: IconButtonType
}
export default function IconButton(props: IconButtonInterface){
    const [tooltip] = useState(props.tooltip === undefined ? true : props.tooltip);
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
        <button
            data-tooltip-target="tooltip-default"
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            onClick={(event)=>{
                event.stopPropagation();
                handleButtonClick(event);
            }}
        >
            {props.icon}
            <span className="sr-only">{props.description ?? ""}</span>
        </button>
            {tooltip &&
                <div id="tooltip-default" role="tooltip"
                     className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Tooltip content
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            }

        </>
    )
}