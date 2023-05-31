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
								<h3>Masuk</h3>
								
								<div v-if="alertData.text" class="box-alert alert alert-warning">
									<i class="fas fa-exclamation-circle" /> {{ alertData.text }}
								</div>
								
								<div class="box-access">
									<i class="fas fa-envelope icon-access" />
									<input 
										@keydown.enter="login"
										v-model="getVuelidate().email.$model" 
										class="text-access" 
										placeholder="Email" 
									>
									<div 
										v-if="getVuelidate().email.$errors.length > 0" 
										class="input-errors"
									>
										<div class="error-msg">
											{{ getVuelidate().email.$errors[0].$message }}
										</div>
									</div>
								</div>
									
								<div class="box-access">
									<i class="fas fa-lock icon-access" />
									<input 
										@keydown.enter="login"
										v-model="getVuelidate().password.$model" 										
										:type="isShowPass ? 'text' : 'password'"  
										class="text-access" 
										placeholder="Kata Sandi" 
									>
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
								<button 
									@click="login" 
									type="submit" 
									class="button-blue-alt"
									:disabled="loginData.loadingDisabled"
								>
									{{ loginData.loadingSubmit ? 'Loading..' : 'Masuk' }}
								</button>

								<!-- <div class="box-separator">
									<div class="line-separator"></div>
									<div class="title-separator">
										atau
									</div>
								</div>
								<button class="button-silver">
									<img src="@/assets/images/icon-google.png">Masuk menggunakan Google
								</button> -->

								<div class="box-link">
									Belum punya akun? <router-link to="/register">Daftar disini</router-link>
								</div>
								<!-- <div class="box-link">
									<router-link to="/forgot-password">Lupa kata sandi?</router-link>
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers as vuelidateHelper } from "@vuelidate/validators";
// import { useRouter } from 'vue-router';
// ** Apis
import { AuthApi } from "@/apis/auth.api";
// ** Helper
import * as Helper from "@/utils/helper";
// ** Stores
import { UserStore } from "@/stores/user.store";
// ** Models
import { setUser } from '@/models/user.model';

// const router = useRouter();

const authApi = new AuthApi();

const userStore = UserStore();

const alertData = reactive({
	text: '',
});

const loginData = reactive({
	data: {
		email: '',
		password: '',
	},
	loadingSubmit: false,
	loadingDisabled: false,
});

const isShowPass = ref(false);

const validations = () => {
	let rules = {
		data: {
			email: {},
			password: {},
		},
	};

	let loginRuleData = rules.data;
	
	loginRuleData.email = {
		required: vuelidateHelper.withMessage('Email harus diisi', required),
		email: vuelidateHelper.withMessage('Email format salah', email),
	};		

	loginRuleData.password = {
		required: vuelidateHelper.withMessage('Kata sandi harus diisi', required),			
		min: vuelidateHelper.withMessage('Kata sandi minimal 8 karakter', minLength(8)),
	};

	return rules;
};

const vuelidate = useVuelidate(validations(), loginData);

const getVuelidate = () => {
	return vuelidate.value.data;
}

const login = () => {
	alertData.text = '';

	vuelidate.value.$touch();

	if (!vuelidate.value.$invalid) {
		loginData.loadingDisabled = true;
		loginData.loadingSubmit = true;

		authApi
			.login({
				email: loginData.data.email,
				password: loginData.data.password,
			})
			.then(response => {
				response = response.data;

				let user = setUser(response.result);

				if(
					userStore.setStoreUser({
						id: user.id,
						name: user.name,
						email: user.email,
					})
				) {
					window.location.href = '/';
				}
				else {
					alertData.text = 'Gagal memnyimpan data user';
				}
				
				loginData.loadingDisabled = false;
				loginData.loadingSubmit = false;			
			})
			.catch(error => {
				error = Helper.getCatchError(error);
				
				if (error.code == 401) {
					alertData.text = 'Email atau password salah';
				}
				else if (error.code == 404) {
					alertData.text = 'Email belum terdaftar';
				}
				else {
					alertData.text = Helper.setCapitalizeFirstLetter(
						Helper.getArrayFirstIndex(error.message)
					);
				}

				loginData.loadingDisabled = false;
				loginData.loadingSubmit = false;
			});
	}
}

</script>