import {useParams} from "react-router-dom";
import {Canvas, ThreeEvent} from "@react-three/fiber";
import {cameraFar} from "../config";
import {Suspense, useEffect, useState} from "react";
import CanvasLoader from "./CanvasLoader";
import {TransformControlsProvider} from "../context/transform-controls.context";
import Editor from "./Editor";
import GithubStorageClient from "../clients/github-storage.client";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls, Sky} from "@react-three/drei";
const githubStorageClient = new GithubStorageClient();
const gltfLoader = new GLTFLoader();
export default function Exhibit() {
    const { uuid }= useParams();
    const [object, setObject] = useState<GLTF | null>(null)
    console.log("=>(exhibit.tsx:17) object", object);
    useEffect(() => {
        if (typeof uuid === "string") {
            githubStorageClient.findOne(uuid)
                .then((content) => {
                    gltfLoader.load(content.download_url,(gltf) => {
                        setObject(gltf);
                    })
                })

        }
    },[])

    return <>
        <Canvas
            dpr={[1, 2]}
            shadows camera={{ fov: 45, position: [15, 10, 0], near:0.1, far: cameraFar}}
        >
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={5} />
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    makeDefault
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.75}
                />
                {object &&
                    <primitive
                        object={object.scene}
                        castShadow={true}
                        position={[0,0,0]}
                        rotation={[0,0,0]}
                        scale={[2,2,2]}
                        receiveShadow={true}
                    />
                }

            </Suspense>
        </Canvas>
    </>
}