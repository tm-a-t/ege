import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItBracketedSpans from 'markdown-it-bracketed-spans'
import { visualizer } from 'rollup-plugin-visualizer'
import MarkdownIt from 'markdown-it'
import { fileURLToPath, URL } from 'url'
// import markdownItCustomBlock from 'markdown-it-custom-block'

export default defineConfig({
    build: {
        assetsDir: 'ege/assets',
    },
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Pages({
            extensions: ['vue', 'md'],
            dirs: [
                {dir: 'src/pages', baseRoute: 'ege'},
            ],
        }),
        Markdown({
            markdownItOptions: {
                breaks: true,
                typographer: true,
                quotes: '«»„“',
            },
            markdownItUses: [
                (md: MarkdownIt) => {
                    md.use(markdownItAttrs)
                    md.use(markdownItBracketedSpans)
                    // md.use(markdownItCustomBlock, {})  // will be used later
                    const defaultFenceRenderer = md.renderer.rules.fence
                    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
                        const token = tokens[idx]
                        if (token.info == 'mermaid') {
                            return `<Mermaid :code="\`${token.content}\`"/>`
                        }
                        return defaultFenceRenderer(tokens, idx, options, env, self)
                    }
                }
            ]
        }),
        visualizer({
            filename: 'stats/stats.html',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
