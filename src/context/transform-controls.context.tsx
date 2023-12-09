import {createContext, Ref, useContext, useRef} from "react";
import {TransformControl} from "../types/transform";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import selectedMeshStore from "../store/selected-mesh.store";

export const TransformControlsContext = createContext<Ref<TransformControl> | undefined>(undefined!);
export function TransformControlsProvider({children}: any) {
    const transformControls = useRef<TransformControl>(undefined!);


    return (
        <TransformControlsContext.Provider
            value={transformControls}
        >
            {children}
            {/*(selected &&*/}
            {/*    <EditTransformControls ref={transformControls} object={selected} />*/}
            {/*)*/}
        </TransformControlsContext.Provider>
    )
}
export function useTransformControls(){
    return useContext(TransformControlsContext);
}