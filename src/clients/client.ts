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

    fetch(endpoint: string, init?:  RequestInit){
        const url = this.domain+this.prefix+endpoint;
        return fetch(url, init);
    }
}

