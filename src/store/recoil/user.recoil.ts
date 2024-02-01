import {atom, selector, useRecoilValue} from "recoil";
import {Group, Object3D} from "three";
import {useThree} from "@react-three/fiber";
import UserEntity from "clients/entities/user.entity";

export const userAtom = atom<UserEntity | null>({
    key: 'userAtom',
    default: null
})