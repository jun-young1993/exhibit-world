import { useThree } from "@react-three/fiber";
import { Group } from "three"

interface PrimitiveProps {
	object: Group
}
export default function Primitive({object}: PrimitiveProps){
	const {scene} = useThree();
	scene.add(object);
	return <></>
}