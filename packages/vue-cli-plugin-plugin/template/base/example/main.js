import Vue from 'vue';
import App from './App.vue';

import Plugin from '@/main';

Vue.config.productionTip = false;

Vue.use(Plugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
