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
            loading: true,
         },
      },
	}),

	getters: {
		getStoreCarts(state) {
         return state.carts;
      }
	},

	actions: {
      async fetchCarts(userId) {
         this.carts.loading = true;

         let carts = await cartApi.list({ 
            params: {
               user: userId,
            },
         })
         .catch(error => {
            throw error.response.data;
         });

         this.carts.loading = false;

         this.carts.data = setCarts(carts.data.result);
      },
		setStoreDataCarts(cart) {
			this.carts.data = cart; 
		},
		setStoreLoadingCarts(loading) {
			this.carts.loading = loading; 
		},
		deleteStoreCarts() {
			this.cart = {
            data: {
               count: 0,
               data: [],
               loading: true,
            },
         }; 
		},
	}
});