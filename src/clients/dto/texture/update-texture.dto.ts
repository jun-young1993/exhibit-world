import TextureEntity from "../../entities/texture.entity";

export interface UpdateTextureInterface extends Partial<TextureEntity>{}
export default class UpdateTextureDto {
    constructor(property: UpdateTextureInterface) {
        Object.assign(this,property);
    }
}