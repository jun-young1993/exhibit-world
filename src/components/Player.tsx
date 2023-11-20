import {useFrame} from "@react-three/fiber";
import {useRef} from "react";
import {Mesh, Vector3} from "three";
import { useKeyboardControls } from "@react-three/drei"
import {getSingleMaterial} from "../utills/mesh-info.utills";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

const SPEED = 5
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()
const rotation = new Vector3()

export default function Player(){
    const playerRef = useRef<Mesh>(null!);
    const [, get] = useKeyboardControls()
    // useFrame((state) => {
    //     const { forward, backward, left, right, jump } = get()
    //     // console.log(forward, backward, left, right, jump);
    //
    // })


    return (

            <mesh ref={playerRef}>

            </mesh>


    )
}