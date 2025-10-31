import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import TabAddConcertPage from '../views/TabAddConcertPage.vue';
import TabAddVisitorPage from '../views/TabAddVisitorPage.vue';
import TabVisitorDetails from '../views/TabVisitorDetails.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
  path: '/addconcert',     // de URL in de browser
  name: 'AddConcert',      // optioneel, maar handig
  component: TabAddConcertPage
  },
  {
  path: '/addvisitor',     // de URL in de browser
  name: 'AddVisitor',      // optioneel, maar handig
  component: TabAddVisitorPage
  },
  {
  path: '/visitorDetails',     // de URL in de browser
  name: 'VisitorDetails',      // optioneel, maar handig
  component: TabVisitorDetails
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
