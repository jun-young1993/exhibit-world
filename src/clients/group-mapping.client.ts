import Client from "./client";
import { GroupMappingEntity } from "./entities/group-mapping.entity";



export default class GroupMappingClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/group-mapping'
        });
    }
    /**
     * Relative all Groups
     */
    public findAll(){
        return new Promise<GroupMappingEntity[]>((resolve, reject) => {
            this.fetch('/',{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((groups: GroupMappingEntity[]) => {
                    resolve(groups);
                })
                .catch((exception) => reject(exception));
        })
    }
}