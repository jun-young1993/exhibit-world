import {ExhibitEntity} from "../../entities/exhibit.entity";

export interface PatchExhibitDtoInterface {
    name?: ExhibitEntity['name']
}