import {createContext, Ref, useContext, useRef} from "react";
import {TransformControl} from "../types/transform";

export const TransformControlsContext = createContext<Ref<TransformControl>>(undefined!);
export function TransformControlsProvider({children}: any) {
    const transformControls = useRef<TransformControl>(undefined!);


    return (
        <TransformControlsContext.Provider
            value={transformControls}
        >
            {children}
        </TransformControlsContext.Provider>
    )
}
export function useTransformControls(){
    return useContext(TransformControlsContext);
}


export function runTransformControls(transformControls: Ref<TransformControl>, callback?:(transformControls:TransformControl) => void): void
{
    if(transformControls && 'current' in transformControls && callback){
        callback(transformControls.current as TransformControl);
    }
}