import { BasicApi } from "./basic.api";

export class CartApi extends BasicApi {
   list(params) {
      return this.axios.get('/carts', params);
   }

   store(params) {
      return this.axios.post('/carts', params);
   }

   delete(id, params) {
      return this.axios.delete('/carts/'+id, params);
   }
}