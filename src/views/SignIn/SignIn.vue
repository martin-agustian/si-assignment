<template>
	<div class="box-page">
		<div class="left-page">
			<div class="box-logo-auth">
				<div class="box-arrow-back display-mobile">
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
							<div class="display-mobile box-ilustration-mobile">
								<img alt="" src="@/assets/images/bg-login-daftar.png">
							</div>
							<div class="box-action">
								<h3>Masuk</h3>
								
								<div class="box-alert alert alert-warning">
									<i class="fas fa-exclamation-circle"></i> Email / Kata sandi salah
								</div>
								
								<form @submit.prevent="enabledSubmit">
									<div class="box-access">
										<i class="fas fa-envelope icon-access"></i>
										<input type="text" name="" class="text-access" placeholder="Email" v-model="a$.validate2.email.$model">
										<div class="input-errors" v-for="(error, index) of a$.validate2.email.$errors" :key="index">
											<div class="error-msg">{{ error.$message }}</div>
										</div>
									</div>
									
									<div class="box-access">
										<i class="fas fa-lock icon-access"></i>
										<input type="password" name="" class="text-access" placeholder="Kata Sandi" v-model="a$.validate2.password.$model">
										<i class="far fa-eye-slash icon-eye"></i>
										<div class="input-errors" v-for="(error, index) of a$.validate2.password.$errors" :key="index">
											<div class="error-msg">{{ error.$message }}</div>
										</div>
									</div>
									<button type="submit" class="button-blue-alt">
										<!-- <img src="@/assets/images/loading.gif" class="img-spinner" alt=""> -->
										Masuk
									</button>
									<!--
									<input type="submit" name="" value="Masuk" class="button-blue-alt">
									-->
								</form>

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

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  name: 'App',
  setup () {
    return { 
		a$: useVuelidate()
	}
  },
  data() {
    return {
		validate2: {
			email: '',
			password: '',
		},
		submitted: false
    }
  },
    
  validations() {
    return {
		validate2: {
			email: { required, email },
			password: { required, min: minLength(6) },
		},
    }
  },
  methods: {
    enabledSubmit() {
		this.a$.$touch();
    }
  }
}
</script>