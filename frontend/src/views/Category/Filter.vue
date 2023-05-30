<template>
    <div class="box-filter">
        <h5>
            Kategori
        </h5>
        <ul class="box-filter-menu box-overflow">
            <li>
                <router-link to="#">
                    Pastry <i class="fas fa-chevron-down"></i>
                </router-link>
            </li>
            <li>
                <router-link to="#" class="active-filter-menu">
                    Peralatan Kue <i class="fas fa-chevron-up"></i>
                    <ul>
                        <li>
                            <router-link to="#">
                                Peralatan Dapur
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Cetakan Kue
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Pelastik Kemasan
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Toples
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Loyang
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Tas
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Peralatan Dapur
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Cetakan Kue
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Pelastik Kemasan
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Toples
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Loyang
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                Tas
                            </router-link>
                        </li>
                    </ul>
                </router-link>
            </li>
        </ul>
    </div>
    <div class="box-filter">
        <h5>
            Brand
        </h5>
        <div class="box-option-alt box-overflow">
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand1" value="option1">
                <label class="form-check-label" for="brand1">Blue Band</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand2" value="option2">
                <label class="form-check-label" for="brand2">Koepoe</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand3" value="option3">
                <label class="form-check-label" for="brand3">Bungasari</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand4" value="option4">
                <label class="form-check-label" for="brand4">Palmia</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand5" value="option5">
                <label class="form-check-label" for="brand5">Nestle</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand6" value="option6">
                <label class="form-check-label" for="brand6">Indomilk</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand7" value="option7">
                <label class="form-check-label" for="brand7">Rose Brand</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand8" value="option8">
                <label class="form-check-label" for="brand8">Gulaku</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand7" value="option7">
                <label class="form-check-label" for="brand7">Rose Brand</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="brand8" value="option8">
                <label class="form-check-label" for="brand8">Gulaku</label>
            </div>
        </div>
    </div>

    <div class="box-filter">
        <h5>
            Rating
        </h5>
        <div class="box-option-alt">
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="rating1" value="option1">
                <label class="form-check-label" for="rating1"><i class="fas fa-star"></i> 4.5 Keatas</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="rating2" value="option2">
                <label class="form-check-label" for="rating2"><i class="fas fa-star"></i> 4 Keatas</label>
            </div>
            <div class="form-check list-option-alt">
                <input class="form-check-input" type="checkbox" id="rating3" value="option3">
                <label class="form-check-label" for="rating3"><i class="fas fa-star"></i> 3 Keatas</label>
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

</template>