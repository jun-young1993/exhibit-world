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
import {useTransformControls} from "../context/transform-controls.context";
import TooltipMenu from "./tooltip-menu";
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
    const transformControls = useTransformControls();

    useMemo(() => {
        merge(exhibitEntities.map((exhibitEntity) => {

            const exhibitMeshFactory = new ExhibitMeshFactory(exhibitEntity);
            return exhibitMeshFactory.get();
        }));

    },[exhibitEntities, merge])

    return (
        <>
            {Array.from(meshes.entries()).map(([uuid, mesh])=>{
                const meshProps = mesh as unknown as SurfaceProps;
                return (
                    <Surface
                        key={uuid}
                        {...meshProps}
                    />
                );
            })}
            {
                (selected &&
                    <EditTransformControls object={selected} />
                )
            }

            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />

            <gridHelper args={[floorSize, floorSize]}/>
            <Html
                zIndexRange={[90000000,90000001]}
                fullscreen={true}
            >

                <span className={"flex justify-between w-full h-full"}>
                    <EditSidebar />
                    {selected &&
                        <Fragment
                            key={selected.uuid}
                        >
                            <MeshEditControls
                                key={selected.uuid}
                                mesh={selected}
                                transformControls={transformControls}
                            />
                            <TooltipMenu
                                mesh={selected}
                            />
                        </Fragment>
                    }
                </span>
            </Html>
        </>
    )
}