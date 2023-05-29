<template>

	<!-- Header -->
	<header>
		<div class="box-chanel">
			<div class="container">
				<div class="box-list-chanel">
					<div class="left-list-chanel">
						<div class="box-location-app">
							<div class="my-location-app">
								<div class="title-location-app">
									<i class="bi bi-geo-alt"></i> Jadetabek, Cibinong
								</div>
							</div>
							<div class="act-location-app">
								<div @click="actShowModalEditLoc">Ubah Lokasi</div>
							</div>
						</div>
						<!--
						<div class="box-download-app">
							<i class="bi bi-phone"></i> Download Bakingworld App
							<div class="dropdown-app">
								<div class="title-download-app">
									Download <br /> aplikasi Bakingworld di 
								</div>
								<div class="list-download-app">
									<router-link to="#">
										<img alt="" src="@/assets/images/google_play_store_logo_png.png">
									</router-link>
								</div>
								<div class="list-download-app">
									<img alt="" src="@/assets/images/google_app_store_logo.png" class="disabled-download-app">
									<small>Coming Soon</small>
								</div>
							</div>
						</div>
						-->
					</div>
					<div class="right-list-chanel">
						<a href="http://design.bakingworld.id/portal/">
							Home
						</a>
						<a href="http://design.bakingworld.id/lms/">
							Kursus
						</a>
						<a href="http://design.bakingworld.id/store/" class="active-list-chanel">
							Belanja
						</a>
						<a href="http://design.bakingworld.id/media/">
							Media
						</a>
						<a href="http://design.bakingworld.id/community/">
							Community
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="container">	
			<div class="box-header">
				<div class="left-header">
					<div class="box-icon-menu actBoxMenu display-mobile">
						<i class="bi bi-list"></i>
					</div>	
					<div class="box-logo">
						<router-link to="/">
							<img alt="" src="@/assets/images/logo.png">
						</router-link>
					</div>
				</div>
				<div class="center-header display-desktop">
					<div class="box-table">
						<div class="display-table">
							<div class="display-table-cell">
								<div class="box-mega-menu">
									<i class="fas fa-bars"></i> Kategori
									<div class="dropdown-mega-menu">
										<div class="list-dropdown-mega-menu">
											<router-link to="/category">
												Pastry
											</router-link>
											<div class="box-all-mega-menu">
												<div class="box-column-menu">
													<div class="list-column-menu">
														<router-link to="/category">
															Aneka Tepung
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Minyak & Margarine
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Susu
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Toping & Bijan
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Perasa & Pewarna
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Pengembang & Pelembut
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Isian Kue
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Bahan Prozen
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Makanan Kaleng
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Gula & Garam
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Telur
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Ragi
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Paket Menu
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Keju
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Meses
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Tepung Tapioka
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Beras
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Coklat
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Pudding
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Power Drink
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Premix
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Creamer
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Penyedap & Tepung Bumbu
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Sambal & Saos
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Santan
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Whip Cream
														</router-link>
													</div>
												</div>
											</div>
										</div>
										<div class="list-dropdown-mega-menu">
											<router-link to="/category">
												Peralatan Kue
											</router-link>
											<div class="box-all-mega-menu">
												<div class="box-column-menu">
													<div class="list-column-menu">
														<router-link to="/category">
															Peralatan Daput
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Cetakan Kue
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Plastik & Kemasan
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Toples
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Loyang
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Tas
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Sarung Tangan
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Peralatan Daput
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Cetakan Kue
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Plastik & Kemasan
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Toples
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Loyang
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Tas
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Sarung Tangan
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Peralatan Daput
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Cetakan Kue
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Plastik & Kemasan
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Toples
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Loyang
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Tas
														</router-link>
													</div>
													<div class="list-column-menu">
														<router-link to="/category">
															Sarung Tangan
														</router-link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="box-search">
									
									<form @submit.prevent="actSearch">
									<input type="text" class="text-search" placeholder="Kamu mau cari apa hari ini?">
									<button type="submit" class="button-search">
										<i class="fas fa-search"></i>
									</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="right-header">
					<div class="box-table">
						<div class="display-table">
							<div class="display-table-cell">
								<ul class="box-nav-right">
									
									<!-- Before Login -->
									<li>
										<router-link to="#">
											<i class="bi bi-bell"></i>
											<span class="bg-green">0</span>
										</router-link>
										
										<div class="nav-right-dropdown display-desktop">

											<div class="title-info-cart">
												<div class="left-info-cart">
													Notifikasi
												</div>
												<div class="right-info-cart">
													<router-link to="#">
														Lihat Semua
													</router-link>
												</div>
												<div class="clearer"></div>
											</div>

											<div class="box-info-notif">
												
												<div class="list-info-notif unread">
													<router-link to="#">
														<div class="label-info-notif">
															<small>
																Promo
															</small>
															<div class="date-info-notif">2 Des</div>
														</div>
														<h5>
															Voucher Harga Murah
														</h5>
														<div class="desc-info-notif">
															Pembelian Maksimal Rp 1.000.000
															<img src="@/assets/images/banner-alt-1.jpg" alt="">
														</div>
													</router-link>
												</div>
												<div class="list-info-notif unread">
													<router-link to="#">
														<div class="label-info-notif">
															<small>
																Belanja
															</small>
															<div class="date-info-notif">2 Des</div>
														</div>
														<h5>
															Menunggu Pembayaran
														</h5>
														<div class="desc-info-notif">
															Kamu belum melakukan pembayaran dengan nomor invoice order 123.
														</div>
													</router-link>
												</div>
												<div class="list-info-notif">
													<router-link to="#">
														<div class="label-info-notif">
															<small>
																Kursus
															</small>
															<div class="date-info-notif">2 Des</div>
														</div>
														<h5>
															Sudah dibayar
														</h5>
														<div class="desc-info-notif">
															Kamu sudah melakukan pembayaran kursus
														</div>
													</router-link>
												</div>
												
											</div>

											<!-- Jika Keranjang kosong -->
											<!--
											<div class="box-blank-info">
												<img src="@/assets/images/img-keranjang-kosong.png" alt="">
												<h5>
													Belum memiliki notifikasi
												</h5>
												<small>
													Tidak ada notifikasi saat ini untuk Kamu. Notifikasi akan muncul disini
												</small>
											</div>
											-->
											
										</div>
									</li>
									<!-- End -->

									<li>
										<router-link to="#">
											<i class="bi bi-cart"></i>
											<span class="bg-red">0</span>
										</router-link>
										<div class="nav-right-dropdown display-desktop">

											<div class="title-info-cart">
												<div class="left-info-cart">
													Keranjang (3)
												</div>
												<div class="right-info-cart">
													<router-link to="#">
														Lihat Sekarang
													</router-link>
												</div>
												<div class="clearer"></div>
											</div>

											<div class="box-info-cart">
												<router-link to="#">
													<div class="list-info-cart">
														<div class="cover-info-cart">
															<div class="img-info-cart">
																<img src="@/assets/images/img-store-1.jpg" alt="">
															</div>
														</div>
														<div class="content-info-cart">
															<div class="left-content-info-cart">
																<h5>
																	Pewarna Kue Merah Koepoe Spesial
																</h5>
																<small>1 Barang</small>
															</div>
															<div class="right-content-info-cart">
																Rp 300.000
															</div>
														</div>
														<div class="clearer"></div>
													</div>
												</router-link>
												<router-link to="#">
													<div class="list-info-cart">
														<div class="cover-info-cart">
															<div class="img-info-cart">
																<img src="@/assets/images/img-store-2.jpg" alt="">
															</div>
														</div>
														<div class="content-info-cart">
															<div class="left-content-info-cart">
																<h5>
																	Bahan Kue Koepoe 30 Gram Pengemulsi 
																</h5>
																<small>1 Barang</small>
															</div>
															<div class="right-content-info-cart">
																Rp 300.000
															</div>
														</div>
														<div class="clearer"></div>
													</div>
												</router-link>
												<router-link to="#">
													<div class="list-info-cart">
														<div class="cover-info-cart">
															<div class="img-info-cart">
																<img src="@/assets/images/img-course-1.jpg" alt="">
															</div>
														</div>
														<div class="content-info-cart">
															<div class="left-content-info-cart">
																<h5>
																	Mengolah Berbagai Variasi Bronis Untuk Menjadi Pembuat Kue 
																</h5>
																<small>1 Kursus</small>
															</div>
															<div class="right-content-info-cart">
																Rp 300.000
															</div>
														</div>
														<div class="clearer"></div>
													</div>
												</router-link>
												
											</div>

											<!-- Jika Keranjang kosong -->
											<!--
											<div class="box-blank-info">
												<img src="@/assets/images/img-keranjang-kosong.png" alt="">
												<h5>
													Keranjang belanja Kamu kosong !
												</h5>
												<small>
													Temukan berbagai produk unggulan dan nikmati penawaran terbaik dari Kami.
												</small>
											</div>
											-->

										</div>
									</li>
								</ul>

								<!-- Before Login -->
								<!--
								<button class="button button-outline-blue display-desktop">Daftar</button>
								&nbsp;
								<button class="button button-blue">Masuk</button>
								-->
								<!-- End -->
								
								
								<!-- After Login -->
								<div class="box-avatar actBoxMenuMember">
									<div class="init-avatar bg-blue">
										A
									</div>

									<!-- Jika ada Foto -->
									<!--
									<div class="img-avatar">
										<img src="@/assets/images/img-john-doe.jpg" alt="">
									</div>
									-->
									<!-- End -->
								
									<div class="bio-avatar display-desktop">
										<small>Hai,</small>
										<div class="title-avatar">
											John Doe
										</div>
									</div>
									<i class="fas fa-chevron-down"></i>
									<div class="box-member-dropdown display-desktop">
										<router-link to="/my-account">
											<i class="bi bi-person"></i> Profil Saya
										</router-link>
										<router-link to="#">
											<i class="bi bi-bounding-box-circles"></i> Komunitas Saya
										</router-link>
										<router-link to="/my-courses">
											<i class="bi bi-play-circle"></i> Kursus Saya
										</router-link>
										<router-link to="/orders">
											<i class="bi bi-clock-history"></i> History Pembelian
										</router-link>
										<router-link to="/my-events">
											<i class="bi bi-ticket"></i> Event Saya
										</router-link>
										<router-link to="/promo-code">
											<i class="bi bi-gift"></i> Kode Promo
										</router-link>
										<router-link to="/wishlist">
											<i class="bi bi-heart"></i> Wishlist
										</router-link>
										<router-link to="/review">
											<i class="bi bi-star"></i> Ulasan
										</router-link>
										<router-link to="/register-b2b">
											<i class="bi bi-door-open"></i> Mendaftar Ke B2B
										</router-link>
										<hr />
										<router-link to="/">
											<i class="bi bi-box-arrow-left"></i> Keluar
										</router-link>
									</div>
								</div>
								<!-- End -->

							</div>
						</div>
					</div>
				</div>
				<div class="clearer"></div>
				
			</div>
			<div class="display-mobile">
			<div class="box-search">
				<form @submit.prevent="actSearch">
				<input type="text" class="text-search" placeholder="Kamu mau cari apa hari ini?">
				<button type="submit" class="button-search">
					<i class="fas fa-search"></i>
				</button>
				</form>
			</div>
			</div>
		</div>
	</header>
	<!-- End -->

	<div class="clearer-header"></div>

	<div class="box-menu-overlay display-mobile">
		<div class="modal-overlay-menu actCloseMenu"></div>
		<div class="box-menu">
			<div class="close-menu actCloseMenu">
				<i class="fas fa-times"></i>
			</div>

			<!-- Before Login -->
			<!--
			<div class="box-mobile-access">
				<div class="row">
					<div class="col-md-12">
						<button class="button button-outline-blue s-100">
							Daftar
						</button>
					</div>
					<div class="col-md-12">
						<button class="button button-blue s-100">
							Masuk
						</button>
					</div>
				</div>
			</div>
			-->
			<!-- End -->

			<!-- After Login -->

			<div class="m-box-bio">

				<!-- Jika image tidak tersedia -->
				<div class="m-init-bio">
					A
				</div>
				<!-- End -->

				<!-- Jika image tersedia -->
				<!--
				<div class="m-init-bio-image">
					<img src="@/assets/images/img-john-doe.jpg" alt="">
				</div>
				-->

				<div class="m-history-bio">
					<h5>Andriana</h5>
					<small>
						<i class="fas fa-medal clr-silver"></i> Classic Member
					</small>
				</div>
			</div>

			<div class="box-member-dropdown display-mobile clearer-padding">
				<small>Chanel</small>
				<a href="http://design.bakingworld.id/portal" class="actCloseMenu">
					Home
				</a>
				<a href="http://design.bakingworld.id/lms" class="actCloseMenu">
					Kursus
				</a>
				<a href="http://design.bakingworld.id/store" class="actCloseMenu">
					Belanja
				</a>
				<a href="http://design.bakingworld.id/community" class="actCloseMenu">
					Community
				</a>
				<a href="http://design.bakingworld.id/media" class="actCloseMenu">
					Media
				</a>
			</div>

			<hr />

			<!-- End -->

			<!--
			<div class="box-member-dropdown display-mobile">
				<small>Kategori</small>
				<router-link to="/category" class="actCloseMenu">
					Pastry 
				</router-link>
				<router-link to="/category" class="actCloseMenu">
					Peralatan Kue 
				</router-link>
			</div>
			-->

			<div class="box-member-dropdown display-mobile">
				<small>Kategori</small>
				<div id="navigation-menu-mobile" class="nav-mobile-menu">
					<ul>
						<li class="has-sub-menu">
							<router-link to="#">
								Pastry
							</router-link>
							<ul>
								<li>
									<router-link to="/category"  class="actCloseMenu">
										Aneka Tepung
									</router-link>
								</li>
								<li>
									<router-link to="/category"  class="actCloseMenu">
										Minyak & Margarine
									</router-link>
								</li>
								<li>
									<router-link to="/category"  class="actCloseMenu">
										Susu
									</router-link>
								</li>
							</ul>
						</li>
						<li class="has-sub-menu">
							<router-link to="#">
								Peralatan Kue
							</router-link>
							<ul>
								<li>
									<router-link to="/category"  class="actCloseMenu">
										Cetakan Kue
									</router-link>
								</li>
								<li>
									<router-link to="/category"  class="actCloseMenu">
										Loyang
									</router-link>
								</li>
								<li>
									<router-link to="/category"  class="actCloseMenu">
										Tas
									</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			

		</div>
	</div>

	<!-- Mobile Version -->
	<div class="box-menuMember-overlay display-mobile">
		<div class="modal-overlay-menuMember actCloseMenuMember"></div>
		<div class="box-menu-member">
			<div class="close-menu actCloseMenuMember">
				<i class="fas fa-times"></i>
			</div>
			<div class="box-member-dropdown display-mobile">
				<small>Manage</small>
				<router-link to="/my-account" class="actCloseMenuMember">
					<i class="bi bi-person"></i> Profil Saya
					<span>
						Biodata diri, Daftar Alamat & Kata Sandi
					</span>
				</router-link>
				<router-link to="#" class="actCloseMenuMember">
					<i class="bi bi-bounding-box-circles"></i> Komunitas Saya
					<span>
						Review & Forum Diskusi
					</span>
				</router-link>
				<router-link to="/my-courses" class="actCloseMenuMember">
					<i class="bi bi-play-circle"></i> Kursus Saya
					<span>
						Cek progress kursus & Sertifikat
					</span>
				</router-link>
				<router-link to="/orders" class="actCloseMenuMember">
					<i class="bi bi-clock-history"></i> History Pembelian
					<span>
						Cek pembelian terakhir Kamu
					</span>
				</router-link>
				<router-link to="/my-events" class="actCloseMenuMember">
					<i class="bi bi-ticket"></i> Event Saya
					<span>
						Cek tiket event Kamu
					</span>
				</router-link>
				<router-link to="/promo-code" class="actCloseMenuMember">
					<i class="bi bi-gift"></i> Kode Promo
					<span>
						Gunakan kode promo agar lebih hemat
					</span>
				</router-link>
				<router-link to="/wishlist" class="actCloseMenuMember">
					<i class="bi bi-heart"></i> Wishlist
					<span>
						Kursus / Barang favorit 
					</span>
				</router-link>
				<router-link to="/review" class="actCloseMenuMember">
					<i class="bi bi-star"></i> Ulasan
					<span>
						Buat ulasan pembelian
					</span>
				</router-link>
				<router-link to="/register-b2b" class="actCloseMenuMember">
					<i class="bi bi-door-open"></i> Mendaftar Ke B2B
					<span>
						Dapatkan harga lebih murah
					</span>
				</router-link>

				<router-link to="/" class="actCloseMenuMember">
					<i class="bi bi-box-arrow-left"></i> Keluar
				</router-link>
			</div>
		</div>
	</div>

	<!-- Download App -->
	
	<NotificationDownload />



    <!-- Modal Edit - Loc -->
    <vue-final-modal v-model="showModalEditLoc" classes="modal-container" :click-to-close="false" content-class="modal-content">
		
        <button class="modal__close" @click="actCloseModalEditLoc" v-show="viewMasterLocation">
            <i class="bi bi-x-lg"></i>
        </button>
		<button class="modal__close modal__close__alt" @click="actCloseSublocation" v-show="viewSubLocation">
            <i class="bi bi-arrow-left-circle-fill"></i> Back
        </button>

		<span class="modal__title mb-3">
			<div v-show="viewMasterLocation">
				<div class="text-center">Pilih Lokasi</div>
				<small>
					Silahkan pilih area pengiriman
				</small>
			</div>
			<div v-show="viewSubLocation">
				<div class="text-center clr-blue">Jadetabek</div>
				<small>
					Silahkan pilih detail area pengiriman
				</small>
			</div>
		</span>
		<div class="modal__content mt-3">
			<div v-show="viewMasterLocation">
				<div class="box-field">
					<div class="icon-field">
						<i class="fas fa-search oc-38"></i>
						<input type="text" class="form-control pl-left-40" placeholder="Cari area pengiriman">
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc1" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc1">
								Jadetabek
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc2" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc2">
								Bandung
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc3" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc3">
								Cirebon
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc4" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc4">
								Tegal
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc5" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc5">
								Yogyakarta
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc6" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc6">
								Purwokerto
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc7" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc7">
								Sukabumi
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc8" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc8">
								Tasikmalaya
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc9" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc9">
								Semarang
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc10" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc10">
								Sidoarjo
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc11" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc11">
								Malang
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-6 col-lg-6">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditLoc" id="radioEditLoc12" @click="actSubLocation">
							<label class="form-check-label" for="radioEditLoc12">
								Denpasar
							</label>
						</div>
					</div>
				</div>
			</div>
			<div v-show="viewSubLocation">
				<div class="box-field">
					<div class="icon-field">
						<i class="fas fa-search oc-38"></i>
						<input type="text" class="form-control pl-left-40" placeholder="Cari detail area pengiriman">
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12 col-md-12 col-lg-12">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditSubLoc" id="radioEditSubLoc1">
							<label class="form-check-label" for="radioEditSubLoc1">
								<b class="clr-black">Cibinong</b> <br />
								Kalasan Raya Blok Y No. 10 Cikaret - Bogor, Jawa Barat 12782 <br />
								(021) - 000 000
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-12 col-lg-12">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditSubLoc" id="radioEditSubLoc2">
							<label class="form-check-label" for="radioEditSubLoc2">
								<b class="clr-black">Sentul</b> <br />
								Kalasan Raya Blok Y No. 10 Cikaret - Bogor, Jawa Barat 12782 <br />
								(021) - 000 000
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-12 col-lg-12">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditSubLoc" id="radioEditSubLoc3">
							<label class="form-check-label" for="radioEditSubLoc3">
								<b class="clr-black">Kandang Roda</b> <br />
								Kalasan Raya Blok Y No. 10 Cikaret - Bogor, Jawa Barat 12782 <br />
								(021) - 000 000
							</label>
						</div>
					</div>
					<div class="col-sm-12 col-md-12 col-lg-12">
						<div class="form-check form-check-loc">
							<input class="form-check-input" type="radio" name="radioEditSubLoc" id="radioEditSubLoc4">
							<label class="form-check-label" for="radioEditSubLoc4">
								<b class="clr-black">Padjajaran</b> <br />
								Kalasan Raya Blok Y No. 10 Cikaret - Bogor, Jawa Barat 12782 <br />
								(021) - 000 000
							</label>
						</div>
					</div>
				</div>
			</div>
		</div> 
    </vue-final-modal>
    <!-- End -->
	
