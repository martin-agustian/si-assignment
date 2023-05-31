<template>
	<div class="container">
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link to="/">
					Beranda
				</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link :to="{ name: 'Product' }">
					Produk List
				</router-link>
			</li>
			<li class="breadcrumb-item active" aria-current="page">
				{{ 
					productData.data.title ? 
					productData.data.title : '-' 
				}}
			</li>
		</ol>
	</div>

	<div class="section pb-40">
		<div class="container">
			<div class="box-prod">
				<div class="left-prod sticky-position">
					<b-tabs end align="center">
						<b-tab active class="clearer-padding">
							<template #title>
								<div class="box-cover-small">
									<div class="position-cover-small">
										<img src="@/assets/images/img-store-1.jpg" class="img-cover-small">
									</div>
								</div>
							</template>
							<div class="box-cover">
								<div class="position-cover">
									<img src="@/assets/images/img-store-1.jpg" class="img-cover">
								</div>
							</div>
						</b-tab>
						<b-tab class="clearer-padding">
							<template #title>
								<div class="box-cover-small">
									<div class="position-cover-small">
										<img src="@/assets/images/img-store-3.jpg" class="img-cover-small">
									</div>
								</div>
							</template>
							<div class="box-cover">
								<div class="position-cover">
									<img src="@/assets/images/img-store-3.jpg" class="img-cover">
								</div>
							</div>
						</b-tab>
					</b-tabs>
				</div>
				<div class="center-prod">					
					<div class="box-content-prod">
						<div class="alert bg-red-opacity">
							<i class="fas fa-info-circle" />
							Stok produk telah habis
						</div>
						<h1>
							{{ 
								productData.data.title ? 
								productData.data.title : '-' 
							}}
						</h1>
						<div class="price-prod">
							<span>
								{{ 
									productData.data.price ?  
									productData.data.price : 'Rp 0'
								}}
							</span>
						</div>
						<div class="state-prod">
							<div class="list-state-prod">
								<i class="fas fa-star"></i> 4.8 
							</div>
							<div class="list-state-prod">
								Terjual <b>49 Kali</b>
							</div>
							<div class="list-state-prod">
								Dilihat <b>200 Kali</b>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12 col-lg-8">
								<div class="info-prod">
									<div class="title-prod">
										Informasi
									</div>
									<div class="desc-prod">
										No. SKU:  BW-02040204
									</div>
								</div>
							</div>
							<div class="col-6 col-md-6 col-lg-2">
								<div class="fs-13">
									Berat
									<div class="mt-1">
										<b class="clr-black-dark">2Kg</b>
									</div>
								</div>
							</div>
							<div class="col-6 col-md-6 col-lg-2">
								<div class="fs-13">
									Stok
									<div class="mt-1">
										<b class="clr-black-dark">
											{{ 
												productData.data.stock ?
												productData.data.stock : 0
											}}
										</b>
									</div>
								</div>
							</div>
						</div>
						<div class="info-prod">
								<div class="title-prod">
									Deskripsi
								</div>
								<div class="desc-prod">
									{{ productData.desc.text }}
									<div 
										@click="productData.desc.isFulltext = !productData.desc.isFulltext"
										class="clr-red cursor-pointer fs-12 mt-1" 
									>
										<b>
											{{ 
												productData.desc.isFulltext ? 
												'Lihat lebih sedikit' : 'Lihat selengkapnya'
											}}
										</b>
									</div>
								</div>
						</div>
						<div class="mt-2">
							<b class="clr-black-dark">Ulasan</b>
						</div>
						<div class="box-review">
							<div class="left-review">
								<h1>5.0</h1>
							</div>
							<div class="right-review">
								<div class="box-review-bar">
									<div class="list-review-bar">
										<div class="left-review-bar">
											<span>
												5
											</span>
											<i class="fas fa-star" />
										</div>
										<div class="center-review-bar">
											<b-progress :value="100" :max="100" />
										</div>
										<div class="right-review-bar">
											100%
										</div>
										<div class="clearer" />
									</div>
									<div class="list-review-bar">
										<div class="left-review-bar">
											<span>
												4
											</span>
											<i class="fas fa-star" />
										</div>
										<div class="center-review-bar">
											<b-progress :value="0" :max="0" />
										</div>
										<div class="right-review-bar">
											0%
										</div>
										<div class="clearer" />
									</div>
									<div class="list-review-bar">
										<div class="left-review-bar">
											<span>
												3
											</span>
											<i class="fas fa-star" />
										</div>
										<div class="center-review-bar">
											<b-progress :value="0" :max="0" />
										</div>
										<div class="right-review-bar">
											0%
										</div>
										<div class="clearer" />
									</div>
									<div class="list-review-bar">
										<div class="left-review-bar">
											<span>
												2
											</span>
											<i class="fas fa-star"></i>
										</div>
										<div class="center-review-bar">
											<b-progress :value="0" :max="0" />
										</div>
										<div class="right-review-bar">
											0%
										</div>
										<div class="clearer" />
									</div>
									<div class="list-review-bar">
										<div class="left-review-bar">
											<span>
												1
											</span>
											<i class="fas fa-star" />
										</div>
										<div class="center-review-bar">
											<b-progress :value="0" :max="0" />
										</div>
										<div class="right-review-bar">
											0%
										</div>
										<div class="clearer" />
									</div>
								</div>
							</div>
							<div class="clearer" />
						</div>
					</div>
				</div>
				<div class="right-prod sticky-position">
					<div class="box-summary">
						<h3>Ringkasan Belanja</h3>
						
						<div class="list-summary">
							<div class="left-summary-alt">
								Jumlah
							</div>
							<div class="right-summary-alt">
								<div class="box-qty">
									<span>
										<button 
											@click="setQtyReduce()"
											class="button-qty"
										>
											<i class="fas fa-minus" />
										</button>
									</span>
									<input
										v-model="productData.quantity.total"
										class="text-qty"
										:disabled="true"
									>
									<span>
										<button 
											@click="setQtyAdd()"
											class="button-qty" 
										>
											<i class="fas fa-plus" />
										</button>
									</span>
								</div>
							</div>
							<div class="clearer" />
						</div>
						<div class="list-summary mt-3">
							<div class="left-summary-alt">
								<b class="clr-black-dark">Sub Total</b>
							</div>
							<div class="right-summary-alt">
								<b class="clr-red">
									{{ productData.price }}
								</b>
							</div>
							<div class="clearer" />
						</div>
						<div class="box-menu-cart">
							<router-link :to="{ name: 'Cart' }">
								<button class="button button-green">
									<b>Beli Sekarang</b>
								</button>
							</router-link>
							<button 
								@click="setToCart"
								class="button button-outline-green" 
							>
								<i class="fas fa-plus" /> &nbsp; <b>
									{{ cartData.loadingAdd ? 'Loading..' : 'Keranjang' }}
								</b>
							</button>
						</div>
					</div>
				</div>
				<div class="clearer" />
			</div>
		</div>

		<div v-show="cartData.notif.show" class="box-success-confirm">
			<div class="row">
				<div class="col-9">
					{{ cartData.notif.text }}
				</div>
				<div class="col-3 text-right">
					<router-link :to="{ name: 'Cart' }">
						<b>Lihat</b>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// ** Apis
