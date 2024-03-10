export default class PropertyMissingError extends Error {
    constructor(property: string) {
        super(`Material is missing the ${property} property`);
        this.name = 'PropertyMissingError';
    }
}