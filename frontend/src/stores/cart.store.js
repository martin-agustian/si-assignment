import { defineStore } from "pinia";
// ** Api
import { CartApi } from '@/apis/cart.api';
// ** Models
import { setCarts } from '@/models/cart.model';

const cartApi = new CartApi();

export const CartStore = defineStore('cart', {
	state: () => ({
		carts: {
         count: 0,
         data: [],
      },
	}),

	getters: {
		getStoreCarts(state) {
         return state.carts;
      }
	},

	actions: {
      async fetchCarts(userId) {
         let carts = await cartApi.list({ 
            params: {
               user: userId,
            },
         })
         .catch(error => {
            throw error.response.data;
         });

         this.carts = setCarts(carts.data.result);
      },
		setStoreCarts(cart) {
			this.carts = cart; 
		},
		deleteStoreCarts() {
			this.cart = []; 
		},
	}
});