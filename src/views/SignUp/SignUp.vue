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
							<div class="display-mobile box-ilustration-mobile">
								<img alt="" src="@/assets/images/bg-login-daftar.png">
							</div>
							<div class="box-action-alt">
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

								<div class="box-alert alert alert-warning">
									<i class="fas fa-exclamation-circle"></i> Email sudah terdaftar
								</div>

								<div class="row">
									<div class="col-12 col-md-12 col-lg-6">
										<div class="box-field-auth">
											<div class="title-field">Nama Depan <span>*</span></div>
											<input type="text" name="" class="text-field">
										</div>
									</div>
									<div class="col-12 col-md-12 col-lg-6">
										<div class="box-field-auth">
											<div class="title-field">Nama Belakang</div>
											<input type="text" name="" class="text-field">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-12 col-md-12 col-lg-6">
										<div class="box-field-auth">
											<div class="title-field">No. Telepon <span>*</span></div>
											<input type="text" name="" class="text-field">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-12 col-md-12 col-lg-6">
										<div class="box-field-auth">
											<div class="title-field">Email <span>*</span></div>
											<input type="text" name="" class="text-field">
										</div>
									</div>
									<div class="col-12 col-md-12 col-lg-6">
										<div class="box-field-auth">
											<div class="title-field">Kata Sandi <span>*</span></div>
											<input type="text" name="" class="text-field">
											<i class="far fa-eye-slash icon-eye"></i>
										</div>
									</div>
								</div>
								
								<br />
								<div class="box-link">
									Dengan mendaftar, Anda menyetujui <br />
									<router-link to="/">Ketentuan Penggunaan</router-link> dan <router-link to="/">Kebijakan Privasi</router-link>
								</div>
						
								<div class="text-center">
									<router-link to="/register-success">
										<input type="submit" name="" value="Mendaftar" class="button-blue-alt-md">
									</router-link>
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
export default {
  name: 'App',
}
</script>