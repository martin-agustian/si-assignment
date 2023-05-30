import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router/index.js';
import BootstrapVue3 from 'bootstrap-vue-3';
import useVuelidate from '@vuelidate/core';
import { vfmPlugin } from 'vue-final-modal';
import VueCountdown from '@chenfengyuan/vue-countdown';
import VueSweetalert2 from 'vue-sweetalert2';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Fontawesome
import '@/assets/lib/fontawesome/css/all.css';

// Carousel
import 'vue3-carousel/dist/carousel.css';

// Animate
import 'animate.css';

// Circle Progress
import 'vue3-circle-progress/dist/circle-progress.css';

// Sweet Alert
import 'sweetalert2/dist/sweetalert2.min.css';

// Master
import '@/assets/css/master.css';
import '@/assets/css/auth.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(BootstrapVue3);
app.use(useVuelidate);
app.use(vfmPlugin);
app.component(VueCountdown.name, VueCountdown);
app.use(VueSweetalert2);
app.mount("#app");