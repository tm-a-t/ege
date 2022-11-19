import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import routes from '~pages'

const router = createRouter({
    history: createWebHistory(),
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     return {top: 0, behavior: 'smooth'}
    // },
})

router.beforeEach((to) => {
    if (to.meta.title === undefined) {
        document.title = 'ЕГЭ по русскому'
    } else {
        document.title = to.meta.title + ' в ЕГЭ';
    }
})

createApp(App).use(router).mount('#app')
