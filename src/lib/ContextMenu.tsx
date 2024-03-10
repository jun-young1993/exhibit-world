export interface ContextMenuInterface {
    open: boolean,
    name?: string,
    items: ContextItemInterface[]
}
export enum ItemType {
    Item = 'item',
    Contour = 'contour'
}

export interface ContextItemInterface {
    type: ItemType
    name: string
    onClick?: () => void
}

const checkForDuplicates = (items: ContextItemInterface[]): void => {
    const seen = new Set<string>();
    items.forEach(item => {
        if(seen.has(item.name)){
            throw new Error(`Context Items for Duplicate name found: ${item.name}`);
        }
        seen.add(item.name);
    });
}

const createContextItemMap = (items: ContextItemInterface[]): Map<string, ContextItemInterface> => {
    const itemMap = new Map<string, ContextItemInterface>();
    items.forEach(item => {
        itemMap.set(item.name, item);
    })
    return itemMap;
}

const ContextMenu = (props: ContextMenuInterface) => {

    checkForDuplicates(props.items);
    const itemMap = createContextItemMap(props.items);

    const handleItemClick = (itemName: string) => {
        const item = itemMap.get(itemName);
        if(item && item.onClick){
            item.onClick();
        }
    };


    return (
        <div className={`${props.open? 'block' : 'hidden'}`}>
            <div
                className="bg-white w-60 border border-gray-300 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg">
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">{props.name}</small>
                <hr className={"my-1 border-gray-300"} />
                {props.items.map((item,index) => {
                    if(item.type === ItemType.Item){
                        return (
                            <small
                                key={index}
                                className="flex hover:bg-gray-100 py-1 px-2 rounded hover:cursor-pointer"
                                onClick={() => handleItemClick(item.name)}
                            >
                                <div>{item.name}</div>
                            </small>
                        )
                    }else{
                        return (
                            <hr
                                key={index}
                                className="my-2 border-gray-300"
                            />
                        )

                    }


                })}
            </div>
        </div>
    );
};

export default ContextMenu;
