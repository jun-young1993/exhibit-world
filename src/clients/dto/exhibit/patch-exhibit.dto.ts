import {ExhibitEntity} from "../../entities/exhibit.entity";

export interface PatchExhibitDtoInterface {
    name?: ExhibitEntity['name']
    isPublic?: ExhibitEntity['isPublic']
}