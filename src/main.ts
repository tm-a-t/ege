import './style.css'
import App from './App.vue'
import routes from '~pages'
import { ViteSSG } from 'vite-ssg'
import Mermaid from '@/components/Mermaid.vue'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    app.component('Mermaid', Mermaid)
  }
)