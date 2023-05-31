<template>
	<div class="container">
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link to="#">
					Beranda
				</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link to="#">
					Nama Kategori
				</router-link>
			</li>
			<li class="breadcrumb-item active" aria-current="page">
				Jeruk Pontianak 1 Kg Spesial 
			</li>
		</ol>
	</div>

	<div class="section pb-40">
		<div class="container">
			<div class="box-prod">
				<div class="left-prod sticky-position">
					<b-tabs end  align="center">
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
					<div class="box-flashsale-prod">
						<div class="box-makeup" />
						Sisa waktu tersedia 
						<vue-countdown :time="1 * 4 * 60 * 60 * 1000" v-slot="{ hours, minutes, seconds }">
							<div class="box-countdown">
								<div class="list-countdown bg-red-dark">
									{{ hours }}
								</div>
								<div class="list-countdown-alt clr-red-dark">
									:
								</div>
								<div class="list-countdown bg-red-dark">
									{{ minutes }}
								</div>
								<div class="list-countdown-alt clr-red-dark">
									:
								</div>
								<div class="list-countdown bg-red-dark">
									{{ seconds }}
								</div>
							</div>
						</vue-countdown>
					</div>
					<div class="box-content-prod">
						<div class="alert bg-red-opacity">
							<i class="fas fa-info-circle" />
							Stok produk telah habis untuk area <b>Jabodetabek, CIbinong</b>
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
							<!-- Diskon -->
							<!--
							<div class="disc-price-prod">
								<div class="disc-info-price-prod">
									50%
								</div>
								<del>
									Rp 600.000
								</del>
							</div>
							-->
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
									{{ formattedBody }}
									<div class="clr-red cursor-pointer fs-12 mt-1" @click="showingFullText = !showingFullText">
										<b>{{ showingFullText ? "Lihat lebih sedikit" : "Lihat selengkapnya" }}</b>
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
											:class="isQtyReduceDisabled() && 'os-54'" 
											:disabled="isQtyReduceDisabled()" 
										>
											<i class="fas fa-minus" />
										</button>
									</span>
									<input 
										@input="checkQtyInput()"
										v-model="productData.quantity.total"
										class="text-qty"
										:disabled="isProductEmpty()"
									>
									<span>
										<button 
											@click="setQtyAdd()"
											class="button-qty"
											:class="isQtyAddDisabled() && 'os-54'"
											:disabled="isQtyAddDisabled()" 
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
									{{ getProductBuyPrice() }}
								</b>
							</div>
							<div class="clearer" />
						</div>
						<div class="box-menu-cart">
							<button class="button button-green">
								<b>Beli Sekarang</b>
							</button>
							<button 
								@click="setToCart"
								class="button button-outline-green" 
							>
								<i class="fas fa-plus"></i> &nbsp; <b>Keranjang</b>
							</button>
						</div>
						<div class="box-action-courses mt-2">
							<div class="list-action-courses" :class="[isActiveWishlist ? 'clr-pink' : 'clr-black']" @click="actToWishlist">
								<i class="bi bi-heart-fill"></i> Wishlist
							</div>
							<div class="list-action-courses" @click="viewShare = true">
								<i class="bi bi-share-fill"></i> Share
							</div>
						</div>
					</div>
				</div>
				<div class="clearer" />
			</div>
		</div>

		<div v-show="viewAddToWishlist" class="box-success-confirm">
			<div class="row">
				<div class="col-9">
					Barang sudah ditambahkan ke dalam wishlist
				</div>
				<div class="col-3 text-right">
					<router-link to="#">
						<b>Lihat</b>
					</router-link>
				</div>
			</div>
		</div>

		<!-- Notif - Delete Wishlist -->
		<div v-show="viewDeleteToWishlist" class="box-warning-confirm">
			<div class="row">
				<div class="col-12">
					Barang sudah dihapus dari wishlist
				</div>
			</div>
		</div>

		<!-- Notif - Add Wishlist -->
		<div v-show="viewAddToCart" class="box-success-confirm">
			<div class="row">
				<div class="col-9">
					Barang sudah ditambahkan ke dalam keranjang
				</div>
				<div class="col-3 text-right">
					<router-link to="#">
						<b>Lihat</b>
					</router-link>
				</div>
			</div>
		</div>

		<!-- Modal Share -->
		<vue-final-modal v-model="viewShare" classes="modal-container" content-class="modal-content">
			<button class="modal__close" @click="viewShare = false">
					<i class="bi bi-x-lg"></i>
			</button>
			<span class="modal__title">
				<div class="box-modal-title text-left">
					<i class="bi bi-share-fill"></i>
					<h5>Bagikan</h5>
				</div>
			</span>
			<div class="modal__content">
				<div class="box-copy">
					<div class="mb-3">https://lms.bakingworld.id/home/course/membuat-aneka-bakso</div>
					<div class="link-copy">
						<i class="far fa-copy"></i> <b>Copy</b>
					</div>
				</div>
				<div class="box-button-share">
					<button class="button">
						<i class="fab fa-facebook-f"></i>
					</button>
					<button class="button">
						<i class="fab fa-instagram"></i>
					</button>
					<button class="button">
						<i class="fab fa-twitter"></i>
					</button>
					<button class="button">
						<i class="fab fa-whatsapp"></i>
					</button>
				</div>
			</div>
		</vue-final-modal>
		<!-- End -->

		<RelatedCourse />

		<RelatedProduct />
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
// ** components
import RelatedCourse from './RelatedCourse.vue';
import RelatedProduct from './RelatedProduct.vue';
// ** Apis
import { ProductApi } from '@/apis/product.api';
// ** Models
import { setProduct } from '@/models/product.model';
// ** Helper
import * as Helper from '@/utils/helper';

