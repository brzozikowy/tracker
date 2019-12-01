import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSearch, faPlayCircle, faPauseCircle, faEdit, faPlusCircle, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import InfiniteLoading from 'vue-infinite-loading';

import store from '../store/store'

library.add(faUserSecret, faSearch, faPlayCircle, faPauseCircle, faPlusCircle, faEdit, faTrash, faCheckCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(InfiniteLoading, { /* options */ });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
