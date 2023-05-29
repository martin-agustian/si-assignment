<template>
    <div class="box-section-flashsale">
        <div class="left-section-flashsale">
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
        <div class="right-section-flashsale">
            <div class="row">
                <div class="col-3 col-sm-6 col-md-3 col-lg-6">
                    <div class="box-title-col">
                        Urutkan
                    </div>
                </div>
                <div class="col-9 col-sm-6 col-md-9 col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option value="1" selected>Terbaru</option>
                        <option value="2">Harga Termurah</option>
                        <option value="3">Harga Tertinggi</option>
                        <option value="4">Diskon Terbesar</option>
                        <option value="5">Sisa Stok Terbanyak</option>
                        <option value="6">Sisa Stok Terendah</option>
                        <option value="7">Paling Banyak Terjual</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="clearer"></div>
    </div>
    <div class="box-store-alt">
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-green" style="width:100%;"></div>
                        </div>
                        <label>
                            Tersedia
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-green" style="width:0%;"></div>
                        </div>
                        <label>
                            Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-1.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list-store-alt">
            <router-link to="/category/detail">
                <div class="img-store-alt">
                    <div class="img-position-store-alt">
                        <img src="@/assets/images/img-store-2.jpg">
                    </div>
                </div>
                <div class="content-store-alt">
                    <h5>
                        Pewarna Kue Merah Tua 30 Koepoe Spesial
                    </h5>
                    <div class="price-store-alt">
                        <span>Rp 300.000</span>
                        <div class="disc-info-store-alt">
                            <div class="disc-price-info-store-alt">
                                50%
                            </div>
                            <del>
                                Rp 600.000
                            </del>
                        </div>
                    </div>
                    <div class="rate-store-alt">
                        <i class="fas fa-star"></i>
                        4.8 | 800 Ulasan 
                    </div>
                    <div class="box-progress-sale">
                        <div class="info-progress-sale">
                            <div class="detail-progress-sale bg-red" style="width:80%;"></div>
                        </div>
                        <label>
                            Segera Habis
                        </label>
                    </div>
                </div>
            </router-link>
        </div>
        
        <div class="clearer"></div>
    </div>
        
    
</template>