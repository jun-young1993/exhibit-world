import {ImageEntity} from "./image.entity";

export default interface TextureEntity {
    id: string
    wrapT: number,
    wrapS: number,
    repeatX: number,
    repeatY: number,
    image?: ImageEntity

}