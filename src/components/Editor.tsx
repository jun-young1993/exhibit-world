import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, Html} from "@react-three/drei";
import MeshesStore from "../store/meshes.store";
import {Fragment, Ref, useEffect, useMemo, useRef, useState} from "react";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshFactory from "../clients/factories/exhibit-mesh.factory";
import Surface_backup, {SurfaceProps} from "./Surface_backup";
import {floorSize} from "../config";
import {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";
import EditSidebar from "../lib/edit-controls/edit-sidebar";
import MeshEditControls from "../lib/edit-controls/mesh-edit.controls";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import {useTransformControls} from "../context/transform-controls.context";
import {isArray, isNull} from "lodash";
import GroupClient from "../clients/group.client";
import {GroupEntity} from "../clients/entities/group.entity";
import GroupSurface from "./group-surface";
import {RecoilRoot, useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {groupIdsAtom, useAddGroupHook} from "../store/recoil/groups.recoil";
import {selectedGroupSelector} from "../store/recoil/select-group.recoil";
import {useThree} from "@react-three/fiber";
import {Mesh, Object3D} from "three";

import useSelectedGroupHook from "../hook/selected-group.hook";

const meshClient = new MeshClient();
const groupClient = new GroupClient();


export default function Editor() {

    // mesh 의 상태가 변경될때마다 업데이트 해줘야함
    // 새로고침 전에 다른곳 리랜더링되면 돌아감
    const groupIds = useRecoilValue(groupIdsAtom);
    const addGroup = useAddGroupHook();
    const selected = useSelectedGroupHook();

    console.log(groupIds);


    return (
        <>
            {groupIds.map((groupIds) => {

                return (
                    <GroupSurface key={groupIds} uuid={groupIds} />
                )
            })}
            {
                (selected &&
                    <EditTransformControls object={selected} uuid={selected.uuid}/>
                )
            }

            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />

            <gridHelper args={[floorSize, floorSize]}/>
            <Html
                zIndexRange={[90000000,90000001]}
                fullscreen={true}
            >
                    <span className={"flex justify-between w-full h-full"}>
                        <EditSidebar
                            onAdd={() => {
                                groupClient.createDefault()
                                    .then((groupEntity) => {
                                        addGroup(groupEntity);
                                    })
                            }}
                        />
                        {/*{selected &&*/}
                        {/*    <Fragment*/}
                        {/*        key={selected.uuid}*/}
                        {/*    >*/}
                        {/*        <MeshEditControls*/}
                        {/*            key={selected.uuid}*/}
                        {/*            mesh={selected as Mesh}*/}
                        {/*            transformControls={transformControls}*/}
                        {/*        />*/}
                        {/*    </Fragment>*/}
                        {/*}*/}
                    </span>
            </Html>
        </>
    )
}