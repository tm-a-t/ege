import './style.css'
import App from './App.vue'
import routes from '~pages'
import { ViteSSG } from 'vite-ssg'

export const createApp = ViteSSG(
  App,
  { routes },
)