import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, TransformControls, Stats} from "@react-three/drei";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import MeshesStore from "../store/meshes.store";
import ButtonControls from "../lib/edit-controls/button.controls";
import {Fragment, useEffect, useMemo, useState} from "react";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshFactory from "../clients/factories/exhibit-mesh.factory";
import Surface, {SurfaceProps} from "./Surface";
import {MeshProps} from "@react-three/fiber";
import {floorSize} from "../config";
import {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";


const meshClient = new MeshClient();

function useMeshes() {
    const [meshes, setMeshes] = useState<ExhibitMeshEntities>([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await meshClient.findAll();
                console.log('data',data)
                setMeshes(data)
            }catch(error){
                throw new Error('There was an issue fetching the Mesh data. Please try again.');
            }
        }
        fetchData();
    },[])
    return [meshes, setMeshes];
}


export default function Editor() {
    const { target } = selectedMeshStore();
    const { meshes, set } = MeshesStore();
    // const [ exhibit, setExhibit ] = useMeshes();
    // const [exhibitMeshes, setExhibitMeshes] = useMeshes();
    // useMemo(() => {
    //     set(exhibitMeshes as ExhibitMeshEntities);
    // },[exhibitMeshes])
    // set(data);
    console.log('meshes',meshes);
    return (
        <>
            {meshes.map((exhibitMeshEntity, index) => {
                const meshFactory = new ExhibitMeshFactory(exhibitMeshEntity);
                const meshProps = meshFactory.get() as unknown as MeshProps;
                return (
                        // <Fragment key={exhibitMeshEntity.id}>
                            <Surface
                                key={meshProps.uuid}
                                {...meshProps}
                            />
                        // </Fragment>
                )
            })}
            {target
                ? <EditTransformControls mesh={target} />
                :
                <>
                    <ButtonControls

                    />
                    <OrbitControls/>
                </>
            }
            <gridHelper args={[floorSize, floorSize]}/>
            {/*<Stats />*/}
        </>
    )
}