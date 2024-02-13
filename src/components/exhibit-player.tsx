import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { useMemo } from "react";
import {Vector3} from "three";
import { KeyboardControlsMap } from "types/keyboard-controls-map";
//@ts-ignore
import Ecctrl, { EcctrlAnimation } from "ecctrl";

const SPEED = 20;
const direction = new Vector3();
const frontVector = new Vector3()
const sideVector = new Vector3()
const rotation = new Vector3()
export function ExhibitPlayer(){
    const map = useMemo<KeyboardControlsEntry<KeyboardControlsMap>[]>(()=>[
        { name: KeyboardControlsMap.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: KeyboardControlsMap.backward, keys: ['ArrowDown', 'KeyS'] },
        { name: KeyboardControlsMap.leftward, keys: ['ArrowLeft', 'KeyA'] },
        { name: KeyboardControlsMap.rightward, keys: ['ArrowRight', 'KeyD'] },
        { name: KeyboardControlsMap.jump, keys: ['Space'] },
        { name: KeyboardControlsMap.run, keys: ['Shift'] },
    ], [])
    return (
        <KeyboardControls
            map={map}
            >
                <Ecctrl>
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color={'hotpink'} />
                    </mesh>
                </Ecctrl>
        </KeyboardControls>
    )
}


// export function ExhibitPlayer() {
//     const ref = useRef<RapierRigidBody>(null!);
//     const axe = useRef<Group>(null!);
//     const [, get] = useKeyboardControls();
//     const rapier = useRapier();
//     const world = rapier.world;
//     const characterController = world.createCharacterController(0.01);
//     characterController.setUp({ x: 0.0, y: 0.0, z: 1.0 });
//     // useFrame((state) => {
//     //     const { forward, backward, left, right, jump } = get() as unknown as {
//     //         forward: number,
//     //         backward: number,
//     //         left: number,
//     //         right: number,
//     //         jump: number
//     //     };

//     //     // const velocity = ref.current.linvel();

//     //     // Update camera position to match player position

//     //     if(ref.current){
//     //         console.log(ref.current,forward, backward, left, right);
//     //         const bodyCurrentTranslation = ref.current.translation();

//     //         state.camera.position.set(
//     //             bodyCurrentTranslation.x,
//     //             bodyCurrentTranslation.y,
//     //             bodyCurrentTranslation.z
//     //         );
    
//     //         axe.current.rotation.copy(state.camera.rotation)
//     //         axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
    
//     //         // console.log(            bodyCurrentTranslation.x,
//     //         //     bodyCurrentTranslation.y,
//     //         //     bodyCurrentTranslation.z)
//     //         // Movement
//     //         frontVector.set(0,0, backward - forward);
//     //         sideVector.set(left - right, 0,0);
//     //         direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
    
//     //         // ref.current.setLinvel(new Vector({ x: direction.x, y: velocity.y, z: direction.z }),false)
    
//     //         // Set linear velocity of the player
//     //         ref.current.setLinvel({ x: direction.x, y: 0, z: direction.z }, false);
    
//     //         // Jumping
//     //         // const world = rapier.world;
//     //         // const ray = world.castRay(bodyCurrentTranslationVector3 as any, direction,false);
//     //         // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
//     //         // if (jump) ref.current.setLinvel({ x: 0, y: 5.5, z: 0 }, false);
//     //     }

//     // });

//     return (
//         <>
//             <PointerLockControls />
//             <RigidBody ref={ref} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
//                 <CapsuleCollider args={[0.75, 0.5]} />
//             </RigidBody>
//             <group ref={axe}>
//                 <mesh position={[0.3, -0.35, 0.5]} scale={[10,10,10]}>
//                     <boxGeometry />
//                     <meshStandardMaterial />
//                 </mesh>
//             </group>
//         </>
//     );
// }

