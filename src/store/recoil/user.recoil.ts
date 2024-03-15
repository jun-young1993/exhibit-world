import {atom, selector, useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
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

export enum UserLoginStatus {
    LOGOUT = 'logout',
    LOGGED = 'logged',
    LOGGING = 'logging'
}

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
export const userStatusSelector = selector<UserLoginStatus>({
    key: 'userStatusSelector',
    get: async () => {
        return UserLoginStatus.LOGOUT
    }
})
export const userStatusAtom = atom<UserLoginStatus>({
    key: "userStatusAtom",
    default: userStatusSelector
})



export const useSetUserHook = function() {
    const refresher = useRefresherHook();
    const { pushToast } = useToast();
    const {useLoginedMenu, setCurrentMenu} = useMenu();
    const [userLoginStatus, setUserLoginStatus] = useRecoilState(userStatusAtom);
    return useRecoilCallback(
        ({snapshot, set}) => 
        (userLoginDto: LoginDto) => {
            setUserLoginStatus(UserLoginStatus.LOGGING);
            authClient.login(userLoginDto)
            .then((user) => {
                refresher();
                set(userAtom,user);
                useLoginedMenu();
                setCurrentMenu(dashboardMenu);
                setUserLoginStatus(UserLoginStatus.LOGGED)
            })
            .catch((exception) => {
                pushToast({
                    icon: IconType.FAIL,
                    content: exception.toString()
                });
                setUserLoginStatus(UserLoginStatus.LOGOUT)
            })
        }
    )
}

export const useUserLogoutHook = function(){
    const { pushToast } = useToast();
    const refresher = useRefresherHook();
    const {useLogoutMenu, setCurrentMenu} = useMenu();
    const [userLoginStatus, setUserLoginStatus] = useRecoilState(userStatusAtom);
    return useRecoilCallback(
        ({snapshot, set}) => 
        () => {
            authClient.logout()
            .then(() => {
                refresher();
                set(userAtom,null);
                useLogoutMenu();
                setUserLoginStatus(UserLoginStatus.LOGOUT)
            })
            .catch((exception)=>{
                pushToast({
                    icon: IconType.FAIL,
                    content: exception.toString()
                });
            })
        }
    )
}


