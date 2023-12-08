import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, Html} from "@react-three/drei";
import MeshesStore from "../store/meshes.store";
import {Fragment, useMemo, useRef, useState} from "react";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshFactory from "../clients/factories/exhibit-mesh.factory";
import Surface from "./Surface";
import {MeshProps} from "@react-three/fiber";
import {floorSize} from "../config";
import {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";
import EditSidebar from "../lib/edit-controls/edit-sidebar";
import MeshEditControls from "../lib/edit-controls/mesh-edit.controls";
import EditTransformControls from "../lib/edit-controls/transform.controls";
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
    const transformControls = useRef<any>(null);

    useMemo(() => {
        merge(exhibitEntities.map((exhibitEntity) => {
            const exhibitMeshFactory = new ExhibitMeshFactory(exhibitEntity);
            return exhibitMeshFactory.get();
        }));

    },[exhibitEntities, merge])




    
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
                    <EditTransformControls ref={transformControls} object={selected} />
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