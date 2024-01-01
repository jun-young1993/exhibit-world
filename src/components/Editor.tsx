import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, Html} from "@react-three/drei";
import MeshClient from "../clients/mesh.client";
import {floorSize} from "../config";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import GroupClient from "../clients/group.client";
import GroupSurface from "./group-surface";
import {RecoilRoot, useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {groupIdsAtom, useAddGroupHook} from "../store/recoil/groups.recoil";
import {ThreeEvent, useFrame, useThree} from "@react-three/fiber";
import useSelectedGroupControls from "../hook/selected-group-controls";
import useSelectedGroupHook from "../store/recoil/select-group.recoil";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useEffect, useState} from "react";


const meshClient = new MeshClient();
const groupClient = new GroupClient();


export default function Editor() {
    const groupIds = useRecoilValue(groupIdsAtom);


    const selected = useSelectedGroupHook();

    const selectedControls = useSelectedGroupControls({

    });

    // useEffect(() => {
    //     const gltfLoader = new GLTFLoader();
    //     const url = 'http://localhost:3000/api/v1/gltf/file/2f376b99-6198-4c96-b8d4-281f3da0e559';
    //     gltfLoader.load(
    //         url,
    //         (gltf) => {
    //             // gltf.scene
    //             console.log(gltf);
    //
    //         }
    //     )
    // },[])







    return (
        <>
            {groupIds.map((groupIds) => {

                return (
                    <GroupSurface key={groupIds} uuid={groupIds} selected={groupIds === selected?.uuid}/>
                )
            })}
            {
                (selected
                        ? <EditTransformControls object={selected} />
                        : <></>
                )
            }

            <OrbitControls
                target={selected ? selected.position : undefined}
                makeDefault
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 1.75}
                onClick={() => {
                    console.log('obnCLick')
                }}
                onPointerDown={() => {
                    console.log('onPointer down');
                }}
                onPointerUp={(event: ThreeEvent<MouseEvent>) => {

                  console.log(event);
                }}
            />

            <gridHelper args={[floorSize, floorSize]}/>
                {/*<IconButton*/}
                {/*    icon={<HiCubeTransparent />}*/}
                {/*    description={"front texture image upload"}*/}
                {/*    onChangeFile={(event) => {*/}
                {/*        if(event.target.files instanceof FileList){*/}
                {/*            // console.log(selected);*/}
                {/*            // console.log(event.target.files[0]);*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}

            {/*<Html*/}
            {/*    zIndexRange={[90000000,90000001]}*/}
            {/*    fullscreen={true}*/}
            {/*>*/}
            {/*        <span className={"flex justify-between w-full h-full"}>*/}
            {/*            <EditSidebar*/}
            {/*                onAdd={() => {*/}
            {/*                    groupClient.createDefault()*/}
            {/*                        .then((groupEntity) => {*/}
            {/*                            addGroup(groupEntity);*/}
            {/*                        })*/}
            {/*                }}*/}
            {/*            />*/}
            {/*            /!*{selected &&*!/*/}
            {/*            /!*    <Fragment*!/*/}
            {/*            /!*        key={selected.uuid}*!/*/}
            {/*            /!*    >*!/*/}
            {/*            /!*        <MeshEditControls*!/*/}
            {/*            /!*            key={selected.uuid}*!/*/}
            {/*            /!*            mesh={selected as Mesh}*!/*/}
            {/*            /!*            transformControls={transformControls}*!/*/}
            {/*            /!*        />*!/*/}
            {/*            /!*    </Fragment>*!/*/}
            {/*            /!*}*!/*/}
            {/*        </span>*/}
            {/*</Html>*/}
        </>
    )
}