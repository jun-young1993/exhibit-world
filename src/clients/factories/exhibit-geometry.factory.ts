import {BoxGeometry, BufferGeometry, ConeGeometry, CylinderGeometry, SphereGeometry, TorusGeometry} from "three";
import ExhibitGeometryEntity, {GeometryType} from "../entities/exhibit-geometry.entity";

export default class ExhibitGeometryFactory {
    constructor(private entity: ExhibitGeometryEntity) {}
    create(){
        let geometry: BufferGeometry;

        switch (this.entity.type) {
            case GeometryType.BoxGeometry:
                geometry = new BoxGeometry(this.entity.width, this.entity.height, this.entity.depth);
                break;
            case GeometryType.SphereGeometry:
                geometry = new SphereGeometry(this.entity.radius);
                break;
            case GeometryType.ConeGeometry:
                geometry = new ConeGeometry(this.entity.radius, this.entity.height);
                break;
            case GeometryType.CylinderGeometry:
                geometry = new CylinderGeometry(this.entity.radius, this.entity.radius, this.entity.height);
                break;
            case GeometryType.TorusGeometry:
                geometry = new TorusGeometry(this.entity.radius, this.entity.width);
                break;
            default:
                    throw Error(`${this.entity.type}: Geometry was not correctly generated`)
                break;
        }

        geometry.uuid = this.entity.id;
        return geometry;
    }
    get(){
        return this.create();
    }
}