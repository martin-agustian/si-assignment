import { BasicApi } from "./basic.api";

export class ProductApi extends BasicApi {
   list(params) {
      return this.axios.get('/products', params);
   }

   store(params) {
      return this.axios.post('/products', params);
   }
}