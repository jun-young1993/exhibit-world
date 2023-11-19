import Surface from "./Surface";
import {MeshProps} from "@react-three/fiber";
import {Mesh} from "three";
import {useRef} from "react";

export default function EditorSurface(props: MeshProps) {
    const meshRef = useRef<Mesh>(null!)
    return <Surface
        ref={meshRef}
        {...props}
    />
}