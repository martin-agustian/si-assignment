import { defineStore } from "pinia";
import * as CryptoJS from "crypto-js";

export const UserStore = defineStore('user', {
	state: () => ({
		user: localStorage.getItem('user'),
	}),

	getters: {
		getStoreUser(state) {
			if (state.user) {
				return JSON.parse(
					CryptoJS.AES.decrypt(state.user, 'BW').toString(CryptoJS.enc.Utf8)
				);
			}
			return null;
		},
	},

	actions: {
		setStoreUser(user) {
			user = CryptoJS.AES.encrypt(JSON.stringify(user), 'BW').toString();

			// set user to cookies
			localStorage.setItem('user', user);

			// set user to state
			this.user = localStorage.getItem('user'); 

			// return state
			return this.user;
		},
		deleteStoreUser() {
			// remove user from cookies
			localStorage.removeItem('user');

			// set token to state
			this.user = localStorage.getItem('user'); 
			
			// return state
			return this.user;
		},
	}
});