</template>

<script>
import NotificationDownload from '../components/NotificationDownload.vue'

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

export default {
	name: 'App',
	components: {
		NotificationDownload
	},
	data () {
        return{
            showModalEditLoc: false,
			viewMasterLocation: true,
			viewSubLocation: false,
        } 
    },
	methods: {
		actSearch() {
			this.$router.push('/search');
		},
		actShowModalEditLoc() {
            this.showModalEditLoc = true;
        },
        actCloseModalEditLoc() {
            this.showModalEditLoc = false;
        },
		actCloseSublocation(){
			this.viewMasterLocation = true;
			this.viewSubLocation = false;
		},
		actSubLocation() {
            this.viewMasterLocation = false;
			this.viewSubLocation = true;
        },
	},	
	mounted (){

		// Left Menu Mobile
		$('.actBoxMenu').off().on('click', function () {
			$(".box-menu").css({"left" : "0px"});
			$(".box-menu-overlay").css({
				"backgroundColor": "rgba(0, 123, 161, 0.54)",
				"position" : "fixed",
				"width" : "100%",
				"height" : "100%",
				"top" : "0",
				"left" : "0",
				"z-index" : "99999"
			}); 
			$(".modal-overlay-menu").css({"display" : "block"});
		});
		$('.actCloseMenu').off().on('click', function () {
			$(".box-menu").css({"left": "-290px"});
			$(".box-menu-overlay").css({
				"width" : "0"
			});
			$(".modal-overlay-menu").css({"display" : "none"});
		});

		// Right Menu Mobile
		$('.actBoxMenuMember').off().on('click', function () {
			$(".box-menu-member").css({"right" : "0px"});
			$(".box-menuMember-overlay").css({
				"backgroundColor": "rgba(0, 123, 161, 0.54)",
				"position" : "fixed",
				"width" : "100%",
				"height" : "100%",
				"top" : "0",
				"right" : "0",
				"z-index" : "99999"
			}); 
			$(".modal-overlay-menuMember").css({"display" : "block"});
		});
		$('.actCloseMenuMember').off().on('click', function () {
			$(".box-menu-member").css({"right": "-290px"});
			$(".box-menuMember-overlay").css({
				"width" : "0"
			});
			$(".modal-overlay-menuMember").css({"display" : "none"});
		});

		$('#navigation-menu-mobile li.active').addClass('open').children('ul').show();
        $('#navigation-menu-mobile li.has-sub-menu>a').on('click', function(){
			$(this).removeAttr('href');
			var element = $(this).parent('li');
			if (element.hasClass('open')) {
				element.removeClass('open');
				element.find('li').removeClass('open');
				element.find('ul').slideUp(200);
			}
			else {
				element.addClass('open');
				element.children('ul').slideDown(200);
				element.siblings('li').children('ul').slideUp(200);
				element.siblings('li').removeClass('open');
				element.siblings('li').find('li').removeClass('open');
				element.siblings('li').find('ul').slideUp(200);
			}
		});
	}
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
    padding: 20px 0px;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
    background-color: #fff;
    width: 540px;
}

</style>