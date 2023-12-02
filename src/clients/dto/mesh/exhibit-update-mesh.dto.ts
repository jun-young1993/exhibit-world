import {MeshPropsEntity} from "../../entities/exhibit-mesh.entity";

export interface UpdateMeshDtoInterface extends Partial<MeshPropsEntity>{}

export default class UpdateMeshDto {
	constructor(property: UpdateMeshDtoInterface) {
		Object.assign(this,property);
	}
}