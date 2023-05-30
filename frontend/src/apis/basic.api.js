import axios from "axios";

export class BasicApi {
  constructor() {
    const instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL
    });
    
    this.axios = instance;
  }
}
