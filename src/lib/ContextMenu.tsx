import React, {useEffect, useState} from 'react';

export interface ContextMenuInterface {
    open: boolean,
    name?: string,
    setOpen: (open: boolean) => void
}
enum ItemType {
    Item = 'item',
    Contour = 'contour'
}

interface ContextItemInterface {
    type: ItemType
    name: string
}
const ContextMenu = (props: ContextMenuInterface) => {


    // 컨텍스트 메뉴 아이템 클릭 시 실행될 함수들을 작성합니다.
    const handleItemClick = (itemName: string) => {
        // 각 아이템 클릭 시 실행될 동작을 정의합니다.

        // 여기서 원하는 동작을 수행할 수 있습니다.
        switch (itemName){
            case 'Close':
                props.setOpen(false);
                break;
            default:
                break;
        }
    };

    const items: ContextItemInterface[]  = [{
        type: ItemType.Item,
        name: 'Delete',
    },{
        type: ItemType.Contour,
        name: ItemType.Contour,
    },{
        type: ItemType.Item,
        name: 'Close'
    }]

    return (
        <div className={`${props.open? 'block' : 'hidden'}`}>
            <div
                className="bg-white w-60 border border-gray-300 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg">
                {items.map((item) => {
                    if(item.type === ItemType.Item){
                        return (
                            <div
                                className="flex hover:bg-gray-100 py-1 px-2 rounded hover:cursor-pointer"
                                onClick={() => handleItemClick(item.name)}
                            >
                                <div>{item.name}</div>
                            </div>
                        )
                    }else{
                        return (
                            <hr className="my-3 border-gray-300"/>
                        )

                    }


                })}



            </div>
        </div>
    );
};

export default ContextMenu;
