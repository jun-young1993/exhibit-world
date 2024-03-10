import Client from "./client";
import {GltfEntity} from "./entities/gltf.entity";




export default class GltfClient extends Client {

    constructor() {
        super({
            prefix: '/api/v1/gltf'
        });
    }

    findAll(): Promise<GltfEntity[] | []>
    {
        return new Promise((resolve, reject) => {
            this.fetch(``,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    resolve(response)
                })
                .catch((exception) => reject(exception));
        })
    }

    getGltfFileUrl(uuid: string): string
    {
        return this.getUrl(`/file/${uuid}`)
    }


}