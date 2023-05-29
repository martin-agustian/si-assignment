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
                Pewarna Kue Merah Tua 30 Koepoe Spesial 
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
                                    <img src="@/assets/images/img-store-2.jpg" class="img-cover-small">

                                    </div>
                                </div>
                            </template>
                            <div class="box-cover">
                                <div class="position-cover">
                                <img src="@/assets/images/img-store-2.jpg" class="img-cover">

                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
                <div class="center-prod">
                    <div class="box-flashsale-prod">
                        <div class="box-makeup"></div>
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
                            <i class="fas fa-info-circle"></i>
                            Stok produk telah habis untuk area <b>Jabodetabek, CIbinong</b>
                        </div>
                        <h1>
                            Pewarna Kue Merah Tua 30 Koepoe Spesial Food Coloring 
                        </h1>
                        <div class="price-prod">
                            <span>Rp 300.000</span>
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
                                Terjual <b>49 Kali</b>
                            </div>
                            <div class="list-state-prod">
                                Dilihat <b>200 Kali</b>
                            </div>
                            <div class="list-state-prod">
                                <i class="fas fa-star"></i>  4.8 <span class="oc-38">|</span> 800 Ulasan 
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
                                        <b class="clr-black-dark">20</b>
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
                                <div class="clr-blue cursor-pointer fs-12 mt-1" @click="showingFullText = !showingFullText">
                                    <b>{{ showingFullText ? "Lihat lebih sedikit" : "Lihat selengkapnya" }}</b>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2">
                            <b class="clr-black-dark">Ulasan</b>
                        </div>
                        <div class="box-review">
                            <div class="left-review">
                                <h1>
                                    5.0
                                </h1>
                                <small>
                                    2 Ulasan
                                </small>
                            </div>
                            <div class="right-review">
                                <div class="box-review-bar">
                                    <div class="list-review-bar">
                                        <div class="left-review-bar">
                                            <span>
                                                5
                                            </span>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="center-review-bar">
                                            <b-progress :value="100" :max="100"></b-progress>
                                        </div>
                                        <div class="right-review-bar">
                                            100%
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="list-review-bar">
                                        <div class="left-review-bar">
                                            <span>
                                                4
                                            </span>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="center-review-bar">
                                            <b-progress :value="0" :max="0"></b-progress>
                                        </div>
                                        <div class="right-review-bar">
                                            0%
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="list-review-bar">
                                        <div class="left-review-bar">
                                            <span>
                                                3
                                            </span>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="center-review-bar">
                                            <b-progress :value="0" :max="0"></b-progress>
                                        </div>
                                        <div class="right-review-bar">
                                            0%
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="list-review-bar">
                                        <div class="left-review-bar">
                                            <span>
                                                2
                                            </span>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="center-review-bar">
                                            <b-progress :value="0" :max="0"></b-progress>
                                        </div>
                                        <div class="right-review-bar">
                                            0%
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="list-review-bar">
                                        <div class="left-review-bar">
                                            <span>
                                                1
                                            </span>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <div class="center-review-bar">
                                            <b-progress :value="0" :max="0"></b-progress>
                                        </div>
                                        <div class="right-review-bar">
                                            0%
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearer"></div>
                        </div>
                        <div class="mt-2">
                            <b class="clr-black-dark">Ulasan dari pembeli produk ini</b>
                        </div>



                        <div class="box-info-review">
                            <div class="list-info-review">
                                <div class="left-info-review">
                                    <img src="@/assets/images/img-john-doe.jpg" alt="">
                                </div>
                                <div class="right-info-review">
                                    <div class="row">
                                        <div class="col-8">
                                            <h5>
                                                Jonh Doe
                                            </h5>
                                        </div>
                                        <div class="col-4">
                                            <div class="text-right">
                                                <div class="btn-group">
                                                    <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div class="icon-dropdown" v-b-tooltip.hover title="Menu lainnya">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </div>
                                                    </div>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li @click="actModalReportReview">
                                                            <i class="far fa-flag"></i> Laporkan
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="value-info-review">
                                        <span>
                                            <i class="fas fa-star"></i> 5
                                        </span>
                                        <span>
                                            20 Des 2022
                                        </span>
                                        <span class="clr-red">
                                            <b><i class="bi bi-exclamation-circle-fill clr-red"></i> Dilaporkan</b>
                                        </span>
                                    </div>
                                    <div class="desc-info-review">
                                        Pembelajarannya sangat mudah untuk dipahami serta materi yang diberikan ketika kursus sesuai dengan dunia kerja. 
                                    </div>  
                                </div>
                                <div class="clearer"></div>
                            </div>
                            <div class="list-info-review">
                                <div class="left-info-review">
                                    <div class="avatar-info-review bg-blue">
                                        JD
                                    </div>
                                </div>
                                <div class="right-info-review">
                                    <div class="row">
                                        <div class="col-8">
                                            <h5>
                                                Jane Doe
                                            </h5>
                                        </div>
                                        <div class="col-4">
                                            <div class="text-right">
                                                <div class="btn-group">
                                                    <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div class="icon-dropdown" v-b-tooltip.hover title="Menu lainnya">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </div>
                                                    </div>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li @click="actModalReportReview">
                                                            <i class="far fa-flag"></i> Laporkan
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="value-info-review">
                                        <span>
                                            <i class="fas fa-star"></i> 5
                                        </span>
                                        <span>
                                            20 Des 2022
                                        </span>
                                    </div>
                                    <div class="desc-info-review">
                                        Pembelajarannya sangat mudah untuk dipahami serta materi yang diberikan ketika kursus sesuai dengan dunia kerja. 
                                    </div>  
                                </div>
                                <div class="clearer"></div>
                            </div>
                            <div class="list-info-review">
                                <div class="left-info-review">
                                    <img src="@/assets/images/img-john-doe.jpg" alt="">
                                </div>
                                <div class="right-info-review">
                                    <div class="row">
                                        <div class="col-8">
                                            <h5>
                                                Jonh Doe
                                            </h5>
                                        </div>
                                        <div class="col-4">
                                            <div class="text-right">
                                                <div class="btn-group">
                                                    <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div class="icon-dropdown" v-b-tooltip.hover title="Menu lainnya">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </div>
                                                    </div>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li @click="actModalReportReview">
                                                            <i class="far fa-flag"></i> Laporkan
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="value-info-review">
                                        <span>
                                            <i class="fas fa-star"></i> 5
                                        </span>
                                        <span>
                                            20 Des 2022
                                        </span>
                                    </div>
                                    <div class="desc-info-review">
                                        Pembelajarannya sangat mudah untuk dipahami serta materi yang diberikan ketika kursus sesuai dengan dunia kerja. 
                                    </div>  
                                </div>
                                <div class="clearer"></div>
                            </div>
                            <div class="list-info-review">
                                <div class="left-info-review">
                                    <div class="avatar-info-review bg-blue">
                                        JD
                                    </div>
                                </div>
                                <div class="right-info-review">
                                    <div class="row">
                                        <div class="col-8">
                                            <h5>
                                                Jane Doe
                                            </h5>
                                        </div>
                                        <div class="col-4">
                                            <div class="text-right">
                                                <div class="btn-group">
                                                    <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div class="icon-dropdown" v-b-tooltip.hover title="Menu lainnya">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </div>
                                                    </div>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li @click="actModalReportReview">
                                                            <i class="far fa-flag"></i> Laporkan
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="value-info-review">
                                        <span>
                                            <i class="fas fa-star"></i> 5
                                        </span>
                                        <span>
                                            20 Des 2022
                                        </span>
                                    </div>
                                    <div class="desc-info-review">
                                        Pembelajarannya sangat mudah untuk dipahami serta materi yang diberikan ketika kursus sesuai dengan dunia kerja. 
                                    </div>  
                                </div>
                                <div class="clearer"></div>
                            </div>
                            <div class="list-info-review">
                                <div class="left-info-review">
                                    <img src="@/assets/images/img-john-doe.jpg" alt="">
                                </div>
                                <div class="right-info-review">
                                    <div class="row">
                                        <div class="col-8">
                                            <h5>
                                                Jonh Doe
                                            </h5>
                                        </div>
                                        <div class="col-4">
                                            <div class="text-right">
                                                <div class="btn-group">
                                                    <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <div class="icon-dropdown" v-b-tooltip.hover title="Menu lainnya">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </div>
                                                    </div>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li @click="actModalReportReview">
                                                            <i class="far fa-flag"></i> Laporkan
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="value-info-review">
                                        <span>
                                            <i class="fas fa-star"></i> 5
                                        </span>
                                        <span>
                                            20 Des 2022
                                        </span>
                                    </div>
                                    <div class="desc-info-review">
                                        Pembelajarannya sangat mudah untuk dipahami serta materi yang diberikan ketika kursus sesuai dengan dunia kerja. 
                                    </div>  
                                </div>
                                <div class="clearer"></div>
                            </div>

                            <ul class="pagination justify-content-center mt-2">
                                <li class="page-item disabled">
                                    <span class="page-link"><i class="fas fa-chevron-left"></i></span>
                                </li>
                                <li class="page-item active" aria-current="page">
                                    <span class="page-link">1</span>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                                </li>
                            </ul>

                            <!--
                            <div class="box-other">
                                Lihat lainnya <i class="fas fa-chevron-down"></i>
                            </div>
                            -->

                        </div>
                    </div>
                </div>
                <div class="right-prod sticky-position">
                    <div class="box-summary">
                        
                        <h3>
                            Ringkasan Belanja
                        </h3>
                        
                        <div class="list-summary">
                            <div class="left-summary-alt">
                                Jumlah
                            </div>
                            <div class="right-summary-alt">
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
                            <div class="clearer"></div>
                        </div>
                        <div class="list-summary mt-3">
                            <div class="left-summary-alt">
                                <b class="clr-black-dark">Sub Total</b>
                            </div>
                            <div class="right-summary-alt">
                                <b class="clr-red">Rp 300.000</b>
                            </div>
                            <div class="clearer"></div>
                        </div>
                        <div class="box-menu-cart">
                            <button class="button button-green">
                                <b>Beli Sekarang</b>
                            </button>
                            <button class="button button-outline-green" @click="actToCart">
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
                <div class="clearer"></div>
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

    <!-- Modal Report Review -->
    <vue-final-modal v-model="viewModalReportReview" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="viewModalReportReview = false">
            <i class="bi bi-x-lg"></i>
        </button>
        <span class="modal__title">
            <div class="box-modal-title text-center">
                <h3>Laporkan Review</h3>
            </div>
        </span>
        <div class="modal__content">
            <div class="box-option-alt">
                <div class="form-check list-option-alt">
                    <input class="form-check-input" type="radio" id="reportreview1" name="report" value="1" @click="actHideOtherReportReview">
                    <label class="form-check-label fs-14 font-default-medium" for="reportreview1">
                        Spam
                    </label>
                </div>
                <div class="form-check list-option-alt">
                    <input class="form-check-input" type="radio" id="reportreview2" name="report" value="2" @click="actHideOtherReportReview">
                    <label class="form-check-label fs-14 font-default-medium" for="reportreview2">
                        Konten mengandung SARA, diskriminasi, vulgar, ancaman, serta pelanggaran nilai/norma sosial
                    </label>
                </div>
                <div class="form-check list-option-alt">
                    <input class="form-check-input" type="radio" id="reportreview3" name="report" value="3" @click="actOtherReportReview">
                    <label class="form-check-label fs-14 font-default-medium" for="reportreview3">
                        Lainnya
                    </label>
                    <div v-show="viewOtherReportReview">
                        <input type="text" class="form-control" placeholder="Isi alasan disini ...">
                    </div>
                </div>
            </div>
            <div class="box-button text-center mt-3">
                <button class="button button-gray" @click="viewModalReportReview = false"><b>Batal</b></button>
                <button class="button button-blue" @click="actReportReview"><b>Laporkan</b></button>
            </div>
        </div>
    </vue-final-modal>
    <!-- End -->

    <!-- Notif - Report -->
    <div v-show="viewNotifReportReview" class="box-success-confirm">
        <div class="row">
            <div class="col-9">
                Anda berhasil mengirim laporan
            </div>
            <div class="col-3 text-right">
                <i class="bi bi-x-lg cursor-pointer" @click="actHideNotifReportReview"></i>
            </div>
        </div>
    </div>
    
