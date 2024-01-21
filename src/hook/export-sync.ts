import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {ExportSyncStatus, exportSyncStatusAtom} from "../store/recoil/export-sync-status.recoil";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import {useThree} from "@react-three/fiber";
import ExhibitClient from "../clients/exhibit.client";

const exhibitClient = new ExhibitClient();
/**
 * trs - 부울. 노드당 행렬 대신 위치, 회전 및 크기를 내보냅니다. 기본값은 거짓입니다
 * onlyVisible - 부울. 보이는 개체만 내보냅니다. 기본값은 true입니다.
 * 바이너리 - 부울. 바이너리(.glb) 형식으로 내보내어 ArrayBuffer를 반환합니다. 기본값은 거짓입니다.
 * maxTextureSize - 정수 이미지 최대 크기(너비와 높이 모두)를 지정된 값으로 제한합니다. 기본값은 무한대입니다.
 * 애니메이션 - 배열< AnimationClip >. 내보내기에 포함될 애니메이션 목록입니다.
 * includeCustomExtensions - 부울. 개체 속성에 정의된 사용자 정의 glTF 확장을 내보냅니다. 기본값은 거짓입니다.userData.gltfExtensions
 */
export default function useExportSync(){

    const [exportSyncStatus] = useRecoilState(exportSyncStatusAtom);
    const exporter = new GLTFExporter();
    const {scene} = useThree();
    useEffect(() => {
        if(exportSyncStatus === ExportSyncStatus.PENDING){
            exporter.parse(
                scene,
                (gltf) => {

                    exhibitClient.create(gltf as ArrayBuffer);
                },
                (error) => {
                    console.log("=>(export-sync.ts:23) error", error);
                },
                {
                    trs: true,
                    binary: true,
                    onlyVisible: false
                }
            )
        }
    },[exportSyncStatus])
}