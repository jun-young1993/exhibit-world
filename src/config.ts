import { getEnv } from "get-config-value";
import { UserDataSpotLight } from "types/user-data";

// export const serverDomain = 'http://158.180.82.177:80';
export const serverDomain = getEnv('APP_HOST');

// THREE
// CANVAS SIZE
export const floorSize = 10000;
// 카메라 시야 끝 범위
export const cameraFar = floorSize + (floorSize /2);


export const objectDefalutValues: {
	spotLight: UserDataSpotLight
} = {
	spotLight: {
		uuid: "",
		castShadow : true,
		angle: 0.5,
		distance: 30,
		intensity: 500,
		shadow: {
			mapSize: {
				width: 1024,
				height: 1024
			},
			camera: {
				near: 500,
				far: 4000,
				fov: 30
			}
		},
		helper: {
			show: true,
			color: 0xff0000
		}

	}
}