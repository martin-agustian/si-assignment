import { createWebHistory, createRouter } from "vue-router";
import VueRouteMiddleware from "vue-route-middleware";

// ** Routes
import SignIn from "@/views/SignIn/SignIn";
import SignUp from "@/views/SignUp/SignUp";
import Cart from "@/views/Cart/Cart";
import Product from "@/views/Product/Product";
import ProductDetail from "@/views/Product/ProductDetail";

// ** Middlewares
import AuthMiddleware from "@/middleware/auth.middleware";
import DashboardMiddleware from "@/middleware/dashboard.middleware";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Product,
	},
	{
		path: "/cart",
		name: "Cart",
		meta: {
			middleware: [
				DashboardMiddleware,
			],
		},
		component: Cart,
	},
	{
		path: "/login",
		name: "SignIn",
		meta: {
			middleware: [
				AuthMiddleware,
			],
		},
		component: SignIn,
	},
	{
		path: "/register",
		name: "SignUp",
		meta: {
			middleware: [
				AuthMiddleware,
			],
		},
		component: SignUp,
	},
	{
		path: "/category",
		name: "Product",
		component: Product,
	},
	{
		path: "/category/:slug",
		name: "ProductDetail",
		component: ProductDetail,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { left: 0, top: 0 };
	}
});

router.beforeEach(VueRouteMiddleware());

export default router;