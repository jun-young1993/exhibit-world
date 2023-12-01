import ExhibitGeometryEntity from "../entities/exhibit-geometry.entity";
import ExhibitMaterialEntity from "../entities/exhibit-material.entity";
import ExhibitMeshEntity from "../entities/exhibit-mesh.entity";
import ExhibitMeshFactory from "../factories/exhibit-mesh.factory";

export interface CreateUpdateMeshDtoInterface extends Partial<ExhibitMeshEntity>{}

export default class CreateUpdateMeshDto {
	constructor(property: CreateUpdateMeshDto) {
		Object.assign(this,property);
	}
}