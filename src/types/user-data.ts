export interface UserDataSpotLight {
	uuid: string
	castShadow : boolean,
	angle: number,
	distance: number,
	intensity: number,
	shadow: {
		mapSize: {
			width: number,
			height: number
		},
		camera: {
			near: number,
			far: number,
			fov: number
		}
	},
	helper: {
		show: boolean,
		color: number
	}
}