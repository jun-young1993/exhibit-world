import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, TransformControls, Stats, Html, TransformControlsProps} from "@react-three/drei";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import MeshesStore from "../store/meshes.store";
import ButtonControls from "../lib/edit-controls/button.controls";
import {Fragment, useEffect, useMemo, useRef, useState} from "react";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshFactory from "../clients/factories/exhibit-mesh.factory";
import Surface, {SurfaceProps} from "./Surface";
import {MeshProps, useThree} from "@react-three/fiber";
import {floorSize} from "../config";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";
import {Camera, Mesh} from "three";
import GeometryControls from "../lib/edit-controls/geometry.controls";
import MaterialControls from "../lib/edit-controls/material.controls";
import EditSidebar from "../lib/edit-controls/edit-sidebar";
import MeshEditControls from "../lib/edit-controls/mesh-edit.controls";
import {ForwardRefComponent} from "@react-three/drei/helpers/ts-utils";


const meshClient = new MeshClient();

function useMeshes() {
    const [exhibitEntities, setExhibitEntities] = useState<ExhibitMeshEntities>([]);

    useMemo(() => {

        meshClient.findAll()
            .then((result) => {
                setExhibitEntities(result);
            })
            .catch((error) => {
                throw new Error(`
                    ${error}: 
                    There was an issue fetching the Mesh data. Please try again.
                `);
            });


    },[])
    return exhibitEntities;
}


export default function Editor() {
    const { selected } = selectedMeshStore();
    const { meshes, merge } = MeshesStore();
    const exhibitEntities = useMeshes();
    const transfromControls = useRef<any>(null);

    useMemo(() => {
        // merge(exhibitEntities.map((exhibitEntity) => {
        //     const exhibitMeshFactory = new ExhibitMeshFactory(exhibitEntity);
        //     return exhibitMeshFactory.get();
        // }));

    },[exhibitEntities, merge])

    console.log("=>(Editor.tsx:53) selected, meshes, exhibitEntities", selected, meshes, exhibitEntities);

    
    return (
        <>
            {Array.from(meshes.entries()).map(([uuid, mesh])=>{
                const meshProps = mesh as unknown as MeshProps;
                return (
                <Surface
                    key={uuid}
                    {...meshProps}
                />
                )
            })}
            {
                (selected &&
                    <TransformControls ref={transfromControls} object={selected} />
                )
                //     <Fragment >
                //         {/*<EditTransformControls  mesh={selected}/>*/}
                //         {/*<GeometryControls mesh={selected}/>*/}
                //         {/*<MaterialControls mesh={selected}/>*/}
                //     </Fragment>
                // : <>

                // </>

            }
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />

            <gridHelper args={[floorSize, floorSize]}/>
            <Html
                zIndexRange={[90000000,90000001]}
                fullscreen={true}
            >
                <span className={"flex justify-between"}>
                    <EditSidebar />
                    {selected &&
                        <MeshEditControls mesh={selected} transformControls={transfromControls}/>
                    }
                </span>
            </Html>
            {/*<Stats />*/}
        </>
    )
}