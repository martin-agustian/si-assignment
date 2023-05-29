<template>

    <Section>
        <div class="container">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="#">
                        Beranda
                    </router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Official Store
                </li>
            </ol>
        </div>
    </Section>
    
    <div class="section">
        <div class="container">
            <div class="box-os-banner">
                <Carousel :autoplay="2000" :wrap-around="true" :pauseAutoplayOnHover="true" :breakpoints="breakpointsOsBanner">
                    <Slide :key="slide">
                        <div class="list-os-banner">
                            <router-link to="#">
                                <img src="@/assets/images/banner-alt-2.jpg" alt="" class="display-desktop">
                                <img src="@/assets/images/banner-2.jpg" alt="" class="display-mobile">
                            </router-link>
                        </div>
                    </Slide>
                    <Slide :key="slide">
                        <div class="list-os-banner">
                             <router-link to="#">
                                <img src="@/assets/images/banner-alt-2.jpg" alt="" class="display-desktop">
                                <img src="@/assets/images/banner-2.jpg" alt="" class="display-mobile">
                            </router-link>
                        </div>
                    </Slide>
                    
                    
                    <template #addons>
                    <pagination />
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
    
</template>


<script>

import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel';

export default defineComponent({
    name: 'App',
    components: {
        Carousel,
        Slide,
        Pagination,
    },
    data: () => ({
        breakpointsOsBanner: {
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