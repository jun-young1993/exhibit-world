import {serverDomain} from "../config";

interface ClientInterface {
    domain?: string,
    prefix?: string
}

export default class Client {
    protected domain: string = serverDomain
    protected prefix: string = '/'

    constructor(clientInterface: ClientInterface) {
        this.domain = clientInterface.domain ?? this.domain;
        this.prefix = clientInterface.prefix ?? this.prefix;
    }
    getUrl(endpoint: string): string
    {
        return this.domain+this.prefix+endpoint;
    }

    fetch(endpoint: string, init?:  RequestInit){
        const url = this.getUrl(endpoint);
        return fetch(url, init);
    }
}

