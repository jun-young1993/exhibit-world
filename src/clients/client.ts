import { getCookie } from "utills/cookie";
import {serverDomain} from "../config";
import {Cookies} from 'react-cookie';

import {
    StatusCodes,
} from 'http-status-codes';



const cookies = new Cookies();
// const cookies = new Cookies();
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

        // this.options(init);
        const response = await fetch(url, {
            ...init, ...{
                credentials: "include",
            }
        });

        const {status} = response;

        return response;
    }
}

