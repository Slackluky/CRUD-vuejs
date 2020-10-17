import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./styles.scss";
import interceptor from "./services/interceptor";
import modal from "./components/Modal.vue";
Vue.prototype.$eventHub = new Vue(); // Global event bus

Vue.prototype.$http = interceptor;
Vue.config.productionTip = false;
Vue.component("modal", modal);
new Vue({
  router,
  interceptor,
  store,
  render: h => h(App)
}).$mount("#app");
