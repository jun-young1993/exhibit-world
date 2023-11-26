import { v4 as uuid } from "uuid";

export enum GeometryType {
    BoxGeometry = 'BoxGeometry',
    SphereGeometry = 'SphereGeometry',
    ConeGeometry = 'ConeGeometry',
    CylinderGeometry = 'CylinderGeometry',
    TorusGeometry = 'TorusGeometry'
}

export default interface ExhibitGeometryEntity {
    depth: number
    height: number
    id: string
    radius: number
    type: string
    width: number
}

export class DefaultExhibitGeometryEntity<ExhibitGeometryEntity> {
    depth= 5;
    height= 5;
    id= uuid();
    radius= 5;
    type= GeometryType.BoxGeometry;
    width= 5;
}