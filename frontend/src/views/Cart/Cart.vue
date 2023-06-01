<template>
	<div class="section pt-50 pb-50">
		<div v-if="!cartData.loading" class="container">
			<div v-if="cartData.data.count > 0" class="box-infoall-cart">
				<div class="row">
					<div class="col-sm-12 col-md-12 col-lg-8">
						<div class="box-title-cart">
							<h3>Keranjang</h3>
						</div>
							
						<div class="box-all-cart">
							<label class="form-check-label" for="inlineCheckbox2">
								<i class="fas fa-circle clr-blue" />&nbsp;<span class="clr-blue"><b>Barang</b></span>
							</label>
							
							<div 
								v-for="(cart, i) in cartData.data.data" :key="i" 
								class="list-all-cart"
							>
								<div class="right-all-cart">
									<div class="cover-all-cart">
										<div class="img-all-cart">
											<img :src="cart.product.image">											
										</div>
									</div>
									<div class="content-all-cart">
										<h5>
											<router-link :to="{ 
												name: 'ProductDetail',  
												params: {
													slug: cart.product.slug,
												},
											}">
												{{ 
													cart.product.title ?
													cart.product.title : '-'
												}}
											</router-link>
										</h5>
										<span>
											{{ 
												cart.product.price ?
												cart.product.price : '-'
											}} 										
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
													<input
														v-model="cart.quantity"
														class="text-qty"
														:disabled="true"
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
							<h3>Ringkasan Belanja</h3>
							<div 
								v-for="(cart, i) in cartData.data.data" :key="i"  
								class="list-summary"
							>
								<div class="left-summary">
									{{ 
										cart.product.title ?
										cart.product.title : '-'
									}} 
									<span>
										{{ 
											cart.quantity ? 
											cart.quantity : 0
										}} Item
									</span>
								</div>
								<div class="right-summary">
									<b>{{ setCalcPrices(cart) }}</b>
								</div>
								<div class="clearer"/>
							</div>
							<hr />
							<div class="list-summary">
								<div class="left-summary-alt">
									<b class="clr-black-dark">Total Harga</b>
								</div>
								<div class="right-summary-alt">
									<b class="clr-red">
										{{ 
											cartData.totalPrice ?
											cartData.totalPrice : 'Rp 0'
										}}
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

			<div v-else class="m-box-blankdata">
				<img src="@/assets/images/bg-blank-data.png" alt="" />
				<div class="m-desc-blankdata">
					<h1>Opps! Keranjang belanja kamu kosong</h1>
					Yuk belanja lagi dan ikuti kursus
				</div>
				<br />
				<router-link :to="{ name: 'Product' }">
					<button class="button button-blue">
						<b>Mulai Belanja</b>
					</button>
				</router-link>
			</div>
		</div>
		<div v-else class="container text-center">
			Loading..<br><br>
			<div class="spinner-border text-danger" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject, reactive, computed, onMounted } from 'vue';
// ** Stores
import { CartStore } from '@/stores/cart.store';
import { UserStore } from '@/stores/user.store';
// ** Apis
import { CartApi } from '@/apis/cart.api';
// ** Helper
import * as Helper from '@/utils/helper';

const Swal = inject('$swal');

const cartApi = new CartApi();

const cartStore = CartStore();
const userStore = UserStore();

const cartData = reactive({
	data: computed(() => {
		return cartStore.getStoreCarts.data;
	}),
	totalPrice: computed(() => {
		let totalPrice = 0;

		if (cartData.data) {
			cartData.data.data.forEach(cart => {
				totalPrice +=  
					Helper.clearIDR(cart.product.price) * 
					cart.quantity;
			});
		}

		return Helper.setIDR(totalPrice);
	}),
	loading: computed(() => {
		return cartStore.getStoreCarts.loading;
	})
});

const userData = reactive({
	data: userStore.getStoreUser, 
});

onMounted(() => {
	if (!cartData.data) {
		getCarts();
	}
});

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

const setCalcPrices = (cart) => {
	return Helper.setIDR(
		Helper.clearIDR(cart.product.price) * 
		cart.quantity
	);
};

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

					getCarts();

					Swal({
						icon: 'success',
						text : 'sukses hapus produk',
						confirmButtonText: 'Tutup',
					});
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
	else {
		Swal({
			icon: 'error',
			title: 'Quantitas tidak bisa melebihi stok produk',
			confirmButtonText: 'Tutup',
		}).then((result) => {
			console.log(result);
		});
	}

	cartStore.setStoreDataCarts(cartData.data);
}

const setQtyReduce = (cart) => {
	if (cart.quantity > 1) {
		cart.quantity = cart.quantity - 1;
	}

	cartStore.setStoreDataCarts(cartData.data);
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