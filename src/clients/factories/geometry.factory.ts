import {BoxGeometry, BufferGeometry, ConeGeometry, CylinderGeometry, SphereGeometry, TorusGeometry} from "three";

import GeometryEntity, {GeometryType} from "../entities/geometry.entity";
import GeometryClient from "../geometry.client";
const geometryClient = new GeometryClient();
export default class GeometryFactory {
    constructor(private entity: GeometryEntity) {}

    /**
     *
     * @param geometryType
     */
    createGeometry(geometryType: GeometryType): BufferGeometry
    {
        let geometry: BufferGeometry;
        switch (geometryType) {
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
            case GeometryType.BufferGeometry:
                geometry = new BufferGeometry();
                break;
            default:
                throw Error(`${this.entity.type}: Geometry was not correctly generated`)
                break;
        }
        // geometryClient.getAttribute(this.entity.id,'position')
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch((reject) => {
        //         console.log(reject);
        //     })

        return geometry;
    }

    create(){
        let geometry: BufferGeometry = this.createGeometry(this.entity.type as GeometryType);

        geometry.uuid = this.entity.id;
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        return geometry;
    }
    get(){
        return this.create();
    }
}