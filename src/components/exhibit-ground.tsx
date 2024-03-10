import { CuboidCollider, RigidBody } from "@react-three/rapier"

interface ExhibitGroundProps {
    position ?: [number, number, number]
    color ?: string
}
export function ExhibitGround(props: ExhibitGroundProps) {

    return (
        <RigidBody  type="fixed" colliders={false}>
            <mesh receiveShadow position={props?.position ?? [0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color={props?.color ?? "green"} />
            </mesh>
            <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
        </RigidBody>
    )
}
