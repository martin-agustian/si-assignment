<template>

    <div class="section pt-40">
        <div class="container">
            <div class="box-banner-fix">
                <img src="@/assets/images/banner-free-ongkir-web.jpg" alt="" class="display-desktop">
                <img src="@/assets/images/banner-free-ongkir-mobile.jpg" alt="" class="display-mobile">
            </div>
        </div>
    </div>

    <div class="section pb-40">
        <div class="container">

            <div class="box-tabs">
                <b-tabs content-class="mt-3" align="center">
                    <b-tab active>
                        <template #title>
                            Berlangsung
                            <b>
                                08:00
                            </b>
                            <div class="box-makeup"></div>
                        </template>
                        <ProductList />
                    </b-tab>
                    <b-tab>
                        <template #title>
                            Selanjutnya Besok
                            <b>
                                08:00
                            </b>
                            <div class="box-makeup"></div>
                        </template>
                        <ProductListDisabled />
                    </b-tab>
                </b-tabs>
            </div>
        </div>
    </div>
    
    
</template>


<script>

import ProductList from '../../views/FlashSale/ProductList.vue'
import ProductListDisabled from '../../views/FlashSale/ProductListDisabled.vue'
export default {
    name: 'App',
    components: {
        ProductList,
        ProductListDisabled
    },
};
</script>