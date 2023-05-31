<template>
	<div class="section pt-50 pb-50">
		<div class="container">
			<div v-if="!cartData.loading" class="box-infoall-cart">
				<div class="row">
					<div class="col-sm-12 col-md-12 col-lg-8">
						<div class="box-title-cart">
							<h3>
								Keranjang
							</h3>
						</div>
							
						<div class="box-all-cart">
							<label class="form-check-label" for="inlineCheckbox2">
								<i class="fas fa-circle clr-blue"></i>&nbsp;<span class="clr-blue"><b>Barang</b></span>
							</label>
							
							<div 
								v-for="(cart, i) in cartData.data.data" :key="i" 
								class="list-all-cart"
							>
								<div class="right-all-cart">
									<div class="cover-all-cart">
										<div class="img-all-cart">
											<router-link to="#">
												<img src="@/assets/images/img-store-2.jpg">
											</router-link>
										</div>
									</div>
									<div class="content-all-cart">
										<h5>
											<router-link :to="'/category/'+cart.product.slug">
												{{ cart.product.title }}
											</router-link>
										</h5>
										<span>
											{{ cart.product.price }} 										
										</span>
									</div>
									<div class="clearer" />
									<div class="action-all-cart">
										<div class="row mt-2">
											<div class="col-6 col-md-6 col-lg-6 mt-3">
												<div class="box-qty">
													<span>
														<button 
															@click="setQtyReduce(cart)"
															class="button-qty"
														>
															<i class="fas fa-minus" />
														</button>
													</span>
													<!-- v-model="cartData.quantity.total" -->
													<!-- :disabled="productData.data.stock <= 0" -->
													<input 
														@input="checkQtyInput()"
														v-model="cart.quantity"
														class="text-qty"
													>
													<span>
														<button 
															@click="setQtyAdd(cart)"
															class="button-qty" 
														>
															<i class="fas fa-plus" />
														</button>
													</span>
												</div>
											</div>
											<div class="col-6 col-md-6 col-lg-6 mt-3 text-right">
												<div class="box-icon-qty">
													<i 
														@click="setDeleteCart(cart)"
														class="far fa-trash-alt" 
													/>
												</div>
											</div> 
										</div>
									</div>
								</div>  
							</div>
						</div>
						
					</div>
					<div class="col-sm-12 col-md-12 col-lg-4">
						<div class="box-summary">
							<h3>
								Ringkasan Belanja
							</h3>
							<div 
								v-for="(cart, i) in cartData.data.data" :key="i"  
								class="list-summary"
							>
								<div class="left-summary">
									{{ cart.product.title }} 
									<span>{{ cart.quantity }} Item</span>
								</div>
								<div class="right-summary">
									<b>{{ cartPrice(cart) }}</b>
								</div>
								<div class="clearer"></div>
							</div>
							<hr />
							<div class="list-summary">
								<div class="left-summary-alt">
									<b class="clr-black-dark">Total Harga</b>
								</div>
								<div class="right-summary-alt">
									<!-- <b class="clr-red">Rp 900.000</b> -->
									<b class="clr-red">
										{{ cartTotalPrice }}
									</b>
								</div>
								<div class="clearer" />
							</div>
							
							<button class="button button-green w-100" :disabled="true">
								<b>Beli Sekarang</b>
							</button>
						</div>
					</div>
				</div>
			</div>
			
			<!-- Keranjang Kosong -->
			<!--
				<div class="m-box-blankdata">
					<img src="@/assets/images/bg-blank-data.png" alt="" />
					<div class="m-desc-blankdata">
						<h1>Opps! Keranjang belanja kamu kosong</h1>
						Yuk belanja lagi dan ikuti kursus
					</div>
					<br />
					<router-link to="/">
						<button class="button button-blue">
							<b>Mulai Belanja</b>
						</button>
					</router-link>
				</div>
			-->			
		</div>
	</div>
</template>

<script setup>
// computed, 
import { inject, reactive, computed, onMounted } from 'vue';
// ** Stores
import { CartStore } from '@/stores/cart.store';
import { UserStore } from '@/stores/user.store';
// ** Apis
import { CartApi } from '@/apis/cart.api';
// ** Helper
import * as Helper from '@/utils/helper';
// ** Models
import { setCarts } from '@/models/cart.model';

const Swal = inject('$swal');

const cartApi = new CartApi();

const cartStore = CartStore();
const userStore = UserStore();

// const cartData = computed(() => {
// 	return cartStore.getStoreCarts;
// });


const cartData = reactive({
	data: cartStore.getStoreCarts.data,
	loading: false,
});

const cartPrice = computed(() => {
	return (cart) => Helper.setIDR(
		Helper.clearIDR(cart.product.price) * cart.quantity
	);
});

const cartTotalPrice = computed(() => {
	let totalPrice = 0;

	if (cartData.data) {
		cartData.data.data.forEach(cart => {
			totalPrice +=  
				Helper.clearIDR(cart.product.price) * 
				cart.quantity;
		});
	}

	return Helper.setIDR(totalPrice);
});

const getCarts = () => {
	let params = {};

	params.user_id = userData.data.id;

	cartData.loading = true;

	cartApi
		.list({ params: params })
		.then(response => {
			response = response.data;

			cartStore.setStoreCarts(
				// {
				// data: 
				setCarts(response.result) 
			// }
			);
			cartData.data = cartStore.getStoreCarts.data;

			// console.log(cartData);

			cartData.loading = false;
		})
		.catch(error => {
			console.log(error);
			cartData.loading = false;
		});
}


onMounted(() => {
	getCarts();
});

const userData = reactive({
	data: userStore.getStoreUser,
});

// const getCarts = () => {
// 	cartStore.fetchCarts(
// 		userData.data.id
// 	);
// };

// getCarts();

const setDeleteCart = (cart) => {
	Swal({
		text: "Kamu yakin akan menghapus produk ini dari keranjang belanja?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Ya, Hapus',
		cancelButtonText: "Batal",
		allowOutsideClick: false
	}).then((result) => {
		if (result.isConfirmed) {
			cartApi
				.delete(cart.id)
				.then(response => {
					response = response.data;

					console.log(response);

					Swal({
						icon: 'success',
						text : 'sukses hapus produk',
						confirmButtonText: 'Tutup',
					});

					// cartStore.setStoreCarts(
					// 	// {
					// 	// data: 
					// 	setCarts(response.result) 
					// // }
					// );
					// cartData.data = cartStore.getStoreCarts.data;
				})
				.catch(error => {
					Swal({
						icon: 'error',
						text : error.message,
						confirmButtonText: 'Tutup',
					});

					console.log(error);
				});
		}
	})
}

const setQtyAdd = (cart) => {
	if (cart.quantity < cart.product.stock) {
		cart.quantity += 1;         
	}

	cartStore.setStoreCarts(cartData.data);
}

const setQtyReduce = (cart) => {
	if (cart.quantity > 1) {
		cart.quantity = cart.quantity - 1;
	}

	cartStore.setStoreCarts(cartData.data);
}

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
	margin: 0 10px;
	padding: 20px 10px;
	border: 1px solid #e2e8f0;
	border-radius: 15px;
	background-color: #fff;
	width: 540px;
}

</style>