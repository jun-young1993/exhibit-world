export default class InstanceMismatchError extends Error {
	constructor(instance: any) {
		super(`The variable must be of type ${instance}. `);
		this.name = 'InstanceMismatchError';
	}
}

