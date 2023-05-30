<template>

    <BannerSlider />
    <LauncherCategory />
    <OfficialStore />
    <FlashSale />
    <FreeOngkir />
    <TopProducts />
    <TopCourses />
    <NewProducts />
    <FooterDesc />
    <Icon />
    
    
</template>


<script>

import BannerSlider from '../../views/Home/BannerSlider.vue'
import LauncherCategory from '../../views/Home/LauncherCategory.vue'
import OfficialStore from '../../views/Home/OfficialStore.vue'
import FlashSale from '../../views/Home/FlashSale.vue'
import FreeOngkir from '../../views/Home/FreeOngkir.vue'
import TopProducts from '../../views/Home/TopProducts.vue'
import TopCourses from '../../views/Home/TopCourses.vue'
import NewProducts from '../../views/Home/NewProducts.vue'
import FooterDesc from '../../components/FooterDesc.vue'
import Icon from '../../components/Icon.vue'

export default {
    name: 'App',
    components: {
        BannerSlider,
        LauncherCategory,
        OfficialStore,
        FlashSale,
        FreeOngkir,
        TopProducts,
        TopCourses,
        NewProducts,
        FooterDesc,
        Icon
    },
};
</script>