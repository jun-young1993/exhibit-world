import { objectDefalutValues } from "config";
import { atom, atomFamily, selector, selectorFamily, useRecoilCallback } from "recoil";
import { UserDataSpotLight } from "types/user-data";

export const spotLightUserDatasSelector = selector<UserDataSpotLight[] | []>({
	key: 'spotLightUserDatasSelector',
	get: () => []
});
export const spotLightUserDatasAtom = atom<UserDataSpotLight[] | []>({
	key: 'spotLightUserDatasAtom',
	default: spotLightUserDatasSelector
});

export const spotLightUserDataSelector = selectorFamily<UserDataSpotLight, UserDataSpotLight['uuid']>({
	key: 'spotLightUserDataSelector',
	get: (uuid) => ({get}) => {
		const spotLightUserDatas = get(spotLightUserDatasAtom);
		const spotLightUserData = spotLightUserDatas.find((spotLightUserData) => spotLightUserData.uuid === uuid);
		if(spotLightUserData === undefined){
			return objectDefalutValues.spotLight;
		}
		return spotLightUserData;
	}
});

export const spotLightUserDataAtom = atomFamily<UserDataSpotLight, UserDataSpotLight['uuid']>({
	key: 'spotLightUserDataAtom',
	default: spotLightUserDataSelector
});

export function useAddSpotLightUserDatasHook(){
	return useRecoilCallback(
		({snapshot, set}) => 
			(userDataSpotLight: UserDataSpotLight) => {
				const spotLightUserDatas = snapshot.getLoadable(spotLightUserDatasAtom).getValue();
				set(spotLightUserDatasAtom, [...spotLightUserDatas,userDataSpotLight]);
			},
		[]
	)
}

