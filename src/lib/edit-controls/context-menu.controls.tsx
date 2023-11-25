import {EditControlsInterface} from "./edit.controls";
import ContextMenu, {ContextItemInterface, ItemType} from "../ContextMenu";
import {useEffect, useState} from "react";
import EditMeshEventEmitter, {EditMeshEventType} from "../../utills/edit-mesh-event.utill";
import {ThreeEvent} from "@react-three/fiber";
import meshesStore from "../../store/meshes.store";
enum Items {
    Close = 'Close',
    Delete = 'Delete'
}

interface EditContextMenuControlsInterface extends EditControlsInterface {

}

export default function EditContextMenuControls({mesh}:EditContextMenuControlsInterface) {

    const {meshes} = meshesStore();

    const contextItems:ContextItemInterface[] =  [{
        type: ItemType.Item,
        name: Items.Delete,
    },{
        type: ItemType.Contour,
        name: ItemType.Contour,
    }]
    return (
            <ContextMenu
                name={mesh.name === "" ? "no name" : mesh.name}
                open={true}
                items={contextItems}
             />
    )
}