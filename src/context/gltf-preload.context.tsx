import {useEffect, useState} from "react";
import {GltfEntity} from "../clients/entities/gltf.entity";
import GltfClient from "../clients/gltf.client";
import {useGLTF} from "@react-three/drei";

const gltfClient = new GltfClient();
export function GltfPreload(props: GltfEntity){
    useGLTF(gltfClient.getGltfFileUrl(props.id),true,);
    return null;
}
export function GltfPreloadProvider({children}: any) {
    const [gltfEntities, setGltfEntities] = useState<GltfEntity[] | []>([]);
    useEffect(()=>{
        gltfClient.findAll()
            .then((response: GltfEntity[] | []) => {
                setGltfEntities(response);
            })
            .catch((exception) => {

            })
    },[]);
    return (
      <>
          {gltfEntities.map((gltf) => {
              return <GltfPreload {...gltf} />
          })}
          {children}
      </>
    );
}