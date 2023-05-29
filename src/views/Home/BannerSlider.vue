<template>

    <div class="section">
        <div class="container">
            <div class="box-banner">
                <Carousel :autoplay="2000" :wrap-around="true" :pauseAutoplayOnHover="true" :breakpoints="breakpointsBanner">
                    <Slide :key="slide">
                        <div class="list-banner">
                            <router-link to="#">
                                <img src="@/assets/images/banner-alt-2.jpg" alt="" class="display-desktop">
                                <img src="@/assets/images/banner-2.jpg" alt="" class="display-mobile">
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-banner">
                            <router-link to="#">
                                <img src="@/assets/images/banner-alt-1.jpg" alt="" class="display-desktop">
                                <img src="@/assets/images/banner-1.jpg" alt="" class="display-mobile">
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-banner">
                            <router-link to="#">
                                <img src="@/assets/images/banner-alt-2.jpg" alt="" class="display-desktop">
                                <img src="@/assets/images/banner-2.jpg" alt="" class="display-mobile">
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-banner">
                            <router-link to="#">
                                <img src="@/assets/images/banner-alt-1.jpg" alt="" class="display-desktop">
                                <img src="@/assets/images/banner-1.jpg" alt="" class="display-mobile">
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
                itemsToShow: 1,
                snapAlign: 'start',
            },
            1199: {
                itemsToShow: 1,
                snapAlign: 'start',
            },
        },
    }),
    mounted (){

    }
});
</script>