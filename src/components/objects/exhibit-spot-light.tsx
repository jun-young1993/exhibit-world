import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { spotLightUserDataAtom, spotLightUserDatasAtom, useAddSpotLightUserDatasHook } from "store/recoil/spot-light-user-datas.recoil";
import { SpotLight } from "three"
import { UserDataSpotLight } from "types/user-data";

interface ExhibitSpotLightPorps {
	object: SpotLight
}
export default function ExhibitSpotLight(props: ExhibitSpotLightPorps){
	const [object] = useState<SpotLight>(props.object);
	const addSpotLightUserData = useAddSpotLightUserDatasHook();
	const [spotLightUserData] = useRecoilState(spotLightUserDataAtom(object.uuid));
	console.log('spotLightUserData',spotLightUserData);
	
	useEffect(()=>{
		console.log('spotlight object',object)
		object.userData.uuid = object.uuid;
		addSpotLightUserData(object.userData as UserDataSpotLight);
	},[object])


	return <spotLight 
		castShadow 
	/>
}