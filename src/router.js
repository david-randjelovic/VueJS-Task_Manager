import { createRouter, createWebHistory } from 'vue-router';

const Dashboard = () => import('./views/DashboardView.vue');
const About = () => import('./views/AboutView.vue');
const Register = () => import('./views/auth/RegisterView.vue');
const Login = () => import('./views/auth/LoginView.vue');

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;