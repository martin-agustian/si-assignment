import { BasicApi } from "./basic.api";

export class ProductApi extends BasicApi {
   list(params) {
      return this.axios.get('/products', params);
   }

   detailBySlug(slug, params) {
      return this.axios.get('/products/' + slug, params);
   }

   store(params) {
      return this.axios.post('/products', params);
   }
}