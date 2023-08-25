function index() {
  return import(/* webpackChunkName: "index" */ '../src/client/pages/index.vue')
}
function tests() {
  return import(/* webpackChunkName: "tests" */ '../src/client/pages/tests.vue')
}
function auth_login() {
  return import(
    /* webpackChunkName: "auth-login" */ '../src/client/pages/auth/login.vue'
  )
}

export default [
  {
    name: 'index',
    path: '/',
    component: index,
  },
  {
    name: 'tests',
    path: '/tests',
    component: tests,
  },
  {
    name: 'auth-login',
    path: '/auth/login',
    component: auth_login,
  },
]
