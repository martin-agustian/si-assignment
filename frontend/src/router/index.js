import { createWebHistory, createRouter } from "vue-router";
import VueRouteMiddleware from "vue-route-middleware";

// ** Routes
import Home from "@/views/Home/Home";
import SignIn from "@/views/SignIn/SignIn";
import SignUp from "@/views/SignUp/SignUp";
import Cart from "@/views/Cart/Cart";
import FlashSale from "@/views/FlashSale/FlashSale";
import OfficialStore from "@/views/OfficialStore/OfficialStore";
import OfficialStoreBrand from "@/views/OfficialStore/OfficialBrand";
import DetailBrand from "@/views/OfficialStore/DetailBrand";
import ByCategory from "@/views/Category/ByCategory";
import ProductDetail from "@/views/Category/Detail";
import Promo from "@/views/Promo/Promo";
import HotProduct from "@/views/HotProduct/HotProduct";
import NewProduct from "@/views/NewProduct/NewProduct";

// ** Middlewares
import AuthMiddleware from "@/middleware/auth.middleware";
import DashboardMiddleware from "@/middleware/dashboard.middleware";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
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
		path: "/flash-sale",
		name: "FlashSale",
		component: FlashSale,
	},
	{
		path: "/official-store",
		name: "OfficialStore",
		component: OfficialStore,
	},
	{
		path: "/official-store/brand",
		name: "OfficialStoreBrand",
		component: OfficialStoreBrand,
	},
	{
		path: "/official-store/brand/detail",
		name: "DetailBrand",
		component: DetailBrand,
	},
	{
		path: "/category",
		name: "Product",
		component: ByCategory,
	},
	{
		path: "/category/:slug",
		name: "ProductDetail",
		component: ProductDetail,
	},
	{
		path: "/promo",
		name: "Promo",
		component: Promo,
	},
	{
		path: "/hot-product",
		name: "HotProduct",
		component: HotProduct,
	},
	{
		path: "/new-product",
		name: "NewProduct",
		component: NewProduct,
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