import { ProductApi } from '@/apis/product.api';
import { CartApi } from '@/apis/cart.api';
// ** Helper
import * as Helper from '@/utils/helper';
// ** Models
import { setProduct } from '@/models/product.model';
// ** Store
import { UserStore } from '@/stores/user.store';
import { CartStore } from '@/stores/cart.store';

const route = useRoute();
const router = useRouter();

const productApi = new ProductApi();
const cartApi = new CartApi();

const cartStore = CartStore();
const userStore = UserStore();

const cartData = reactive({
	data: computed(() => {
		return cartStore.getStoreCarts;
	}),
	loadingAdd: false,
	notif: {
		show: false,
		text: 'Barang sudah ditambahkan ke dalam keranjang',
	},
});

const productData = reactive({
	data: {},
	desc: {
		isFulltext: false,
		text: computed(() => {
			if (productData.data && productData.data.description) {
				if (productData.desc.isFulltext) {
					return productData.data.description;
				}
				return `${productData.data.description.slice(0, 120).trim()}...`;
			}
			return '';
		}),
	},
	quantity: {
		total: 1,
	},
	price: computed(() => {
		let qty = productData.quantity.total;
		let price = Helper.clearIDR(productData.data.price);
		
		price = price * qty;
		
		if (typeof price == 'number' && !Number.isInteger(price)) {
			price = price.toFixed(2);
		}

		return Helper.setIDR(price);
	}),
	loading: false,
});

