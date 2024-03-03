import {serverDomain} from "../config";
import UnauthrizedException from "Exception/unauthrized.exception";
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

    async fetch(endpoint: string, init?: RequestInit) {
        
            const url = this.getUrl(endpoint);

            const response = await fetch(url, {
                ...init, ...{
                    credentials: "include",
                }
            });
    
            const {status, body} = response;

            if(status === 401){
                throw new UnauthrizedException();
            }
    
            return response;


    }
}

