import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import TabAddConcertPage from '../views/TabAddConcertPage.vue';
import TabAddVisitorPage from '../views/TabAddVisitorPage.vue';
import TabVisitorDetails from '../views/TabVisitorDetails.vue';
import TabConcertDetails from '../views/TabConcertDetails.vue';
import TabsPage from '../views/TabsPage.vue'

// src/router/index.ts
const routes = [
  {
    path: '/',
    component: TabsPage,          // <-- bevat ion-tabs
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', component: HomePage },
      { path: 'makenew', component: () => import('@/views/TabNieuw.vue') },
      { path: 'aboutme', component: () => import('@/views/TabAboutMe.vue') },
    ],
  },

  { path: '/addconcert', component: TabAddConcertPage },
  { path: '/addvisitor', component: TabAddVisitorPage },
  { path: '/visitordetails', component: TabVisitorDetails },
  { path: '/concertdetails', component: TabConcertDetails },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
