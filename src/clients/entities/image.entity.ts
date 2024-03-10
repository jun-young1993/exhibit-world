export enum ImageType {
    Texture = 'texture',
    Exhibit = 'exhibit',
    Geometry = 'geometry'
}
export interface ImageEntity {
    id: string,
    name: string,
    path: string,
    purpose: ImageType,
    isActive: boolean,
    createdAt: string,
}