<template>
    
    <div class="section pt-40">
        <div class="container">
            <div class="box-section-page">
                <div class="left-section-page">
                    <h3> Produk Terbaru </h3>
                </div>
                <div class="right-section-page">
                    <router-link to="/new-product">
                        Lihat Semua <i class="fas fa-chevron-right"></i>
                    </router-link>
                </div>
                <div class="clearer"></div>
                <div class="sub-section-page"> Telusuri sekarang produk terbaru di Super Indo </div>
            </div>
            <div class="box-store">
                <Carousel :wrap-around="true" :breakpoints="breakpointsNewProducts">
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>
                                        Jeruk Pontianak 1 Kg Spesial
                                    </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>

                                        <!-- Discount -->
                                        <!--
                                        <div class="disc-info-store">
                                            <div class="disc-price-info-store">
                                                50%
                                            </div>
                                            <del>
                                                Rp 600.000
                                            </del>
                                        </div>
                                        -->

                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-2.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <span>
                                        Stok Habis
                                    </span>
                                    <h5>Salmon Import Australia 100 Gr </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>
                                        Jeruk Pontianak 1 Kg Spesial
                                    </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-2.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <span>
                                        Stok Habis
                                    </span>
                                    <h5>Salmon Import Australia 100 Gr </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>
                                        Jeruk Pontianak 1 Kg Spesial
                                    </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>
                                        Jeruk Pontianak 1 Kg Spesial
                                    </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>

                                        <!-- Discount -->
                                        <!--
                                        <div class="disc-info-store">
                                            <div class="disc-price-info-store">
                                                50%
                                            </div>
                                            <del>
                                                Rp 600.000
                                            </del>
                                        </div>
                                        -->

                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-2.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>Salmon Import Australia 100 Gr </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>
                                        Jeruk Pontianak 1 Kg Spesial
                                    </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-2.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>Salmon Import Australia 100 Gr </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-store">
                            <router-link to="/category/detail">
                                <div class="img-store">
                                    <div class="img-position-store">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-store">
                                    <h5>
                                        Jeruk Pontianak 1 Kg Spesial
                                    </h5>
                                    <div class="price-store">
                                        <span>Rp 300.000</span>
                                    </div>
                                    <div class="rate-store">
                                        <i class="fas fa-star"></i>
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <template #addons>
                        <Navigation  class="display-mobile-hidden"/>
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
    
</template>


<script>

import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel';

export default defineComponent({
    name: 'App',
    components: {
        Carousel,
        Slide,
        Navigation,
    },
    data: () => ({
        breakpointsNewProducts: {
            0: {
                itemsToShow: 2.5,
                snapAlign: 'left',
            },
            768: {
                itemsToShow: 3,
                snapAlign: 'start',
            },
            991: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
            1199: {
                itemsToShow: 5,
                snapAlign: 'start',
            },
        },
    }),
    mounted (){

    }
});
</script>