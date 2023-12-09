import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, Html} from "@react-three/drei";
import MeshesStore from "../store/meshes.store";
import {Fragment, Ref, useMemo, useRef, useState} from "react";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshFactory from "../clients/factories/exhibit-mesh.factory";
import Surface, {SurfaceProps} from "./Surface";
import {MeshProps} from "@react-three/fiber";
import {floorSize} from "../config";
import {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";
import EditSidebar from "../lib/edit-controls/edit-sidebar";
import MeshEditControls from "../lib/edit-controls/mesh-edit.controls";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import {TransformControl} from "../types/transform";
import Test from "../test";
import GltfSurface, {GltfSurfaceProps} from "./GltfSurface";
import {GltfEntity} from "../clients/entities/gltf.entity";
import {isEmpty} from "lodash";
import {useTransformControls} from "../context/transform-controls.context";
import ReactDOM from "react-dom";
const meshClient = new MeshClient();

function useMeshes() {
    const [exhibitEntities, setExhibitEntities] = useState<ExhibitMeshEntities>([]);

    useMemo(() => {

        meshClient.findAll()
            .then((result) => {
                setExhibitEntities(result);
            })
            .catch((error) => {
                console.log(error);
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
    const transformControls = useTransformControls();

    useMemo(() => {
        merge(exhibitEntities.map((exhibitEntity) => {

            const exhibitMeshFactory = new ExhibitMeshFactory(exhibitEntity);
            return exhibitMeshFactory.get();
        }));

    },[exhibitEntities, merge])





    return (
        <>
            {/*<directionalLight position={[0, 20, 0]} intensity={1} />*/}
            {Array.from(meshes.entries()).map(([uuid, mesh])=>{
                const meshProps = mesh as unknown as SurfaceProps;
                // return (
                //     <Surface
                //         key={uuid}
                //         {...meshProps}
                //     />
                // );
                if(mesh.userData?.gltf?.id) {
                    return (
                        <GltfSurface
                            key={uuid}
                            {...meshProps}
                            userData={{
                                gltf : mesh.userData.gltf
                            }}
                        />
                    )
                }else{
                    return (
                        <Surface
                            key={uuid}
                            {...meshProps}
                        />
                    )
                }

            })}
            {
                (selected &&
                    <EditTransformControls object={selected} />
                )
            }
            <Test />
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />

            <gridHelper args={[floorSize, floorSize]}/>
            <Html
                zIndexRange={[90000000,90000001]}
                fullscreen={true}
            >
                <span className={"flex justify-between"}>
                    <EditSidebar />
                    {selected &&
                        <Fragment
                            key={selected.uuid}
                        >
                            <MeshEditControls
                                mesh={selected}
                                transformControls={transformControls}
                            />
                        </Fragment>
                    }
                </span>
            </Html>
            {/*<Stats />*/}
        </>
    )
}