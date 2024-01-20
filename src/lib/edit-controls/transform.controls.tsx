import {forwardRef, MutableRefObject, Ref, useEffect, useMemo, useRef, useState} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {
    runTransformControls, useTransformControls
} from "../../context/transform-controls.context";
import { TransformMode } from "../../types/transform";
import {useRecoilState} from "recoil";
import {groupAtom} from "../../store/recoil/groups.recoil";
import { Group } from "three";
import GroupService from "../../services/group.service";
import GeometryService from "../../services/geometry.service";;
import {transformModeAtom} from "../../store/recoil/transform-mode.recoil";

interface EditTransformControlsProps extends TransformControlsProps {
    object:  Group
}


const groupService = new GroupService();
const EditTransformControls = forwardRef((props: EditTransformControlsProps, ref) => {

    const object = props.object;

    const [, setGroup] = useRecoilState(groupAtom(object.uuid));
    const [transformMode] = useRecoilState(transformModeAtom);
    const transformControls = useTransformControls();

    const handleMouseUp = () => {
        runTransformControls(transformControls,(transformControls) => {
                groupService.update(object)
                    .then((updatedGroup) => {
                        setGroup(updatedGroup);
                    })
                    .catch((exception) => {
                        console.log(exception);
                    });
        })
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