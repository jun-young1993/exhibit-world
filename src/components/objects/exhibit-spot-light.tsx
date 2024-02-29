import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { spotLightUserDataAtom, spotLightUserDatasAtom, useAddSpotLightUserDatasHook } from "store/recoil/spot-light-user-datas.recoil";
import {Matrix4, SpotLight, SpotLightHelper, Vector2} from "three"
import { UserDataSpotLight } from "types/user-data";
import {useThree} from "@react-three/fiber";

interface ExhibitSpotLightPorps {
	object: SpotLight
}
export default function ExhibitSpotLight(props: ExhibitSpotLightPorps){
	const [object] = useState<SpotLight>(props.object);
	const addSpotLightUserData = useAddSpotLightUserDatasHook();
	const [spotLightUserData] = useRecoilState(spotLightUserDataAtom(object.uuid));
	const {scene} = useThree()
	
	useEffect(()=>{
		object.userData.uuid = object.uuid;
		addSpotLightUserData(object.userData as UserDataSpotLight);
		if(object.userData.helper.show) {
			const spotLightHelper = new SpotLightHelper(object, object.userData.helper.color);

			scene.add(spotLightHelper);

			return () => {
				scene.remove(spotLightHelper);
			}
		}
	},[object,scene])

	useEffect(() => {
		if(spotLightUserData){
				object.castShadow = spotLightUserData.castShadow;
				object.distance = spotLightUserData.distance;
				object.angle = spotLightUserData.angle;
				object.intensity = spotLightUserData.intensity;
				object.userData = spotLightUserData;
		}
	},[spotLightUserData])



	return (
		<>

		</>
	)
}