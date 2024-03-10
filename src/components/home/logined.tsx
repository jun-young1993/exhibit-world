import { useRecoilValue } from "recoil";
import { userAtom } from "store/recoil/user.recoil";

export default function Logined(){
	const user = useRecoilValue(userAtom);
	return <>${JSON.stringify(user)}</>;
}