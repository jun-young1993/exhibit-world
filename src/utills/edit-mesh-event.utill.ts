import EventEmitter from "events";

const EditMeshEventEmitter = new EventEmitter();

export enum EditMeshEventType  {
    OnMeshContextMenu = 'OnContextMenu'
}

export default EditMeshEventEmitter;