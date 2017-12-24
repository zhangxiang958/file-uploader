import Template from './index.vue';

export default {
    install(Vue) {
        Vue.component(Template.name, Template);
    }
};
