import Vue from 'vue'
import App from './App.vue'
import Home from "./Home.vue"
import VueResource from "vue-resource"
import VueRouter from "vue-router";
import axios from "axios"
import Vuex from "vuex"

Vue.use(VueResource);
//Vue.use(store);
Vue.use(axios);
Vue.use(Vuex);
Vue.use(VueRouter);

const instance = axios.create({baseURL: 'http://localhost:8080/'})

const store = new Vuex.Store({
  state: {
    gllog:'',
    history:[],
    radius:1,
    url:'http://192.168.0.32:8080/'
  },
  mutations: {
    setL (state, val) {
      state.gllog = val;
    },
    addPoint (state, val){
      state.history.push(val);
    },
    clearHistory(state){
      state.history = [];
    },
    setR(state, val){
      state.radius = val;
    }
  }
})
Object.defineProperty(Vue.prototype, '$bus', {
	get() {
		return this.$root.bus;
	}
});
var router = new VueRouter({
  routes:[
    {path: '/', beforeEnter: () => {
      if(this.$store.state.gllog !== ""){
        this.$router.push('/main');
      }else{
        this.$router.push('/home');
      }
    }},
    {path:'/main', component: Home},
    {path:'/home', component: App}
  ]
})
//Vue.prototype.$globalLogin = '';
//Vue.listen(8082);
Vue.config.productionTip = false;
const bus = new Vue({});
new Vue({
  data:{
    bus:bus
  },
  router,
  store,
  instance,
  render: h => h(App),
}).$mount('#app')
