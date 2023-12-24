import {button, useControls} from "leva";
import {Group} from "three";
import {runTransformControls, useTransformControls} from "../context/transform-controls.context";
import {TransformMode} from "../types/transform";
import {useEffect, useState} from "react";
import {useAddGroupHook, useRemoveGroupHook} from "../store/recoil/groups.recoil";
import GroupClient from "../clients/group.client";
import useSelectedGroupHook from "../store/recoil/select-group.recoil";

interface SelectedControls {

}
const groupClient = new GroupClient();
export default function useSelectedControls(props: SelectedControls)
{
    const selected = useSelectedGroupHook();

    const transformControls = useTransformControls();
    const addGroup = useAddGroupHook();
    const removeGroup = useRemoveGroupHook();


    const handleRemoveObject = () => {
        if(selected){
            groupClient.remove(selected.uuid)
                .then((groupEntity) => {
                    removeGroup(groupEntity);
                })
        }
    }

    useControls('controls',{
        add: button((get) => {
            groupClient.createDefault()
                .then((groupEntity) => {
                    addGroup(groupEntity);
                })
        }),
        remove: button(handleRemoveObject)
    },
        [selected]);

    const transform = useControls("transform", {
        mode: {
            value: TransformMode.Translate,
            options: Object.values(TransformMode),
        }
    });

    useEffect(() => {
        runTransformControls(
            transformControls,
            (transformControls) => {
                transformControls?.setMode(transform.mode);
            }
        )
    },[transform.mode])

    return {
        transform : transform
    }
}