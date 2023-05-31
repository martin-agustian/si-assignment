// ** Helper
import * as Helper from "@/utils/helper";

function modelUser(data = {}) {
   data = {
      id: data._id ? data._id : 0,
      name: data.name ? Helper.setCapitalize(data.name) : null,
      email: data.email ? data.email : null,
   }

   return data;
}

export function setUsers(data) {
   data.forEach((value, i) => {
      data[i] = modelUser(value);
   });
 
   return data;
}

export function setUser(data) {
   return modelUser(data);
}