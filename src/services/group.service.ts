import {Group} from "three";
import GroupClient from "../clients/group.client";
import {getGeometryId, getJsonFromGeometry, getJsonFromObject3D, getMeshesByGroup} from "../utills/mesh-info.utills";
import GeometryClient from "../clients/geometry.client";
import UpdateGeometryDto from "../clients/dto/geometry/update-geometry.dto";
import UpdateResult from "../clients/entities/update-result";
import {GroupEntity} from "../clients/entities/group.entity";

export default class GroupService {
    private groupClient: GroupClient;
    private geometryClient: GeometryClient;
    constructor() {
        this.groupClient = new GroupClient();
        this.geometryClient = new GeometryClient();
    }

    find(id: GroupEntity['id']){
        return new Promise<GroupEntity>((resolve, reject) => {
            this.groupClient.find(id)
                .then(resolve)
                .catch(reject)
        })
    }


    /**
     * update transform
     */
    update(group: Group)
    {
        return new Promise<GroupEntity>((resolve, reject ) => {
            this.groupClient.update(
                group.uuid,
                getJsonFromObject3D(group)
            )
                .then((response) => {
                    this.groupClient.find(group.uuid)
                        .then((group) => {
                            resolve(group);
                        })
                        .catch(reject);
                })
                .catch(reject)
        })
    }
}