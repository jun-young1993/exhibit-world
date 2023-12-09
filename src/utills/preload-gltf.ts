import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Mesh} from "three";
import GltfClient from "../clients/gltf.client";
import {SurfaceProps} from "../components/Surface";

const gltfLoader = new GLTFLoader();
const gltfClient = new GltfClient();
export default function PreloadGltf(
    mesh: Mesh | SurfaceProps,
    onSuccess: (arg0: GLTF, arg1: Mesh) => void)
{
    if(mesh.userData.gltf && 'id' in mesh.userData.gltf) {
        console.log(mesh.uuid, mesh.userData.gltf);

        gltfLoader.load(
            gltfClient.getGltfFileUrl(mesh.userData.gltf.id),
            (glb) => {
                const glbMesh = glb.scene.children[0].children[0].children[0] as Mesh;
                onSuccess(glb,glbMesh);
            },
            (event) => {
                console.log(mesh.uuid, 'progress', event)
            },
            (error) => {
                console.log(mesh.uuid, 'error', error)
            },
        )
    }
}