</template>


<script>

import RelatedCourse from './RelatedCourse.vue'
import RelatedProduct from './RelatedProduct.vue'

export default {
    name: 'App',
    components: {
       RelatedCourse,
       RelatedProduct ,
       
    },
    data() {
        return{
            showingFullText: false,
            bodyDesc: "Pewarna makanan Koepoe ini sudah menjadi produk yang paling lazim bagi orang Indonesia. Harganya sangat ekonomis, baik untuk ibu rumah tangga maupun pemilik usaha makanan. Berbahan dasar air, denga warna yang tergolong pekat.",
            viewAddToCart: false,
            viewAddToWishlist: false,
            viewDeleteToWishlist: false,
            isActiveWishlist: false,
            viewShare: false,
            quantity: 1,

            viewModalReportReview: false,
            viewOtherReportReview : false,
            viewNotifReportReview : false
        }
    },
    computed: {
        formattedBody() {
            if (this.showingFullText) {
                return this.bodyDesc;
            }
            return `${this.bodyDesc.slice(0, 120).trim()}...`;
        }
    },
    methods: {
        actToCart(){
            this.viewAddToCart = true;
            setTimeout(() => this.viewAddToCart = false, 3000)
        },
        actToWishlist(){
            
            if (!this.isActiveWishlist) {
                this.isActiveWishlist = true;
                this.viewAddToWishlist = true;
                setTimeout(() => this.viewAddToWishlist = false, 2000);
            } else {
                this.isActiveWishlist = false;
                this.viewDeleteToWishlist = true;
                setTimeout(() => this.viewDeleteToWishlist = false, 2000);
            }
        },
        actVideoPreview(){
            this.viewVideoPreview = true;
            this.$refs.videoPreview.play();
        },
        actCloseVideoPreview(){
            this.viewVideoPreview = false;
            const { videoPreview } = this.$refs;
            videoPreview.pause();
            videoPreview.currentTime = 0;
        },
        increment () {
            this.quantity++
        },
        decrement () {
            if(this.quantity > 1) {
                this.quantity--
            }
        },

        actModalReportReview() {
            this.viewModalReportReview = true;
        },
        actOtherReportReview(){
            this.viewOtherReportReview = true;
        },
        actHideOtherReportReview(){
            this.viewOtherReportReview = false;
        },
        actReportReview() {
            this.viewModalReportReview = false;
            this.viewNotifReportReview = true;
            setTimeout(() => this.viewNotifReportReview = false, 3000)
        },
        actHideNotifReportReview(){
            this.viewNotifReportReview = false;
        }
    },  
};
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
    margin: 0px 10px;
    padding: 20px 20px;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
    background-color: #fff;
    width: 380px;
}

</style>