<template>
	<div class="box-page">
		<div class="left-page">
			<div class="box-logo-auth">
				<div class="box-arrow-back display-mobile-auth">
					<router-link to="#">
						<i class="fas fa-arrow-left"></i>
					</router-link>
				</div>
				<router-link to="/">
					<img alt="" src="@/assets/images/logo.png">
				</router-link>
			</div>
			<div class="box-table">
				<div class="display-table">
					<div class="display-table-cell">
						<div class="box-ilustration">
							<img alt="" src="@/assets/images/bg-login-daftar.png">
						</div>
					</div>
				</div>
			</div>
			<div class="box-footer-auth">
				© 2021 - 2022 Super Indo. All Rights Reserved <br />				
			</div>
		</div>
		<div class="right-page">

			<!--
			<div class="box-navback display-mobile-auth bg-blue-dark">
				<div class="content-navback">
					<router-link to="/">
						<i class="fas fa-arrow-left"></i> Daftar
					</router-link>
				</div>
			</div>
			-->

			<div class="box-rounded">
				<div class="bg-rounded"></div>
			</div>

			<div class="box-table">
				<div class="display-table">
					<div class="display-table-cell">
						<div class="box-wrapper-auth">
							<div class="display-mobile-auth box-ilustration-mobile">
								<img alt="" src="@/assets/images/bg-login-daftar.png">
							</div>
							<div class="box-action">
								<h3>Daftar</h3>

								<!-- <div class="alert alert-info box-alert" role="alert">
									<div class="left-alert">
										<i class="fas fa-info-circle"></i>
									</div>
									<div class="right-alert">
										<b>Jika Kamu peserta Prakerja</b>. Pastikan nama depan dan nama belakang tertulis dengan benar karena akan tercetak pada sertifikat. Kami tidak akan menerima permintaan pergantian nama yang tertera pada sertifikat Kamu.
									</div>
								</div>
								<br /> -->

								<div v-if="alertData.text" class="box-alert alert alert-warning">
									<i class="fas fa-exclamation-circle" /> {{ alertData.text }}
								</div>

								<div class="box-field-auth">
									<div class="title-field">Nama <span>*</span></div>
									<input
										@keydown.enter="register"
										v-model="getVuelidate().name.$model" 
										class="text-field" 
									/>
									<div 
										v-if="getVuelidate().name.$errors.length > 0" 
										class="input-errors"
									>
										<div class="error-msg">
											{{ getVuelidate().name.$errors[0].$message }}
										</div>
									</div>
								</div>
								<div class="box-field-auth">
									<div class="title-field">Email <span>*</span></div>
									<input
										@keydown.enter="register"
										v-model="getVuelidate().email.$model" 
										class="text-field" 
									/>
									<div 
										v-if="getVuelidate().email.$errors.length > 0" 
										class="input-errors"
									>
										<div class="error-msg">
											{{ getVuelidate().email.$errors[0].$message }}
										</div>
									</div>
								</div>
								<div class="box-field-auth">
									<div class="title-field">Kata Sandi <span>*</span></div>
									<input
										@keydown.enter="register"
										v-model="getVuelidate().password.$model" 
										:type="isShowPass ? 'text' : 'password'" 
										class="text-field" 
									/>
									<i 
										@click="isShowPass = !isShowPass" 
										:class="isShowPass ? 'fa-eye' : 'fa-eye-slash'" 
										class="far icon-eye" 
									/>
									<div 
										v-if="getVuelidate().password.$errors.length > 0" 
										class="input-errors"
									>
										<div class="error-msg">
											{{ getVuelidate().password.$errors[0].$message }}
										</div>
									</div>
								</div>
								
								<br />
								<!-- <div class="box-link">
									Dengan mendaftar, Anda menyetujui <br />
									<router-link to="/">Ketentuan Penggunaan</router-link> dan <router-link to="/">Kebijakan Privasi</router-link>
								</div> -->
						
								<div class="text-center">
									<button 
										@click="register" 
										type="submit" 
										class="button-blue-alt-md"
										:disabled="registerData.loadingDisabled"
									>
										{{ registerData.loadingSubmit ? 'Loading..' : 'Mendaftar' }}
									</button>
								</div>
								
								<!-- <div class="box-separator">
									<div class="line-separator"></div>
									<div class="title-separator">
										atau
									</div>
								</div> -->

								<!-- <div class="text-center">
									<button class="button-silver-md">
										<img src="@/assets/images/icon-google.png">Masuk menggunakan Google
									</button>
								</div> -->

								<div class="box-link">
									Sudah punya akun? <router-link to="/login">Login disini</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers as vuelidateHelper } from "@vuelidate/validators";
// ** Api
import { AuthApi } from "@/apis/auth.api";
// ** Helper
import * as Helper from "@/shared/utils/helper";

export default {
	data() {
		return {
			vuelidate: useVuelidate(),
			authApi: new AuthApi(),
			alertData: {
				text: '',
			},
			registerData: {
				data: {
					name: 'martin',
					email: 'martin@mailinator.com',
					password: '12345678',
				},
				loadingSubmit: false, 
				loadingDisabled: false,
			},
			isShowPass: false,
		}
	},
	validations() {
		let rules = {
			registerData: {
				data: {
					name: {},
					email: {},
					password: {},
				},
			},
		};

		let registerRuleData = rules.registerData.data;

		registerRuleData.name = {
			required: vuelidateHelper.withMessage('Nama depan harus diisi', required),
		};
		
		registerRuleData.email = {
			required: vuelidateHelper.withMessage('Email harus diisi', required),
			email: vuelidateHelper.withMessage('Email format salah', email),
		};		

		registerRuleData.password = {
			required: vuelidateHelper.withMessage('Kata sandi harus diisi', required),			
			min: vuelidateHelper.withMessage('Kata sandi minimal 8 karakter', minLength(8)),
		};

		return rules;
	},

	methods: {
		getVuelidate() {
			return this.vuelidate.registerData.data;
		},
		register() {
			let alertData = this.alertData;
			let registerData = this.registerData.data;
			
			alertData.text = '';

			this.vuelidate.$touch();

			if (!this.vuelidate.$invalid) {
				this.registerData.loadingDisabled = true;
				this.registerData.loadingSubmit = true;

				this.authApi
					.register({
						name: registerData.name,
						email: registerData.email,
						password: registerData.password,
					})
					.then(response => {
						response = response.data;

						this.$swal({
							icon: 'success',
							title: 'Berhasil membuat akun baru',
							confirmButtonText: 'Tutup',
						}).then((result) => {
							console.log(result, response);
							this.$router.replace({ name: 'SignIn' });
						});
						
						this.registerData.loadingDisabled = false;
						this.registerData.loadingSubmit = false;				
					})
					.catch(error => {
						error = Helper.getCatchError(error);
						
						if (error.code == 423) {
							alertData.text = 'Email sudah pernah diregistrasi';
						}
						else {
							alertData.text = Helper.setCapitalizeFirstLetter(
								Helper.getArrayFirstIndex(error.message)
							);
						}

						this.registerData.loadingDisabled = false;
						this.registerData.loadingSubmit = false;
					});
			}
		}
	}
}
</script>