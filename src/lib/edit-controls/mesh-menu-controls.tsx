import {useRef} from "react";
import {Mesh, MeshBasicMaterial, Object3D, PlaneGeometry} from "three";
import {v4 as uuidByv4} from "uuid";

const initMenuWidthSize = 3;
const initMenuHeightSize = 3;

class MeshMenu extends Mesh {
    constructor() {
        super(
            new PlaneGeometry(initMenuWidthSize,initMenuHeightSize),
            new MeshBasicMaterial({
                opacity: 0.1
            })
        );
    }
}

export default function MeshMenuControls() {
    const uuid = uuidByv4();
    const menus:  Mesh[]= [
        new MeshMenu()
    ]
    return (
        <group
            uuid={uuid}
        >
            {menus.map((menu) => {
                return <></>
            })}
        </group>
    )
}