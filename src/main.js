import Vue from 'vue';
import VueI18n from 'vue-i18n';

import App from './App.vue';
import messages from './i18n';
import store from './store';

Vue.use(VueI18n);

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
