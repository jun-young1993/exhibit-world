import UserEntity from "clients/entities/user.entity";
import IconButton from "components/icon-button";
import { Button, Popover  } from "flowbite-react";
import { ReactElement } from "react";
import { LiaUserCircleSolid } from "react-icons/lia";
import { useRecoilState } from "recoil";
import { loginMenu } from "store/recoil/items/menu.items";
import { currentMenuAtom } from "store/recoil/menu.recoil";
import { userAtom } from "store/recoil/user.recoil";

function Logined(props:{user: UserEntity}){
	return (
		<Popover
			aria-labelledby="default-popover"
			content={
			<div className="w-64 text-sm text-gray-500 dark:text-gray-400">
			<div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
			<h4 id="default-popover" className="font-semibold text-gray-900 dark:text-white">{props.user.email}</h4>
			</div>
			<div className="px-3 py-2">
			<p>last login ip: {props.user.loginIp}</p>
			</div>
			</div>
			}
			arrow={false}
		>
			<img 
				className="h-10 w-10 rounded-full border-4 border-white dark:border-gray-800 mx-auto hover:cursor-pointer" 
				src={`https://www.gravatar.com/avatar/${props.user.id}?d=identicon&s=400`}
				alt="" 
			/>
		</Popover>
	)
}
function Logout(){
	const [, setCurrentMenu] = useRecoilState(currentMenuAtom);
	
	return (
		<LiaUserCircleSolid 	
			className="h-10 w-10 rounded-full border-4 border-white dark:border-gray-800 mx-auto hover:cursor-pointer hover:bg-gray-200" 
			onClick={() => setCurrentMenu(loginMenu)}
		/>
	)
}
export default function Profile(){
	const [user] = useRecoilState(userAtom);
	return (
		<>
			{user
			? <Logined user={user} />
			: <Logout />}
		</>
	)
}