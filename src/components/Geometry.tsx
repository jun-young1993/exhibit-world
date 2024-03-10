import {BoxGeometry, BufferGeometry, ConeGeometry, CylinderGeometry, SphereGeometry, TorusGeometry} from "three";
import {GeometryType} from "../clients/entities/exhibit-geometry.entity";

export default function Geometry(props: BufferGeometry){
    // let geometry  = <boxGeometry />
    // if('parameters' in props){
    //     switch (props.type) {
    //         case GeometryType.BoxGeometry:
    //             geometry = geometry  = <boxGeometry args={[props.parameters.width]} />
    //             break;
    //         case GeometryType.SphereGeometry:
    //             geometry = new SphereGeometry(this.entity.radius);
    //             break;
    //         case GeometryType.ConeGeometry:
    //             geometry = new ConeGeometry(this.entity.radius, this.entity.height);
    //             break;
    //         case GeometryType.CylinderGeometry:
    //             geometry = new CylinderGeometry(this.entity.radius, this.entity.radius, this.entity.height);
    //             break;
    //         case GeometryType.TorusGeometry:
    //             geometry = new TorusGeometry(this.entity.radius, this.entity.width);
    //             break;
    //         default:
    //             throw Error(`Geometry.tsx ${props.type}: Geometry was not correctly generated`)
    //             break;
    //     }
    // }

    return (
        <></>
    )
}