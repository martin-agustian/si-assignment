<template>
    <BannerSlider/>

    <div class="section">
        <div class="container">
            <div class="box-page-courses">
                <div class="row mb-4">
                    <div class="col-sm-12 col-md-12 col-lg-5 display-desktop">
                        <div class="d-flex">
                            <div class="box-title-col mr-10">
                                <b class="clr-black-dark">Urutkan</b>
                            </div>
                            <select 
                                @change="setOrder" 
                                v-model="productData.filter.sort"
                                class="form-select"
                            >
                                <option value="title_asc">Nama A ke Z</option>
                                <option value="title_desc">Nama Z ke A</option>                                        
                                <option value="price_asc">Harga Termurah</option>
                                <option value="price_desc">Harga Tertinggi</option>                                       
                            </select>
                        </div>
                    </div>
                </div>

                <div v-if="productData.loading" class="box-product">
                    <div class="container text-center">
                        Loading..<br><br>
                        <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                <div v-else class="box-product">
                    <div v-if="productData.data.length > 0">
                        <div 
                            v-for="(product, i) in productData.data" :key="i"
                            class="list-product"
                        >
                            <router-link :to="{
                                name: 'ProductDetail',
                                params: {
                                    slug: product.slug,
                                },
                            }">
                                <div class="img-product">
                                    <div class="img-position-product">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-product">
                                    <span v-if="product.stock < 1">
                                        Stok Habis
                                    </span>
                                    <h5>
                                        {{ 
                                            product.title ?
                                            product.title : '-'
                                        }}
                                    </h5>
                                    <div class="price-product">
                                        <span>
                                            {{ 
                                                product.price ?
                                                product.price : 'Rp 0'
                                            }}
                                        </span>                                        
                                    </div>
                                    <div class="rate-product">
                                        <i class="fas fa-star" />
                                        4.8 | 800 Ulasan 
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="clearer" />
                    </div>
                    <BlankData />
                </div>
            </div>
        </div>
    </div>
    
    <!-- Filter Mobile -->
    <div class="box-filter-mobile display-mobile">
        <div class="list-filter-mobile" @click="actModalFilter">
            <i class="bi bi-filter"></i> Filter
        </div>
        <div class="list-filter-mobile" @click="actModalSort">
            <i class="bi bi-sort-alpha-up"></i> Urutkan
        </div>
    </div>
    <!-- End -->

    <!-- Modal Sort -->
    <vue-final-modal v-model="showModalSort" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="showModalSort = false">
            <i class="bi bi-x-lg"></i>
        </button>
        <span class="modal__title">
            <div class="box-modal-title text-left">
                <i class="bi bi-filter"></i>
                <h5>FIlter</h5>
            </div>
        </span>
        <div class="box-line"></div>
        
        <div class="modal__content">
            <div class="box-modal-content">
                <form @submit.prevent="actApplySort">
                    <div class="box-filter">
                        <h5>Urutkan</h5>
                        <div class="box-option-alt">                            
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" name="sort"  type="radio" id="sort2" value="option2">
                                <label class="form-check-label" for="sort2">
                                    Harga Termurah
                                </label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" name="sort" type="radio" id="sort3" value="option3">
                                <label class="form-check-label" for="sort3">
                                    Harga Tertinggi
                                </label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" name="sort" type="radio" id="sort4" value="option4">
                                <label class="form-check-label" for="sort4">
                                    Nama A ke Z
                                </label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" name="sort" type="radio" id="sort1" value="option1">
                                <label class="form-check-label" for="sort1">
                                    Nama Z ke A
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="box-button text-center">
                        <button type="reset" class="button button-gray"> 
                            <b>Reset</b>
                        </button>
                        <button type="submit" class="button button-blue"> 
                            <b>Terapkan</b>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    </vue-final-modal>
    <!-- End -->

    <FooterDesc />

    <Icon />
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue';
// ** Components
import BannerSlider from './BannerSlider.vue';
import BlankData from '@/components/BlankData.vue';
import Icon from '@/components/Icon.vue';
import FooterDesc from '@/components/FooterDesc.vue';
// ** Apis
import { ProductApi } from '@/apis/product.api';
// ** Models
import { setProducts } from '@/models/product.model';

const productApi = new ProductApi();

const productData = reactive({
    data: {},
    filter: {
        sort: 'title_asc',
    },
    loading: false,
});

const showModalSort = ref(false);

const getProducts = () => {
    let params = {};

    params.sort = productData.filter.sort;

    productData.loading = true;

    productApi
        .list({ params: params })
        .then(response => {
            response = response.data;
            productData.data = setProducts(response.result);
            productData.loading = false;
        })
        .catch(error => {
            console.log(error);

            productData.loading = false;
        });
};

onMounted(() => {
    getProducts();
});

const setOrder = () => {
    getProducts();
};

const actModalSort = () => {
    showModalSort.value = false;
};

const actApplySort = () => {
    showModalSort.value = false;
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
    margin: 0 10px;
    padding: 20px 20px;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
    background-color: #fff;
    width: 340px;
}

</style>