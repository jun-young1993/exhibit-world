import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, TransformControls, Stats} from "@react-three/drei";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import MeshesStore from "../store/meshes.store";
import ButtonControls from "../lib/edit-controls/button.controls";
import {Fragment, useEffect, useMemo, useState} from "react";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshFactory from "../clients/factories/exhibit-mesh.factory";
import Surface, {SurfaceProps} from "./Surface";
import {MeshProps, useThree} from "@react-three/fiber";
import {floorSize} from "../config";
import {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";
import {Mesh} from "three";


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
    const { selected } = selectedMeshStore();
    const { meshes } = MeshesStore();
    console.log("=>(Editor.tsx:41) selected", selected);
    console.log("=>(Editor.tsx:42) meshes", meshes);
    // const [target, setTarget] = useState<Mesh | null>(null);

    // const [ exhibit, setExhibit ] = useMeshes();
    // const [exhibitMeshes, setExhibitMeshes] = useMeshes();
    // useMemo(() => {
    //     set(exhibitMeshes as ExhibitMeshEntities);
    // },[exhibitMeshes])
    // set(data);

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
            {selected ?
                <EditTransformControls  />
                : <>
                <ButtonControls/>
                </>
            }
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />



            <gridHelper args={[floorSize, floorSize]}/>
            {/*<Stats />*/}
        </>
    )
}