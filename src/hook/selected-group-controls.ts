import {button, folder, useControls} from "leva";
import {Group, Mesh, Object3D} from "three";
import {runTransformControls, useTransformControls} from "../context/transform-controls.context";
import {TransformMode} from "../types/transform";
import {useEffect, useState} from "react";
import {useAddGroupHook, useRemoveGroupHook} from "../store/recoil/groups.recoil";
import GroupClient from "../clients/group.client";
import useSelectedGroupHook from "../store/recoil/select-group.recoil";


enum ControlsAddType  {
    DEFAULT = 'default',
    CANVAS = 'canvas'
}
interface SelectedGroupControls {

}
const groupClient = new GroupClient();
export default function useSelectedGroupControls(props: SelectedGroupControls)
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
    const [{add}, setAddControls] = useControls('controls', () => ({
        add: {
            value: 'none',
            options: Object.values(ControlsAddType)
        },
        remove: button(handleRemoveObject)
    }),[selected])

    const transform = useControls("transform", {
        mode: {
            value: TransformMode.Translate,
            options: Object.values(TransformMode),
        }
    });

    // useSelectedObjectControls();

    useEffect(() => {
        console.log(selected);
        runTransformControls(
            transformControls,
            (transformControls) => {
                transformControls?.setMode(transform.mode);
            }
        )
    },[transform.mode])


    useEffect(() => {
        if(add === ControlsAddType.DEFAULT){
            groupClient.createDefault()
                .then((groupEntity) => {
                    addGroup(groupEntity);
                    setAddControls({add : 'none'})
                })
        }
    },[add])
    return {
        transform : transform
    }
}