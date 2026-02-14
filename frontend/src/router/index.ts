import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '@/views/IntroView.vue'
import ExplanationView from '@/views/ExplanationView.vue'
import UserInfoInputView from '@/views/UserInfoInputView.vue'
import ResultsView from '@/views/ResultsView.vue'
import MainBetView from '@/views/MainBetView.vue'
import SideBetView from '@/views/SideBetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroView,
    },
    {
      path: '/explanation',
      name: 'explanation',
      component: ExplanationView,
    },
    {
      path: '/user-info',
      name: 'user-info',
      component: UserInfoInputView,
    },
    {
      path: '/mainbet',
      name: 'mainbet',
      component: MainBetView,
      redirect: '/mainbet/1',
      children: [
        {
          path: '1',
          name: 'mainbet-step1',
          component: () => import('@/views/mainbet/MainBetStep1View.vue'),
        },
        {
          path: '2',
          name: 'mainbet-step2',
          component: () => import('@/views/mainbet/MainBetStep2View.vue'),
        },
      ],
    },
    {
      path: '/sidebet',
      name: 'sidebet',
      component: SideBetView,
      redirect: '/sidebet/1',
      children: [
        {
          path: '1',
          name: 'sidebet-step1',
          component: () => import('@/views/sidebet/SideBetStep1View.vue'),
        },
        {
          path: '2',
          name: 'sidebet-step2',
          component: () => import('@/views/sidebet/SideBetStep2View.vue'),
        },
        {
          path: '3',
          name: 'sidebet-step3',
          component: () => import('@/views/sidebet/SideBetStep3View.vue'),
        },
        {
          path: '4',
          name: 'sidebet-step4',
          component: () => import('@/views/sidebet/SideBetStep4View.vue'),
        },
        {
          path: '5',
          name: 'sidebet-step5',
          component: () => import('@/views/sidebet/SideBetStep5View.vue'),
        },
        {
          path: '6',
          name: 'sidebet-step6',
          component: () => import('@/views/sidebet/SideBetStep6View.vue'),
        },
        {
          path: '7',
          name: 'sidebet-step7',
          component: () => import('@/views/sidebet/SideBetStep7View.vue'),
        },
        {
          path: '8',
          name: 'sidebet-step8',
          component: () => import('@/views/sidebet/SideBetStep8View.vue'),
        },
      ],
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      redirect: '/results/1',
      children: [
        // Custom views for specific Auswertungen (if needed)
        {
          path: '1',
          name: 'auswertung1',
          component: () => import('@/views/results/Auswertung1View.vue'),
        },
        {
          path: '2',
          name: 'auswertung2',
          component: () => import('@/views/results/Auswertung2View.vue'),
        },
        {
          path: '3',
          name: 'auswertung3',
          component: () => import('@/views/results/Auswertung3View.vue'),
        },
        {
          path: '4',
          name: 'auswertung4',
          component: () => import('@/views/results/Auswertung4View.vue'),
        },
        {
          path: '5',
          name: 'auswertung5',
          component: () => import('@/views/results/Auswertung5View.vue'),
        },
        {
          path: '6',
          name: 'auswertung6',
          component: () => import('@/views/results/Auswertung6View.vue'),
        },
        {
          path: '7',
          name: 'auswertung7',
          component: () => import('@/views/results/Auswertung7View.vue'),
        },
        {
          path: '8',
          name: 'auswertung8',
          component: () => import('@/views/results/Auswertung8View.vue'),
        },
        {
          path: '9',
          name: 'auswertung9',
          component: () => import('@/views/results/Auswertung9View.vue'),
        },
        {
          path: '10',
          name: 'auswertung10',
          component: () => import('@/views/results/Auswertung10View.vue'),
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
