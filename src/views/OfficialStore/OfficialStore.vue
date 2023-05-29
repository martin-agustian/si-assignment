<template>

    <BannerSlider />
    <TopBrand />
    <Recommendation />
    <!--
    <FooterDesc />
    -->
</template>


<script>

import BannerSlider from '../../views/OfficialStore/BannerSlider.vue'
import TopBrand from '../../views/OfficialStore/TopBrand.vue'
import Recommendation from '../../views/OfficialStore/Recommendation.vue'
//import FooterDesc from '../../components/FooterDesc.vue'

export default {
    name: 'App',
    components: {
        BannerSlider,
        TopBrand,
        Recommendation,
        //FooterDesc
    },
};
</script>