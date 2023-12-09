import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {BackSide, FrontSide, Group, Mesh, TextureLoader} from "three";
import GltfClient from "../clients/gltf.client";
import {SurfaceProps} from "../components/Surface";
import {getSingleMaterial} from "./mesh-info.utills";
import {createMultiMaterialObject} from "three/examples/jsm/utils/SceneUtils";

const gltfLoader = new GLTFLoader();
const gltfClient = new GltfClient();
export default function PreloadGltf(
    mesh: Mesh | SurfaceProps,
    onSuccess: (arg0: GLTF, arg1: Mesh) => void)
{
    if(mesh.userData.gltf && 'id' in mesh.userData.gltf) {
        gltfLoader.load(
            gltfClient.getGltfFileUrl(mesh.userData.gltf.id),
            (glb) => {
                // blank_canvas.glb 임시
                const glbMesh = glb.scene.children[0].children[0].children[0] as Mesh;
                const material = getSingleMaterial(glbMesh);
                const cloneMaterial = material.clone();
                const imagePath = 'http://localhost:3000/api/v1/images/file/78699463-1e70-43e3-a60a-c434c897b286';
                const texture = new TextureLoader().load(imagePath);
                //@ts-ignore
                // cloneMaterial.map = texture;
                // FrontSide 0
                // BackSide 1
                // cloneMaterial.side = FrontSide;
                // glbMesh.material = cloneMaterial;

                // console.log(glbMesh);
                onSuccess(glb,glbMesh);
            },
            (event) => {
                // console.log(mesh.uuid, 'progress', event)
            },
            (error) => {
                // console.log(mesh.uuid, 'error', error)
            },
        )
    }
}