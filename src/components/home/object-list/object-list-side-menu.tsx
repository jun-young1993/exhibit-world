import SideMenu from "../side-menu";
import {MenuItem} from "../../../types/menu-component";
import InstanceMismatchError from "../../../Exception/instance-mismatch";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import GithubStorageClient from "../../../clients/github-storage.client";
import {useAddGroupHook, useRemoveGroupHook} from "../../../store/recoil/groups.recoil";
import {selectGroupAtom} from "../../../store/recoil/select-group.recoil";
import {useRecoilState} from "recoil";
import GroupClient from "../../../clients/group.client";
import {TransformMode} from "../../../types/transform";
import {transformModeAtom} from "../../../store/recoil/transform-mode.recoil";
import {ExportSyncStatus, exportSyncStatusAtom} from "../../../store/recoil/export-sync-status.recoil";
import {SpotLight} from "three";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import { objectDefalutValues } from "config";
import {useThree} from "@react-three/fiber";


enum MenuType {
    ADD = 'add',
    SPOT_LIGHT_ADD = 'SpotLight',
    REMOVE = 'remove'
}
const groupClient = new GroupClient();
const githubStorageClient = new GithubStorageClient();
const exporter = new GLTFExporter();
export default function ObjectListSideMenu() {
    const fileRef = useRef<HTMLInputElement>(null);
    const addGroup = useAddGroupHook();
    const removeGroup = useRemoveGroupHook();
    const [,setTransformMode] = useRecoilState(transformModeAtom);
    const [exportSyncStatus, setExportSyncStatus] = useRecoilState(exportSyncStatusAtom);

    const [selectedGroupId] = useRecoilState<string | null>(selectGroupAtom);

    const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {

        if(!(event.target.files instanceof FileList)){
            throw new InstanceMismatchError(FileList);
        }
        Array.from(event.target.files).forEach((file) => {
            groupClient
                .create(file)
                .then((groupEntity) => {
                    addGroup(groupEntity);
                })
                .catch((exception) => {
                    new Error(exception.toString());
                })
        })
    }
    const defaultMenu: MenuItem[] = [{
        name: MenuType.ADD,
        top: <input type='file' className="hidden" ref={fileRef} onChange={handleAddFile}/>,
        onClick: () => {
            if(!(fileRef?.current instanceof HTMLInputElement)){
                throw new InstanceMismatchError(HTMLInputElement);
            };
            fileRef?.current?.click();
        }
    },{
        name: MenuType.SPOT_LIGHT_ADD,
        onClick: () => {
            const spotLight = new SpotLight("0xffffff");
            
            spotLight.userData = objectDefalutValues.spotLight;
            exporter.parse(
                spotLight,
                (gltf) => {
                    console.log("=>(object-list-side-menu.tsx:67) gltf", gltf);
                    const blob  = new Blob([gltf as ArrayBuffer],{ type: "application/octet-stream" });
                    const file = new File([blob],spotLight.uuid ,{ type: "application/octet-stream" });
                    groupClient
                        .create(file)
                        .then((groupEntity) => {
                            addGroup(groupEntity);
                        })
                        .catch((exception) => {
                            new Error(exception.toString());
                        })
                },
                (error) => {
                    console.log('error',error);
                },
                {
                    binary: true
                }
            );

        }
    }];
    const selectedMenu: MenuItem[] = [{
        name: MenuType.REMOVE,
        onClick: () => {
            if(selectedGroupId){
                groupClient.remove(selectedGroupId)
                    .then((groupEntity) => {
                        console.log("=>(object-list-side-menu.tsx:63) groupENtity", groupEntity);
                        removeGroup(groupEntity)
                    });
            }
        }
    }];
    const transformMenu: MenuItem[] = [{
        name: TransformMode.Translate,
        onClick: () => {
            setTransformMode(TransformMode.Translate)
        }
    },{
        name: TransformMode.Rotate,
        onClick: () => {
            setTransformMode(TransformMode.Rotate)
        }
    },{
        name: TransformMode.Scale,
        onClick: () => {
            setTransformMode(TransformMode.Scale)
        }
    }];
    const defaultBottomMenu: MenuItem[] = [{
        name: 'Export Exhibit',
        onClick: () => {
            if(exportSyncStatus === ExportSyncStatus.IDLE){
                setExportSyncStatus(ExportSyncStatus.PENDING);
            }
        }
    }]
    const initMenuItem: MenuItem[][] = [
        defaultMenu,
        defaultBottomMenu
    ]
    const [menuItem, setMenuItem] = useState<MenuItem[][]>(initMenuItem);
    useEffect(() => {

        if(selectedGroupId === null && initMenuItem !== menuItem){
            setMenuItem(initMenuItem);
        }else if(selectedGroupId !== null){
            setMenuItem([
                defaultMenu,
                selectedMenu,
                transformMenu,
                defaultBottomMenu
            ]);
        }

    },[selectedGroupId])

    return <SideMenu
        menuItems={menuItem}
        onClick={() => {}}
        hideTopButton={true}
    />
}