// ** Helper
import * as Helper from "@/utils/helper";

function modelProduct(data = {}) {
   data = {
      id: data.id ? data.id : 0,
      title: data.title ? Helper.setCapitalize(data.title) : '',
      image: data.image ? data.image : 0,
      description: data.description ? data.description : '',
      price: data.price ? Helper.setIDR(data.price) : 'Rp 0',
   }

   return data;
}

export function setProductList(data) {
   data.forEach((value, i) => {
      data[i] = modelProduct(value);
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

export function setProductDetail(data) {
   return modelProduct(data);
}