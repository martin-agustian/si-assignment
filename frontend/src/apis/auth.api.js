import { BasicApi } from "./basic.api";

export class AuthApi extends BasicApi {
    login(params) {
        return this.axios.post('/auth/login', params);
    }

    register(params) {
        return this.axios.post('/auth/register', params);
    }
}