import AuthClient from "clients/auth.client";
import LoginDto from "clients/dto/auth/login.dto";
import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "store/recoil/user.recoil";
import Logined from "./logined";
import { useRefresherHook} from "../../store/recoil/initialize.recoil";


const authClient = new AuthClient();
export default function Login() {
	const appAnme = process.env.APP_NAME;
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isRemember, setRemember] = useState<boolean>(false);
	const [user, setUser] = useRecoilState(userAtom);
	const handleEmail = (event: FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
	}
	const handlePassword = (event: FormEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
	}
	const handleRemember = (checked: boolean) => {
		setRemember(checked);
	}
	const refresher = useRefresherHook();
	const handleSubmit = () => {
		const loginDto = new LoginDto({
			email: email,
			password: password
		})
		authClient.login(loginDto)
		.then((user) => {
			refresher();
			setUser(user);
		})
		.catch((exception) => {
			console.log(exception)
		});
	}
	
	return (
		<>
			{(user === null)
			?	<div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
					<a href="" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
					<img src="/images/logo.svg" className="mr-4 h-11" alt="FlowBite Logo" />
					<span>{appAnme}</span>  
				</a>
				{/* <!-- Card --> */}
				<div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
					Sign in to {appAnme}
					</h2>
					<div className="mt-8 space-y-6">
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
						<input onChange={handleEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@company.com" required />
					</div>
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
						<input onChange={handlePassword} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
					</div>
					<div className="flex items-start">
						<div className="flex items-center h-5">
						<input  
							aria-describedby="remember" 
							checked={isRemember}
							onChange={({ target: { checked } }) => handleRemember(checked)}
							name="remember" 
							type="checkbox" 
							readOnly
							className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" 
						/>
						</div>
						<div className="ml-3 text-sm">
						<label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Remember me</label>
						</div>
						<a href="#" className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost Password?</a>
					</div>
					<button onClick={handleSubmit} className="w-full px-5 py-3 text-base font-medium text-center text-white bg-sky-300 rounded-lg hover:bg-sky-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login to your account</button>
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Not registered? <a className="text-primary-700 hover:underline dark:text-primary-500">Create account</a>
					</div>
					</div>
				</div>
				</div>
			: <Logined />}
		</>
	
		
	)
}