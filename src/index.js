// import 'scss/style.scss'

// Vue modules import
import Vue from "vue";
import Storage from "./storage/index";
import App from "./app.vue";

window.vueApp = new Vue({
  store: Storage,
  render: (hypertext) => hypertext(App)
}).$mount("#app");
