import {forwardRef, MutableRefObject, Ref, useEffect, useMemo, useRef, useState} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {
    runTransformControls, useTransformControls
} from "../../context/transform-controls.context";
import { TransformMode } from "../../types/transform";
import {useRecoilState} from "recoil";
import {groupAtom} from "../../store/recoil/groups.recoil";
import {Group, Object3D} from "three";
import GroupService from "../../services/group.service";
import GeometryService from "../../services/geometry.service";;
import {transformModeAtom} from "../../store/recoil/transform-mode.recoil";
import ExhibitClient from "../../clients/exhibit.client";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import {useThree} from "@react-three/fiber";
import GroupClient from "../../clients/group.client";

interface EditTransformControlsProps extends TransformControlsProps {
    object:  Group
}


const groupService = new GroupService();
const groupClient = new GroupClient();
const exhibitClient = new ExhibitClient();
const exporter = new GLTFExporter();
const EditTransformControls = forwardRef((props: EditTransformControlsProps, ref) => {

    const object = props.object;

    const [, setGroup] = useRecoilState(groupAtom(object.uuid));
    const [transformMode] = useRecoilState(transformModeAtom);
    const transformControls = useTransformControls();
    const {scene} = useThree();


    const handleMouseUp = () => {

        const updateObject = scene.getObjectById(object.id)

        if(updateObject instanceof Object3D){
            // object.userData = {
            //     position : object.position
            // }
            exporter.parse(
                updateObject,
                (gltf) => {
                    groupClient.update(object.uuid, gltf as ArrayBuffer);
                },
                (error) => {
                    console.log("=>(transform.controls.tsx:45) error", error);
                },
                {
                    trs: true,
                    binary: true,
                    onlyVisible: false,
                    includeCustomExtensions: true
                }
            )
        }

    }

    useEffect(()=> {
        runTransformControls(
            transformControls,
            (transformControls) => {
                transformControls?.setMode(transformMode);
            }
        )
    },[transformMode])

    useEffect(() => {
        runTransformControls(
            transformControls,
            (transformControls) => {
                console.log("=>(transform.controls.tsx:82) object", object);
                // object.children.forEach((child) => {
                //     if(child.userData.position){
                //         console.log("=>(transform.controls.tsx:81) child.position", child.userData.position);
                //
                //         transformControls.position.copy(child.position);
                //     }
                // })

                // transformControls.position.copy(object.children[0].position);
                transformControls?.addEventListener('mouseUp',handleMouseUp);
            }
        )
        return () => {
            runTransformControls(
                transformControls,
                (transformControls) => {
                    transformControls?.removeEventListener('mouseUp',handleMouseUp);
                }
            )
        }
    },[transformControls])





    return (

            <TransformControls
                ref={transformControls}
                {...props}
            />


    );
});
EditTransformControls.displayName = "EditTransformControls";
export default EditTransformControls;