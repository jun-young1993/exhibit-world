import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {ExportSyncStatus, exportSyncStatusAtom} from "../store/recoil/export-sync-status.recoil";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import {useThree} from "@react-three/fiber";
import ExhibitClient from "../clients/exhibit.client";
import {gridHelperAtom} from "../store/recoil/grid-helper.recoil";
import {GridHelper, Object3D, SpotLightHelper} from "three";
import { useToast } from "store/recoil/toast.recoil";

const exhibitClient = new ExhibitClient();
const exporter = new GLTFExporter();
/**
 * trs - 부울. 노드당 행렬 대신 위치, 회전 및 크기를 내보냅니다. 기본값은 거짓입니다
 * onlyVisible - 부울. 보이는 개체만 내보냅니다. 기본값은 true입니다.
 * 바이너리 - 부울. 바이너리(.glb) 형식으로 내보내어 ArrayBuffer를 반환합니다. 기본값은 거짓입니다.
 * maxTextureSize - 정수 이미지 최대 크기(너비와 높이 모두)를 지정된 값으로 제한합니다. 기본값은 무한대입니다.
 * 애니메이션 - 배열< AnimationClip >. 내보내기에 포함될 애니메이션 목록입니다.
 * includeCustomExtensions - 부울. 개체 속성에 정의된 사용자 정의 glTF 확장을 내보냅니다. 기본값은 거짓입니다.userData.gltfExtensions
 */
export default function useExportSync(){

    const [exportSyncStatus, setExportSyncStatus] = useRecoilState(exportSyncStatusAtom);
    const {pushToast} = useToast();
    const {scene} = useThree();
    
    function parse()
    {
        return new Promise((resolve, reject) => {
            
            for(const object of scene.children){
                if(object instanceof SpotLightHelper){
                    scene.remove(object);
                }
            }
            scene.children = scene.children.filter((object) => {
                return !(object instanceof SpotLightHelper)
            })

            const cloneScene = scene.clone();
            for(const object of cloneScene.children){
                if(object instanceof GridHelper){
                    cloneScene.remove(object);
                }
            }
            exporter.parse(
                cloneScene,
                (gltf) => {

                    exhibitClient.create(gltf as ArrayBuffer)
                    .then(() => {
                        resolve(null);

                    })
                    .catch((error) => {
                        reject(error.toString());
                    });
                },
                (error) => {
                    reject(error.toString());

                },
                {
                    trs: true,
                    binary: true,
                    onlyVisible: false
                }
            )
        })
    }
    useEffect(() => {
        if(exportSyncStatus === ExportSyncStatus.PENDING){


            parse()
            .then(() => {
                pushToast({
                    content: "Successfully exported the object."
                })
                setExportSyncStatus(ExportSyncStatus.IDLE);
            })
            .catch((error) => {
                pushToast({
                    content: `Failed to export the object. ${error}`
                })
                setExportSyncStatus(ExportSyncStatus.IDLE);
            })




        }
    },[exportSyncStatus])
}