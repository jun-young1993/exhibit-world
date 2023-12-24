import {forwardRef, MutableRefObject, Ref, useEffect, useMemo, useRef, useState} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {
    runTransformControls,
    useTransformControls
} from "../../context/transform-controls.context";
import {TransformControl, TransformMode} from "../../types/transform";
import {useRecoilState} from "recoil";
import {groupAtom} from "../../store/recoil/groups.recoil";
import {Box3, Group, Mesh, Object3D, Object3DEventMap, Vector3} from "three";
import {getJsonFromGeometry, getJsonFromObject3D} from "../../utills/mesh-info.utills";
import GroupClient from "../../clients/group.client";
import UpdateGroupDto from "../../clients/dto/group/update-group.dto";
import {useControls} from "leva";
import GroupService from "../../services/group.service";
import GeometryService from "../../services/geometry.service";
import {useThree} from "@react-three/fiber";

const groupClient = new GroupClient();

interface EditTransformControlsProps extends TransformControlsProps {
    object:  Group
}


const groupService = new GroupService();
const geometryService = new GeometryService();
const EditTransformControls = forwardRef((props: EditTransformControlsProps, ref) => {

    const object = props.object;

    const {scene} = useThree();



    const [group, setGroup] = useRecoilState(groupAtom(object.uuid))

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

    const {mode} = useControls("transform", {
        mode: {
            value: TransformMode.Translate,
            options: Object.values(TransformMode),
        }
    });

    useEffect(() => {
        runTransformControls(
            transformControls,
            (transformControls) => {
                transformControls?.setMode(mode);
            }
        )
    },[mode])

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

export default EditTransformControls;