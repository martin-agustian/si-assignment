import { defineStore } from "pinia";

export const CartStore = defineStore('cart', {
	state: () => ({
		carts: [],
	}),

	getters: {
		getStoreCart(state) {
			if (state.carts) {
            return state.carts
         }
         return [];
		},
	},

	actions: {
		setStoreCart(cart) {
			// set user to state
			this.carts = cart; 

			// return state
			return this.carts;
		},
		deleteStoreCart() {
			// set token to state
			this.cart = []; 
			
			// return state
			return this.cart;
		},
	}
});