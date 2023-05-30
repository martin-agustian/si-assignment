<template>
    <div class="section">
        <div class="container">
            <div class="box-section-page">
                <div class="left-section-page">
                    <h3> Official Brand </h3>
                </div>
                <div class="right-section-page">
                    <router-link to="/official-store/brand">
                        Lihat Semua <i class="fas fa-chevron-right"></i>
                    </router-link>
                </div>
                <div class="clearer"></div>
                <div class="sub-section-page"> Banyak pilihan brand dengan harga terjangkau </div>
            </div>
            <div class="box-os">
                <Carousel :autoplay="2000" :wrap-around="true" :pauseAutoplayOnHover="true" :breakpoints="breakpointsBanner">
                    <Slide :key="slide">
                        <div class="list-os">
                            <router-link to="/official-store/brand/detail">
                                <div class="cover-list-os">
                                    <img src="@/assets/images/os-1.png" alt="">
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-os">
                            <router-link to="/official-store/brand/detail">
                                <div class="cover-list-os">
                                    <img src="@/assets/images/os-3.png" alt="">
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-os">
                            <router-link to="/official-store/brand/detail">
                                <div class="cover-list-os">
                                    <img src="@/assets/images/os-2.png" alt="">
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-os">
                            <router-link to="/official-store/brand/detail">
                                <div class="cover-list-os">
                                    <img src="@/assets/images/os-1.png" alt="">
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-os">
                            <router-link to="/official-store/brand/detail">
                                <div class="cover-list-os">
                                    <img src="@/assets/images/os-3.png" alt="">
                                </div>
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-os">
                            <router-link to="/official-store/brand/detail">
                                <div class="cover-list-os">
                                    <img src="@/assets/images/os-2.png" alt="">
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
        breakpointsBanner: {
            0: {
                itemsToShow: 1.2,
                snapAlign: 'center',
            },
            768: {
                itemsToShow: 1.2,
                snapAlign: 'center',
            },
            991: {
                itemsToShow: 3,
                snapAlign: 'start',
            },
            1199: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
        },
    }),
    mounted (){

    }
});
</script>