export default class UnauthrizedException extends Error {
	constructor(message?: string) {
	    super(message ?? 'unauthrized');
	    this.name = 'UnauthrizedException';
	}
    }