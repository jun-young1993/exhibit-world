import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {ForwardRefComponent} from "@react-three/drei/helpers/ts-utils";
import { TransformControls as TransformControlsImpl } from 'three-stdlib';
import {Camera} from "three";
export enum TransformMode {
	Translate = 'translate',
	Rotate = 'rotate',
	Scale = 'scale'
}

export type TransformControl = TransformControlsImpl<Camera>;