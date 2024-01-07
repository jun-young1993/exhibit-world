import GroupClient from "../clients/group.client";
import {button, useControls} from "leva";
import useSelectedGroupHook from "../store/recoil/select-group.recoil";
import {useAddGroupHook, useRemoveGroupHook} from "../store/recoil/groups.recoil";
import {glbPluginFile} from "../lib/liva-plugin/glb-file-picker/glb-file-picker";
import GithubStorageClient from "../clients/github-storage.client";
import {useEffect, useState} from "react";

const groupClient = new GroupClient();
const githubStorageClient = new GithubStorageClient();
export default function useEditBaseControls(){
    const selected = useSelectedGroupHook();
    const addGroup = useAddGroupHook();
    const removeGroup = useRemoveGroupHook();
    const [file, setFile] = useState<File | null>(null);
    const handleRemoveObject = () => {
        if(selected){
            groupClient.remove(selected.uuid)
                .then((groupEntity) => {
                    removeGroup(groupEntity);
                })
        }
    }
    const handleAddObject = (file: any) => {
        if(!(file instanceof File)){
            new Error('invalid File type error');
        }
        setFile(file);
    }

    const [, set] = useControls('controls', () => ({
        ADD: glbPluginFile({onChange: handleAddObject}),
        REMOVE: button(handleRemoveObject),

    }),[selected])

    useEffect(() => {
        if(file){
            githubStorageClient
                .upload(file)
                .then((groupEntity) => {
                    addGroup(groupEntity);
                    set({
                        ADD: undefined
                    });
                    setFile(null);


                })
                .catch((exception) => {
                    new Error(exception.toString());
                })
        }

    },[file])
}