const userData = reactive({
	data: userStore.getStoreUser,
});

onMounted(() => {
	getProduct();
});

const getProduct = () => {
	let params = {};

	productData.loading = true;

	productApi
		.detailBySlug(route.params.slug, { params: params })
		.then(response => {
			response = response.data;
			productData.data = setProduct(response.result);
			productData.loading = false;
		})
		.catch(error => {
			console.log(error);
			productData.loading = false;
		});
};

const getCarts = () => {
	cartStore.fetchCarts(
		userData.data.id
	)
	.then(response => {
		console.log(response);
	})
	.catch(error => {
		console.log(error);
	});
};

// const getCartAvailableQuantity = () => {
// 	let cartECOM = cartData.data.ecom_cart;		
// 	let cartECOMQuantity = 0;

// 	let productData = productData.data;
// 	let productStock = 0;

// 	if (
// 		Array.isArray(productData.stock) && 
// 		productData.stock.length > 0
// 	) {
// 		if (productData.stock[0].stock) {
// 			productStock = productData.stock[0].stock;
// 		}
// 	}

// 	if (
// 		Array.isArray(cartECOM) && 
// 		cartECOM.length > 0
// 	) {
// 		cartECOM.forEach((cart) => {
// 			if (cart.item_id == productData.id) {
// 				cartECOMQuantity = cart.quantity;
// 			}
// 		});
// 	}

// 	return productStock - cartECOMQuantity;
// }

// const isQtyAddDisabled = () => {
// 	let productStock = productData.data.stock;
// 	let productQuantity = productData.quantity;

// 	let isDisabled = false;

// 	if (!productStock) {
// 		// let productQuantity: any = productData.quantity;		
// 		// let productStock: any = productData.data.stock;

// 		// if (productQuantity.total == productStock[0].stock) {
// 		// 	isDisabled = true;
// 		// }
		
// 		let cartStock = getCartAvailableQuantity();

// 		if (productQuantity.total == cartStock) {
// 			isDisabled = true;
// 		}
// 	}
// 	else {
// 		isDisabled = true;
// 	}
	
// 	return isDisabled;
// }

// const isQtyReduceDisabled = () => {
// 	let isDisabled = false;

// 	if (isProductEmpty()) {
// 		isDisabled = true;
// 	}
// 	else {
// 		let productQuantity = productData.quantity;

// 		if (productQuantity.total <= 1) {
// 			isDisabled = true;
// 		}
// 	}
	
// 	return isDisabled;
// }

const setQtyAdd = () => {
	let productQty = productData.quantity;	
	let productStock = productData.data.stock;

	if (productQty.total < productStock) {
		productQty.total += 1;         
	}
}

const setQtyReduce = () => {
	let productQty = productData.quantity;

	if (productQty.total > 1) {
		productQty.total = productQty.total - 1;
	}
}

const setToCart = () => {
	if (userData.data && userData.data.id) {
		let params = {};

		params.user = userData.data.id;
		params.product = productData.data.id;
		params.quantity = productData.quantity.total;

		cartData.loadingAdd = true;

		cartApi
			.store(params)
			.then(response => {
				response = response.data;
				console.log(response.result);

				getCarts();

				cartData.notif.show = true;
				setTimeout(() => cartData.notif.show = false, 3000);

				cartData.loadingAdd = false;
			})
			.catch(error => {
				console.log(error);
				cartData.loadingAdd = false;
			});
	}
	else {
		router.replace({
			name: 'SignIn'
		});
	}
};

</script>

<style scoped>

::v-deep(.modal-container){
	display: flex;
	justify-content: center;
	align-items: center;
}

::v-deep(.modal-content){
	position: relative;
	display: flex;
	flex-direction: column;
	max-height: 90%;
	margin: 0px 10px;
	padding: 20px 20px;
	border: 1px solid #e2e8f0;
	border-radius: 15px;
	background-color: #fff;
	width: 380px;
}

</style>