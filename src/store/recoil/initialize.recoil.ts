import {useRecoilCallback} from "recoil";
import {useRefresherGroupMappingHook} from "./groups-mapping.recoil";

export function useRefresherHook(){
    const refresherGroupMapping = useRefresherGroupMappingHook();
    return useRecoilCallback(
        ({snapshot, set}) =>
            () => {
                refresherGroupMapping();
            }
    )
}