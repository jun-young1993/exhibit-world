import {button, useControls} from "leva";
import MeshesStore, {MeshesStoreInterface} from "../../store/meshes.store";
import Surface_backup from "../../components/Surface_backup";
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
            const defaultExhibitMeshEntity = new DefaultExhibitMeshEntity();
            const exhibitMeshFactory = new ExhibitMeshFactory(defaultExhibitMeshEntity);

            props.set(exhibitMeshFactory.get());
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