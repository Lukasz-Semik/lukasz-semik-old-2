import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VModal from 'vue-js-modal';

import App from './App.vue';
import messages from './i18n';
import store from './store';

Vue.use(VueI18n);
Vue.use(VModal);

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

new Vue({
  render: h => h(App),
  el: '#app',
  store,
  i18n,
});
