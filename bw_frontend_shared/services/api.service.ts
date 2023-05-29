import { Axios } from "./axios/axios";
import {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";

/**
 * @class Api Class is a fancy es6 wrapper class for axios.
 *
 * @param {import("axios").AxiosRequestConfig} config - axios Request Config.
 * @link [AxiosRequestConfig](https://github.com/axios/axios#request-config)
 */

export class ApiService extends Axios {    
    // protected baseUrl: string;
   
    /**
     * Get Uri
     *
     * @param {import("axios").AxiosRequestConfig} [config]
     * @returns {string}
     * @memberof Api
     */
    public getUri(config?: AxiosRequestConfig): string {
        return this.axios.getUri(config);
    }
    /**
     * Generic request.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP axios response payload.
     * @memberof Api
     *
     * @example
     * api.request({
     *   method: "GET|POST|DELETE|PUT|PATCH"
     *   baseUrl: "http://www.domain.com",
     *   url: "/api/v1/users",
     *   headers: {
     *     "Content-Type": "application/json"
     *  }
     * }).then((response: AxiosResponse<User>) => response.data)
     *
     */
    public request<T, R = AxiosResponse<T>>(
        config: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.request(config);
    }
    /**
     * HTTP GET method, used to fetch data `statusCode`: 200.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    public get<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.get(url, config);
    }
    /**
     * HTTP OPTIONS method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} HTTP `axios` response payload.
     * @memberof Api
     */
    public options<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.options(url, config);
    }
    /**
     * HTTP DELETE method, `statusCode`: 204 No Content.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    public delete<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.delete(url, config);
    }
    /**
     * HTTP HEAD method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    public head<T, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.head(url, config);
    }
    /**
     * HTTP POST method `statusCode`: 201 Created.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    
    public post<T, B, R = AxiosResponse<T>>(
        url: string,
        data?: B,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.post(url, data, config);
    }
    
    /**
     * HTTP PUT method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    public put<T, B, R = AxiosResponse<T>>(
        url: string,
        data?: B,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.put(url, data, config);
    }
    /**
     * HTTP PATCH method.
     *
     * @access public
     * @template T - `TYPE`: expected object.
     * @template B - `BODY`: body request object.
     * @template R - `RESPONSE`: expected object inside a axios response format.
     * @param {string} url - endpoint you want to reach.
     * @param {B} data - payload to be send as the `request body`,
     * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     * @memberof Api
     */
    public patch<T, B, R = AxiosResponse<T>>(
        url: string,
        data?: B,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.axios.patch(url, data, config);
    }
    /**
     *
     * @template T - type.
     * @param {import("axios").AxiosResponse<T>} response - axios response.
     * @returns {T} - expected object.
     * @memberof Api
     */
    public success<T>(response: AxiosResponse<T>): T {
        return response.data;
    }
    /**
     *
     *
     * @template T type.
     * @param {AxiosError<T>} error
     * @memberof Api
     */
    public error<T>(error: AxiosError<T>): void {
        throw error;
    }
    /**
     * Creates an instance of api.
     * @param {import("axios").AxiosRequestConfig} conf
     */
    public constructor(params: { 
        baseUrl?: any, 
        headers?: any,
    } = {
        baseUrl: import.meta.env.VITE_API_URL, 
    }) {
        
        var AxiosRequestConfig = {
            timeout: 360000,
            baseURL: params.baseUrl,
            headers: params.headers,
        };
        super(AxiosRequestConfig);

        // this.token = "";
        // this.baseUrl = AxiosRequestConfig.baseURL!;
        
        //return
        //this.getToken = this.getToken.bind(this);
        //this.setToken = this.setToken.bind(this);
        //this.getUri = this.getUri.bind(this);
        //this.request = this.request.bind(this);
        //this.get = this.get.bind(this);
        //this.options = this.options.bind(this);
        //this.delete = this.delete.bind(this);
        //this.head = this.head.bind(this);
        //this.post = this.post.bind(this);
        //this.put = this.put.bind(this);
        //this.patch = this.patch.bind(this);
        //this.success = this.success.bind(this);
        //this.error = this.error.bind(this);
        /*
        this.interceptors.request.use((param) => {
            return {
                ...param,
                defaults: {
                    headers: {
                        ...param.headers,
                        "Authorization": `Bearer ${this.getToken()}`
                    },
                }
            }
        }, (error) => {
            console.log(error)
            // handling error
        });

        // this middleware is been called right before the response is get it by the method that triggers the request
        this.interceptors.response.use(param => param, error => {
            console.log(error)
            // handling error
        }

        );
        */
        //return this;
    }
}
