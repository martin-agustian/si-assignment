// ** Models
import { setProduct } from '@/models/product.model';

function modelCart(data = {}) {
   data = {
      id: data._id ? data._id : 0,
      product: data.product ? setProduct(data.product) : {},
      user: data.user ? data.user : {},
      quantity: data.quantity ? data.quantity : 0,
   }

   return data;
}

export function setCarts(data) {
   data.data.forEach((value, i) => {
      data.data[i] = modelCart(value);
   });

   // data = {
   //    count: data.count ? data.count : 0,
   //    page: data.page ? data.page : 1,
   //    pages: data.pages ? data.pages : 1,
   //    limit: data.limit ? data.limit : 0,
   //    data: data.data ? data.data : [],
   // };
 
   return data;
}

export function setCart(data) {
   return modelCart(data.data);
}