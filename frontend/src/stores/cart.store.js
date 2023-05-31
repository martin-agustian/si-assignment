import { defineStore } from "pinia";
// ** Api
import { CartApi } from '@/apis/cart.api';
// ** Models
import { setCarts } from '@/models/cart.model';

const cartApi = new CartApi();

export const CartStore = defineStore('cart', {
	state: () => ({
		carts: {
         data: {
            count: 0,
            data: [],
         },
         loading: false,
      },
	}),

	getters: {
		getStoreCarts(state) {
         return state.carts;
      }
	},

	actions: {
      async fetchCarts(userId) {
         try {
            this.carts.loading = true;
            const carts = await cartApi.list({ 
               params: {
                  user_id: userId,
               },
            });
            this.carts.loading = false;
            this.carts.data = setCarts(carts.data.result);
         }
         catch(error) {
            console.log(error);
            this.carts.loading = false;
         }
      },
		setStoreCarts(cart) {
			// set user to state
			this.carts = cart; 

			// return state
			return this.carts;
		},
		deleteStoreCarts() {
			// set token to state
			this.cart = []; 
			
			// return state
			return this.cart;
		},
	}
});