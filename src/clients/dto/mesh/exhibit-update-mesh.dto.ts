import {MeshPropsEntity} from "../../entities/exhibit-mesh.entity";

export interface UpdateMeshDtoInterface extends Partial<MeshPropsEntity>{
	gltfId?: string
}

export default class UpdateMeshDto {
	constructor(property: UpdateMeshDtoInterface) {
		Object.assign(this,property);
	}
}
