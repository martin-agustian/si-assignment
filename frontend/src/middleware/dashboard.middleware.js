// ** Store
import { UserStore } from "@/stores/user.store";

export default (to , from, redirect) => {
	let userStore = UserStore();
	let userData = userStore.getStoreUser;

	if (!userData) {
		redirect({ name: 'SignIn' });
	}
};