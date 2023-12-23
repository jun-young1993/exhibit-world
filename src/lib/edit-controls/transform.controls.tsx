import {forwardRef, MutableRefObject, Ref, useEffect, useMemo, useRef} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {
    runTransformControls,
    useTransformControls
} from "../../context/transform-controls.context";
import {TransformControl} from "../../types/transform";
import {useRecoilState} from "recoil";
import {groupAtom} from "../../store/recoil/groups.recoil";
import {Object3D, Object3DEventMap} from "three";
import {getJsonFromObject3D} from "../../utills/mesh-info.utills";
import GroupClient from "../../clients/group.client";
import UpdateGroupDto from "../../clients/dto/group/update-group.dto";

const groupClient = new GroupClient();

interface EditTransformControlsProps extends TransformControlsProps {
    object:  Object3D
}

const EditTransformControls = forwardRef((props: EditTransformControlsProps, ref) => {

    const object = props.object;

    const [group, setGroup] = useRecoilState(groupAtom(object.uuid))
    const transformControls = useTransformControls();

    const handleMouseUp = () => {
        const updateObject = {
            ...group,
            ...getJsonFromObject3D(object)
        };

        groupClient.update(
            object.uuid,
            new UpdateGroupDto(getJsonFromObject3D(object))
        )
            .then((response) => {
            // 에러 발생시 원복
                setGroup(updateObject);
            })
            .catch((exception) => {
                // 에러 발생시 원복
            });




    }
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