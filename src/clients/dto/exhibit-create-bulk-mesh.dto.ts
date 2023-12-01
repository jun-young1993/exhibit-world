import ExhibitGeometryEntity from "../entities/exhibit-geometry.entity";
import ExhibitMaterialEntity from "../entities/exhibit-material.entity";
import ExhibitMeshEntity from "../entities/exhibit-mesh.entity";
import ExhibitMeshFactory from "../factories/exhibit-mesh.factory";

export default class CreateBulkMeshDto {
	mesh: ExhibitMeshEntity;
	geometry: ExhibitGeometryEntity;
	material: ExhibitMaterialEntity;
	texture: null;
	constructor(exhibitMeshEntity: ExhibitMeshEntity){
		this.mesh = exhibitMeshEntity;
		this.geometry = exhibitMeshEntity.geometry;
		this.material = exhibitMeshEntity.material;
		this.texture = null;
	}
}