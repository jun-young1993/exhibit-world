import {atom, selector, useRecoilCallback, useRecoilValue} from "recoil";
import {Group, Object3D} from "three";
import {useThree} from "@react-three/fiber";
import UserEntity from "clients/entities/user.entity";
import LoginDto from "clients/dto/auth/login.dto";
import AuthClient from "clients/auth.client";
import { useRefresherHook } from "./initialize.recoil";
import { useToast } from "./toast.recoil";
import { IconType } from "components/toast/exhibit-toast";
import { useDeleteMenuHook, useMenu } from "./menu.recoil";
import { dashboardMenu, loginMenu, loginedMenu } from "./items/menu.items";
const authClient = new AuthClient();
export const userSelector = selector<UserEntity | null>({
    key: "userSelector",
    get: async () => {
            try{
                const user = await authClient.profile();
            
                return user;       
            }catch(exception){
                
                return null;
            }
            
    }
})
export const userAtom = atom<UserEntity | null>({
    key: 'userAtom',
    default: userSelector
})

export const useSetUserHook = function() {
    const refresher = useRefresherHook();
    const { pushToast } = useToast();
    const {useLoginedMenu, setCurrentMenu} = useMenu();
    return useRecoilCallback(
        ({snapshot, set}) => 
        (userLoginDto: LoginDto) => {
            authClient.login(userLoginDto)
            .then((user) => {
                refresher();
                set(userAtom,user);
                useLoginedMenu();
                setCurrentMenu(dashboardMenu);
            })
            .catch((exception) => {
                pushToast({
                    icon: IconType.INFO,
                    content: exception.toString()
                });
            })
        }
    )
}


