import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Load from '@/components/load'
import HT from '@/components/HT'
import sysPerson from '@/components/sysPerson'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Load',
      component: Load
    },
    {
      path:'/HT',
      name:'HT',
      component:HT
    },
    {
      path:'/sysPerson',
      name:"sysPerson",
      component:sysPerson
    }
  ]
})
