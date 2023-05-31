<template>
	<div class="section pt-50 pb-50">
		<div class="container">
			<div class="box-infoall-cart">
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
							
							<div class="list-all-cart">
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
											<router-link to="#">
												Vanila SP KoePoe 80 Soda 30 TBM Paket Baking Perista 45 Online 30 Baki
											</router-link>
										</h5>
										<span>
											Rp 300.000											
										</span>
									</div>
									<div class="clearer" />
									<div class="action-all-cart">
										<div class="row mt-2">
											<div class="col-6 col-md-6 col-lg-6 mt-3">
												<div class="box-qty">
													<span>
														<button class="button-qty" @click="decrement()">
															<i class="fas fa-minus"></i>
														</button>
													</span>
													<input class="text-qty" type="text" :value="quantity">
													<span>
														<button class="button-qty" @click="increment()">
															<i class="fas fa-plus"></i>
														</button>
													</span>
												</div>
											</div>
											<div class="col-6 col-md-6 col-lg-6 mt-3 text-right">
												<div class="box-icon-qty">
													<i class="far fa-trash-alt" @click="delData"></i>
												</div>
											</div> 
										</div>
									</div>
								</div>  
							</div>
						</div>
						
					</div>
					<div class="col-sm-12 col-md-12 col-lg-4">
						<Payment />
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

<script>
import Payment from './Payment.vue'
export default ({
	
	name: 'App',
	components: {
		Payment,
	},
	
	data() {
		
		return{
			viewSuccessConfirm: false,
			quantity: 1
		}  
	},
	methods: {
		
		delData() {
			this.$swal({
				text: "Kamu yakin akan menghapus data ini dari keranjang belanja?",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ya, Hapus',
				cancelButtonText: "Batal",
				allowOutsideClick: false
			}).then((result) => {
				if (result.isConfirmed) {
					this.$swal({
						icon: 'success',
						text : 'Data telah berhasil dihapus',
						confirmButtonText:'Close',
					})
				}
			})
		},
		
		increment () {
			this.quantity++
		},
		decrement () {
			if(this.quantity > 1) {
				this.quantity--
			}
		}
		
	}
});
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