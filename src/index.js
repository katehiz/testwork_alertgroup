// Vue modules import
import Vue from 'vue';
import Storage from './storage/index';
import App from './app.vue';

// Application JS modules import
//import {CustomSelect, Accordion} from './assets/js/scripts.js';

window.vueApp = new Vue({
    store: Storage,
    render: function(hypertext) {
        return hypertext(App)
    }
}).$mount('#app');

/*
document.addEventListener("DOMContentLoaded", () => {
    CustomSelect.init();
    Accordion.init();
});*/
