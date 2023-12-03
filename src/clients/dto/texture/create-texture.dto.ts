import {ImageEntity} from "../../entities/image.entity";

export default class CreateTextureDto {
    constructor(image:ImageEntity) {
        this.image = image;
    }
    image: ImageEntity
}