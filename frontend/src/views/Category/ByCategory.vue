<template>

    <div class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="#">
                    Beranda
                </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Nama Kategori
            </li>
        </ol>
    </div>

    <div class="section">
        <div class="container">
            <div class="box-page-courses">
                <!-- <div class="left-page-courses display-desktop">
                    <Filter />
                </div> -->
                <!-- <div class="right-page-courses"> -->
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-7">
                            <div class="box-section-page">
                                <div class="sub-section-page mt-3">
                                    Menampilkan 1 - 24 produk dari total 35rb+ untuk <b class="clr-black-dark">"Peralatan Kue"</b>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-5 display-desktop">
                            <div class="row">
                                <div class="col-3 col-sm-3 col-md-4 col-lg-4">
                                    <div class="box-title-col">
                                        <b class="clr-black-dark">Urutkan</b>
                                    </div>
                                </div>
                                <div class="col-9 col-sm-9 col-md-8 col-lg-8">
                                    <select 
                                        @change="setOrder" 
                                        v-model="productData.filter.sort"
                                        class="form-select"
                                    >
                                        <option value="name_asc">Nama A ke Z</option>
                                        <option value="name_desc">Nama Z ke A</option>                                        
                                        <option value="price_asc">Harga Termurah</option>
                                        <option value="price_desc">Harga Tertinggi</option>                                       
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="box-product">
                        <div 
                            v-for="(product, i) in productData.data" :key="i"
                            class="list-product"
                        >
                            <router-link to="/category/detail">
                                <div class="img-product">
                                    <div class="img-position-product">
                                        <img src="@/assets/images/img-store-1.jpg">
                                    </div>
                                </div>
                                <div class="content-product">
                                    <span>
                                        Stok Habis
                                    </span>
                                    <h5>
                                        {{ product.title }}
                                    </h5>
                                    <div class="price-product">
                                        <span>{{ product.price }}</span>
                                        <!-- Discount -->
                                        <!--
                                        <div class="disc-info-product">
                                            <div class="disc-price-info-product">
                                                50%
                                            </div>
                                            <del>
                                                Rp 600.000
                                            </del>
                                        </div>
                                        -->
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

                    <ul class="pagination justify-content-center">
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

                <!-- </div>
                <div class="clearer" /> -->
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

    <!-- Modal Filter -->
    <vue-final-modal v-model="showModalFIlter" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="showModalFIlter = false">
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
                <form @submit.prevent="actApplyFilter">
                    <div class="box-filter">
                        <h5>
                            Kategori
                        </h5>
                        <div class="box-option-alt">
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="radio" id="katM1" name="katM" value="option1">
                                <label class="form-check-label" for="katM1">Pastry</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="radio" id="katM2" name="katM" value="option2">
                                <label class="form-check-label" for="katM2">Peralatan Kue</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="box-filter">
                        <h5>
                            Sub Kategori
                        </h5>
                        <div class="box-option-alt">
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="SubKatM1" value="option1">
                                <label class="form-check-label" for="SubKatM1">Aneka Tepung</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="SubKatM2" value="option2">
                                <label class="form-check-label" for="SubKatM2">Susu</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="SubKatM3" value="option3">
                                <label class="form-check-label" for="SubKatM3">Margarine</label>
                            </div>
                        </div>
                    </div>

                    <div class="box-filter">
                        <h5>
                            Brand
                        </h5>
                        <div class="box-option-alt">
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM1" value="option1">
                                <label class="form-check-label" for="brandM1">Blue Band</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM2" value="option2">
                                <label class="form-check-label" for="brandM2">Koepoe</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM3" value="option3">
                                <label class="form-check-label" for="brandM3">Bungasari</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM4" value="option4">
                                <label class="form-check-label" for="brandM4">Palmia</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM5" value="option5">
                                <label class="form-check-label" for="brandM5">Nestle</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM6" value="option6">
                                <label class="form-check-label" for="brandM6">Indomilk</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM7" value="option7">
                                <label class="form-check-label" for="brandM7">Rose Brand</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="brandM8" value="option8">
                                <label class="form-check-label" for="brandM8">Gulaku</label>
                            </div>
                        </div>
                    </div>
                    <div class="box-filter">
                        <h5>
                            Rating
                        </h5>
                        <div class="box-option-alt">
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="ratingM1" value="option1">
                                <label class="form-check-label" for="ratingM1"><i class="fas fa-star"></i> 4.5 Keatas</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="ratingM2" value="option2">
                                <label class="form-check-label" for="ratingM2"><i class="fas fa-star"></i> 4 Keatas</label>
                            </div>
                            <div class="form-check list-option-alt">
                                <input class="form-check-input" type="checkbox" id="ratingM3" value="option3">
                                <label class="form-check-label" for="ratingM3"><i class="fas fa-star"></i> 3 Keatas</label>
                            </div>
                        </div>
                    </div>
                    <div class="box-filter">
                        <h5>
                            Harga
                        </h5>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><b class="clr-black-dark">Rp.</b></span>
                            <input type="text" class="form-control" placeholder="Harga termurah">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><b class="clr-black-dark">Rp.</b></span>
                            <input type="text" class="form-control" placeholder="Harga tertinggi">
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
                        <h5>
                            Urutkan
                        </h5>
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
</template>


<script setup>
import { ref, reactive } from 'vue';
// ** Components
// import Filter from './Filter.vue';
import FooterDesc from '@/components/FooterDesc.vue';
// ** Apis
import { ProductApi } from '@/apis/product.api';
// ** Models
import { setProductList } from '@/models/product.model';

const productApi = new ProductApi();

const productData = reactive({
    data: {},
    filter: {
        sort: 'name_asc',
    },
    loading: false,
});

const showModalFIlter = ref(false);
const showModalSort = ref(false);

const getProduct = () => {
    let params = {};

    params.sort = productData.filter.sort;

    productApi
        .list({ params: params })
        .then(response => {
            response = response.data;
            productData.data = setProductList(response.result);
            console.log(productData);
        })
        .catch(error => {
            console.log(error);
        });
}

const setOrder = () => {
    getProduct();
};

const actModalFilter = () => {
    showModalFIlter.value = true;
};

const actApplyFilter = () => {
    showModalFIlter.value = false;
};

const actModalSort = () => {
    showModalSort.value = false;
};

const actApplySort = () => {
    showModalSort.value = false;
};

getProduct();
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