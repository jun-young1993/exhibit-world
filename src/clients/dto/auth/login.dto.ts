export interface LoginInterface {
	email: string
	password: string

}
export default class LoginDto {
	constructor(property: LoginInterface) {
	    Object.assign(this, property);
	}
    }