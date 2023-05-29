<template>
    <div class="container">
        <div class="box-line"></div>
    </div>
    <div class="section padding-default">
        <div class="box-bg-bottom bg-blue-gradient"></div>
        <div class="container">
            <div class="box-section-page">
                <div class="left-section-page">
                    <h3> Kursus Terpopuler </h3>
                </div>
                <div class="right-section-page">
                    <router-link to="#">
                        Lihat Semua <i class="fas fa-chevron-right"></i>
                    </router-link>
                </div>
                <div class="clearer"></div>
                <div class="sub-section-page"> Yuk, telusuri kursus online terpopuler bersama Kami  </div>
            </div>
            <div class="box-courses">
                <Carousel :wrap-around="true" :breakpoints="breakpointsCourses">
                    <Slide :key="slide">
                        <div class="list-courses">
                            <router-link to="#">
                                <div class="img-courses">
                                    <img src="@/assets/images/img-course-1.jpg">
                                </div>
                                <div class="content-courses">
                                    <small>Pastry</small>
                                    <h5>
                                        Mengolah Berbagai Variasi Bronis Untuk Menjadi Pembuat Kue
                                    </h5>
                                    <div class="info-courses">
                                        <div class="left-info-courses">
                                            <i class="fas fa-star"></i> 4.8 | 800 Ulasan
                                        </div>
                                        <div class="right-info-courses">
                                            <span> Rp 300.000 </span>
                                            <!-- Discount -->
                                            <!--
                                            <div class="disc-info-courses">
                                                <div class="disc-price-info-price">
                                                    50%
                                                </div>
                                                <del>
                                                    Rp 600.000
                                                </del>
                                            </div>
                                            -->
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-courses">
                            <router-link to="#">
                                <div class="img-courses">
                                    <img src="@/assets/images/img-course-2.jpg">
                                    <div class="label-courses">
                                        <div class="list-label-course bg-red-opacity-alt">
                                            Prakerja
                                        </div>
                                    </div>
                                </div>
                                <div class="content-courses">
                                    <small>Masakan Modern</small>
                                    <h5>
                                        Mengelola Dapur dan Membuat Hidangan ala Negara Barat 
                                    </h5>
                                    <div class="info-courses">
                                        <div class="left-info-courses">
                                            <i class="fas fa-star"></i> 4.8 | 800 Ulasan
                                        </div>
                                        <div class="right-info-courses">
                                            <span> Rp 300.000 </span>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-courses">
                            <router-link to="#">
                                <div class="img-courses">
                                    <img src="@/assets/images/img-course-3.jpg">
                                </div>
                                <div class="content-courses">
                                    <small>Pastry</small>
                                    <h5>
                                        Belajar Untuk Mengolah Adonan Kue Bagi Pembuat Kue
                                    </h5>
                                    <div class="info-courses">
                                        <div class="left-info-courses">
                                            <i class="fas fa-star"></i> 4.8 | 800 Ulasan
                                        </div>
                                        <div class="right-info-courses">
                                            <span> Rp 300.000 </span>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-courses">
                            <router-link to="#">
                                <div class="img-courses">
                                    <img src="@/assets/images/img-course-1.jpg">
                                    <div class="label-courses">
                                        <div class="list-label-course bg-green-opacity-alt">
                                            Prakerja
                                        </div>
                                    </div>
                                </div>
                                <div class="content-courses">
                                    <small>Masakan Modern</small>
                                    <h5>
                                        Mengelola Dapur dan Membuat Hidangan ala Negara Barat 
                                    </h5>
                                    <div class="info-courses">
                                        <div class="left-info-courses">
                                            <i class="fas fa-star"></i> 4.8 | 800 Ulasan
                                        </div>
                                        <div class="right-info-courses">
                                            <span> Rp 300.000 </span>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-courses">
                            <router-link to="#">
                                <div class="img-courses">
                                    <img src="@/assets/images/img-course-2.jpg">
                                </div>
                                <div class="content-courses">
                                    <small>Masakan Modern</small>
                                    <h5>
                                        Mengelola Dapur dan Membuat Hidangan ala Negara Barat 
                                    </h5>
                                    <div class="info-courses">
                                        <div class="left-info-courses">
                                            <i class="fas fa-star"></i> 4.8 | 800 Ulasan
                                        </div>
                                        <div class="right-info-courses">
                                            <span> Rp 300.000 </span>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-courses">
                            <router-link to="#">
                                <div class="img-courses">
                                    <img src="@/assets/images/img-course-3.jpg">
                                    <div class="label-courses">
                                        <div class="list-label-course bg-green-opacity-alt">
                                            Prakerja
                                        </div>
                                    </div>
                                </div>
                                <div class="content-courses">
                                    <small>Masakan Modern</small>
                                    <h5>
                                        Mengelola Dapur dan Membuat Hidangan ala Negara Barat 
                                    </h5>
                                    <div class="info-courses">
                                        <div class="left-info-courses">
                                            <i class="fas fa-star"></i> 4.8 | 800 Ulasan
                                        </div>
                                        <div class="right-info-courses">
                                            <span> Rp 300.000 </span>
                                        </div>
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
        breakpointsCourses: {
            0: {
                itemsToShow: 1.15,
                snapAlign: 'left',
            },
            768: {
                itemsToShow: 2,
                snapAlign: 'start',
            },
            991: {
                itemsToShow: 3,
                snapAlign: 'start',
            },
            1199: {
                itemsToShow: 3,
                snapAlign: 'start',
            },
        },
    }),
    mounted (){

    }
});
</script>