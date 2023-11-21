import {useEffect, useMemo, useState} from "react";
import { useControls } from "leva";
import {EditControlsInterface} from "./edit.controls";

import {
    BoxGeometry,
    BufferGeometry, CircleGeometry,
    ConeGeometry,
    CylinderGeometry, DodecahedronGeometry, IcosahedronGeometry,
    Mesh, OctahedronGeometry,
    PlaneGeometry, RingGeometry,
    SphereGeometry, TetrahedronGeometry,
    TorusGeometry, TorusKnotGeometry
} from "three";
enum GeometryControlsType {
    BoxGeometry = 'BoxGeometry',
    SphereGeometry = 'SphereGeometry',
    CylinderGeometry = 'CylinderGeometry',
    ConeGeometry = 'ConeGeometry',
    TorusGeometry = 'TorusGeometry',
    PlaneGeometry = 'PlaneGeometry',
    TetrahedronGeometry = 'TetrahedronGeometry',
    OctahedronGeometry = 'OctahedronGeometry',
    DodecahedronGeometry = 'DodecahedronGeometry',
    IcosahedronGeometry = 'IcosahedronGeometry',
    CircleGeometry = 'CircleGeometry',
    RingGeometry = 'RingGeometry',
    TorusKnotGeometry = 'TorusKnotGeometry',
    BufferGeometry = 'BufferGeometry', // 일반적인 기하 모델의 베이스 클래스
    // 추가적으로 필요한 다른 기하 모델들
}

const GeometryClasses = {
    BoxGeometry: BoxGeometry,
    SphereGeometry: SphereGeometry,
    CylinderGeometry: CylinderGeometry,
    ConeGeometry: ConeGeometry,
    TorusGeometry: TorusGeometry,
    PlaneGeometry: PlaneGeometry,
    TetrahedronGeometry: TetrahedronGeometry,
    OctahedronGeometry: OctahedronGeometry,
    DodecahedronGeometry: DodecahedronGeometry,
    IcosahedronGeometry: IcosahedronGeometry,
    CircleGeometry: CircleGeometry,
    RingGeometry: RingGeometry,
    TorusKnotGeometry: TorusKnotGeometry,
    BufferGeometry: BufferGeometry,
};
export function GeometryControlsOptions(mesh?: Mesh | undefined){
    const geometry = mesh?.geometry;
    return {
        geometry: {
            value: geometry ? geometry.type : GeometryControlsType.BoxGeometry,
            // value: "BoxGeometry",
            options: Object.values(GeometryControlsType),
            onChange: (geometryType: GeometryControlsType) => {
                if(mesh){
                    mesh.geometry = new GeometryClasses[geometryType]()
                }

            }
        },
    }
}
export default function GeometryControls(props?: Partial<EditControlsInterface>){
    const mesh = props?.mesh;
    const geometry = mesh?.geometry;


    const name = 'Geometry';

    const options = useMemo(() => {

        return GeometryControlsOptions(mesh);
    },[mesh])



    const [,set]  = useControls(() => {
        return options;
    });
    useEffect(() => {
        set({
            geometry: geometry ? geometry.type : GeometryControlsType.BoxGeometry
        })
    },[geometry])




    return <></>;
}