import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import index from '@/components/index'
import Page2 from '@/components/page2'
const loginpage = resolve => require(['@/components/Login'],resolve)
Vue.use(Router)

let router =  new Router({
  routes: [
        {
            path:'/',
            name :'home',
            component:home
        },
    /*
        {
            path:'/login',
            name :'login',
            component:loginpage
        },*/

        {
            path:'/home',
            name :'home',
            component:home
        },
        {
          path:'/index',
          name :'index',
          component:index
        }
  ]
})
    //对每次访问之前都要先看是否已经登录
    /*router.beforeEach((to,from,next)=>{
        if(to.path.startsWith('/login')){
            window.sessionStorage.removeItem('access-token');
            next();
        }else{
            let token = window.sessionStorage.getItem('access-token');
            if(!token){
                //未登录  跳回主页面
                next({path:'/login'});
            }else{
                next();
            }
        }

    });*/


export default router