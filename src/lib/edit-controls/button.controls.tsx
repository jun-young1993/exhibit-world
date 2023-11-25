import {button, useControls} from "leva";
import MeshesStore, {MeshesStoreInterface} from "../../store/meshes.store";
import Surface from "../../components/Surface";
import {MutableRefObject, ReactNode, useRef, useState} from "react";
import selectedMeshStore from "../../store/selected-mesh.store";
import {Mesh} from "three";
import ExhibitMeshEntity, {
    DefaultExhibitMeshEntity,
    ExhibitMeshEntities
} from "../../clients/entities/exhibit-mesh.entity";
import ExhibitMeshFactory from "../../clients/factories/exhibit-mesh.factory";
export interface ButtonControlsOptionsEvents {
    set: MeshesStoreInterface['set']
}
export function ButtonControlsOptions(props: ButtonControlsOptionsEvents){
    return {
        add: button((get) => {

            // const mesh = new ExhibitMeshFactory(DefaultExhibitMeshEntity);
            const exhibitMeshEntity = new DefaultExhibitMeshEntity<ExhibitMeshEntity>();
            console.log(exhibitMeshEntity);
            props.set(exhibitMeshEntity);

        }),
    }
}



export default function ButtonControls(){
    const { set } = MeshesStore();

    useControls(() => {
        return ButtonControlsOptions({
            set,
        });
    })
    return <></>
}