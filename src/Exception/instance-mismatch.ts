export default class InstanceMismatchError extends Error {
	constructor(varialble: string, instance: any) {
		super(`The ${varialble} variable must be of type FileList. ${instance.toString()}`);
		this.name = 'InstanceMismatchError';
	}
}

