import Vue from "vue";
import Base from "@/Base.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(Base)
}).$mount("#app");
