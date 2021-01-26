import Vue from "vue";
import store from "./store";
import auth from "./store/modules/auth";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import NProgress from "nprogress";
// import authenticate from "./auth/authenticate";

Vue.use(Router);

// create new router

const routes = [
  {
    path: "/",
    component: () => import("./views/app"), //webpackChunkName app
    // beforeEnter: authenticate,
    redirect: "/app/sessions/signUp",

    children: [
     
   
      // pages
      {
        path: "/app/pages",
        component: () => import("./views/app/pages"),
        redirect: "/app/pages/profile",
        children: [
          {
            path: "profile",
            name: "profile",
            component: () => import("./views/app/pages/profile"),
            meta: { requiresAuth: true }
          },
          {
            path: "error",
            name: "error",
            component: () => import("./views/app/pages/notFound"),
            meta: { requiresAuth: true }
          },
          {
            path: "icons",
            name: "icons",
            component: () => import("./views/app/pages/icons"),
            meta: { requiresAuth: true }
          },
          {
            path: "search-result",
            name: "search-result",
            component: () => import("./views/app/pages/search-result"),
            meta: { requiresAuth: true }
          },
          {
            path: "pricing-table",
            name: "pricing-table",
            component: () => import("./views/app/pages/pricingTable"),
            meta: { requiresAuth: true }
          },
          {
            path: "faq",
            name: "faq",
            component: () => import("./views/app/pages/faq"),
            meta: { requiresAuth: true }
          },
          {
            path: "ownprofile",
            name: "ownprofile",
            component: () => import("./views/app/pages/ownprofile"),
            meta: { requiresAuth: true }
          },
          {
            path: "blanky",
            name: "users",
            component: () => import("./views/app/pages/blanky"),
            meta: { requiresAuth: true }
          },
          {
            path: "adminusers",
            name: "admins",
            component: () => import("./views/app/pages/adminusers"),
            meta: { requiresAuth: true }
          },
            /*beforeEnter (to, from, next) {
              if (store.state.idToken) {
                next()
              } else {
                next('/app/sessions/signIn')
              }
            }
          }*/
          
          
        ]
      },

      //products
      {
        path: "/app/products",
          component: () => import("./views/app/products"),
            redirect: "/app/products/productlist",
              children: [
                {
                path: "productlist",
                name: "productlist",
                component: () => import("./views/app/products/productlist"),
                meta: { requiresAuth: true }
                },
                {
                path: "productadmin",
                name: "productadmin",
                component: () => import("./views/app/products/productadmin"),
                meta: { requiresAuth: true }
                },
              ]
          },


      //suppliers
      {
        path: "/app/suppliers",
          component: () => import("./views/app/suppliers"),
            redirect: "/app/suppliers/supplierslist",
              children: [
                {
                path: "supplierslist",
                name: "suppliers",
                component: () => import("./views/app/suppliers/supplierslist"),
                meta: { requiresAuth: true }
                },
              ]
          },    

      //bemenet
      {
      path: "/app/bemenet",
        component: () => import("./views/app/bemenet"),
          redirect: "/app/bemenet/bemenet1",
            children: [
              {
              path: "bemenet1",
              name: "bem1",
              component: () => import("./views/app/bemenet/bemenet1"),
              meta: { requiresAuth: true }
              },
            ]
        },

      //kimenet
      {
      path: "/app/kimenet",
        component: () => import("./views/app/kimenet"),
          redirect: "/app/kimenet/kimenet1",
            children: [
              {
              path: "kimenet1",
              name: "kim1",
              component: () => import("./views/app/kimenet/kimenet1"),
              meta: { requiresAuth: true }
              },
            ]
          },

      {
        path: "/app/uzenetek",
        component: () => import("./views/app/uzenetek"),
        redirect: "/app/uzenetek/uzenet",
        children: [
          {
            path: "uzenet",
            name: "uzenet",
            component: () => import("./views/app/uzenetek/uzenet"),
            meta: { requiresAuth: true }
          }
        
        ]
      },
    ]
  },

  // sessions
  {
    path: "/app/sessions",
    component: () => import("./views/app/sessions"),
    redirect: "/app/sessions/signIn",
    children: [
      {
        path: "signIn",
        name: "login",
        component: () => import("./views/app/sessions/signIn")
      },
      {
        path: "signUp",
        name: "singup",
        component: () => import("./views/app/sessions/signUp")
      },
      {
        path: "forgot",
        name: "forgot",
        component: () => import("./views/app/sessions/forgot")
      }
    ]
  },


          {
            path: "*",
            name: "empty",
            component: () => import("./views/app/pages/notFound")
          },

          /*
          { path: "./views/app/tables/table",
      name: "table",
      components: {default: table}
     }, */
  
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  }
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.state.idToken) {
      next({
        name:"login",
        
      })
    } else {
      next()
    }

    // Start the route progress bar.

    NProgress.start();
    NProgress.set(0.1);
  } else {
  next()
  }
});

router.afterEach(() => {
  // Remove initial loading
  const gullPreLoading = document.getElementById("loading_wrap");
  if (gullPreLoading) {
    gullPreLoading.style.display = "none";
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 500);
  // NProgress.done();
  // if (isMobile) {
  if (window.innerWidth <= 1200) {
    // console.log("mobile");
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