const route = useRoute();

const productApi = new ProductApi();

const cartData = reactive({
	data: {			
		count: 0,
		pages: 1,
		page: 1,
		limit: 100,
		data: {				
			ecom_cart: [],
			lms_cart: [],
		},
	},
	notif: {
		show: false,
		text: '',
	},
});

const productData = reactive({
	data: {},
	quantity: {
		total: 1,
	},
	loading: false,
});

const showingFullText = ref(false);
// const bodyDesc = ref('Lorem ipsum dolor sit amet');
const viewAddToCart = ref(false);
const viewAddToWishlist = ref(false);
const viewDeleteToWishlist = ref(false);
const isActiveWishlist = ref(false);
const viewShare = ref(false);

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
}; getProduct();


const getCartAvailableQuantity = () => {
	let cartECOM = cartData.data.ecom_cart;		
	let cartECOMQuantity = 0;

	let productData = productData.data;
	let productStock = 0;

	if (
		Array.isArray(productData.stock) && 
		productData.stock.length > 0
	) {
		if (productData.stock[0].stock) {
			productStock = productData.stock[0].stock;
		}
	}

	if (
		Array.isArray(cartECOM) && 
		cartECOM.length > 0
	) {
		cartECOM.forEach((cart) => {
			if (cart.item_id == productData.id) {
				cartECOMQuantity = cart.quantity;
			}
		});
	}

	return productStock - cartECOMQuantity;
}

const getProductBuyPrice = () => {
	let quantity = productData.quantity;
	let pricelist = productData.data.pricelist;
	let price = 0;

	if (Array.isArray(pricelist) && pricelist.length > 0) {
		pricelist = pricelist[0];

		price = Helper.clearIDR(pricelist.price);		
		price = price * quantity.total;
		
		if (typeof price == 'number' && !Number.isInteger(price)) {
			price = price.toFixed(2);
		}
	}

	return Helper.setIDR(price);
}


const isProductEmpty = () => {
	let productStock = productData.data.stock;

	if (
		productStock &&
		Array.isArray(productStock) &&
		productStock.length > 0 &&
		productStock[0].stock && 
		productStock[0].stock > 0
	) {
		return false;
	}
	else {
		return true;
	}
}

const isQtyAddDisabled = () => {
	let productStock = productData.data.stock;
	let productQuantity = productData.quantity;

	let isDisabled = false;

	if (!productStock) {
		// let productQuantity: any = productData.quantity;		
		// let productStock: any = productData.data.stock;

		// if (productQuantity.total == productStock[0].stock) {
		// 	isDisabled = true;
		// }
		
		let cartStock = getCartAvailableQuantity();

		if (productQuantity.total == cartStock) {
			isDisabled = true;
		}
	}
	else {
		isDisabled = true;
	}
	
	return isDisabled;
}

const isQtyReduceDisabled = () => {
	let isDisabled = false;

	if (isProductEmpty()) {
		isDisabled = true;
	}
	else {
		let productQuantity = productData.quantity;

		if (productQuantity.total <= 1) {
			isDisabled = true;
		}
	}
	
	return isDisabled;
}

const setQtyAdd = () => {
	let productQuantity = productData.quantity;		
	let productStock = productData.data.stock;

	if (!isProductEmpty()) {
		if (
			productQuantity.total < 
			productStock[0].stock
		) {
			productQuantity.total += 1;         
		}			
	}      
}

const setQtyReduce = () => {
	let productQuantity = productData.quantity;

	if (productQuantity.total > 1) {
		productQuantity.total = productQuantity.total - 1;
	}
}

const setToCart = () => {
	viewAddToCart.value = true;
   setTimeout(() => viewAddToCart.value = false, 3000);
};

const actToWishlist = () => {
	if (!isActiveWishlist.value) {
		isActiveWishlist.value = true;
		viewAddToWishlist.value = true;
		setTimeout(() => viewAddToWishlist.value = false, 2000);
	} else {
		isActiveWishlist.value = false;
		viewDeleteToWishlist.value = true;
		setTimeout(() => viewDeleteToWishlist.value = false, 2000);
	}
};

</script>

<!-- <script>

export default {
    computed: {
        formattedBody() {
            if (this.showingFullText) {
                return this.bodyDesc;
            }
            return `${this.bodyDesc.slice(0, 120).trim()}...`;
        }
    },
};
</script> -->

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