import {bool} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {atom} from "recoil";

export enum ExportSyncStatus {
    IDLE = "idle",
    PROCESSING = "processing",
    PENDING = "pending",

}
export const exportSyncStatusAtom = atom<ExportSyncStatus>({
    key: 'exportSyncStatusAtom',
    default: ExportSyncStatus.IDLE
})