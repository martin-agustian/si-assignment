// ** Helper
import * as Helper from "@/utils/helper";

function modelProduct(data = {}) {
   data = {
      id: data._id ? data._id : 0,
      slug: data.slug ? data.slug : null,
      title: data.title ? Helper.setCapitalize(data.title) : null,
      image: data.image ? data.image : 0,
      description: data.description ? data.description : null,
      price: data.price ? Helper.setIDR(data.price) : 'Rp 0',
      stock: data.stock ? data.stock : 0,
   }

   return data;
}

export function setProducts(data) {
   data.forEach((value, i) => {
      data[i] = modelProduct(value);
   });
 
   return data;
}

export function setProduct(data) {
   return modelProduct(data);
}