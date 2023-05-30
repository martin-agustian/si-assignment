import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home/Home";
import SignIn from "@/views/SignIn/SignIn";
import SignUp from "@/views/SignUp/SignUp";
import FlashSale from "@/views/FlashSale/FlashSale";
import OfficialStore from "@/views/OfficialStore/OfficialStore";
import OfficialStoreBrand from "@/views/OfficialStore/OfficialBrand";
import DetailBrand from "@/views/OfficialStore/DetailBrand";
import ByCategory from "@/views/Category/ByCategory";
import DetailProduct from "@/views/Category/Detail";
import Search from "@/views/Search/Search";
import Promo from "@/views/Promo/Promo";
import HotProduct from "@/views/HotProduct/HotProduct";
import NewProduct from "@/views/NewProduct/NewProduct";
import ErorrPage404 from "@/views/ErrorPage/Page404";
import ErorrPage500 from "@/views/ErrorPage/Page500";
import ErorrPage502 from "@/views/ErrorPage/Page502";
import ErorrPage503 from "@/views/ErrorPage/Page503";
import ErorrPage504 from "@/views/ErrorPage/Page504";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "SignIn",
		component: SignIn,
	},
	{
		path: "/register",
		name: "SignUp",
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
		name: "ByCategory",
		component: ByCategory,
	},
	{
		path: "/category/detail",
		name: "DetailProduct",
		component: DetailProduct,
	},
	{
		path: "/search",
		name: "Search",
		component: Search,
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
	{
		path: "/404",
		name: "ErorrPage404",
		component: ErorrPage404,
	},
	{
		path: "/500",
		name: "ErorrPage500",
		component: ErorrPage500,
	},
	{
		path: "/502",
		name: "ErorrPage502",
		component: ErorrPage502,
	},
	{
		path: "/503",
		name: "ErorrPage503",
		component: ErorrPage503,
	},
	{
		path: "/504",
		name: "ErorrPage504",
		component: ErorrPage504,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { left: 0, top: 0 };
	}
});


export default router;