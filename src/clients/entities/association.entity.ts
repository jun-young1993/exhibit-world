import MaterialEntity from "./material.entity";

export default interface AssociationEntity {
    id: string
    material: MaterialEntity[]
}