import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItBracketedSpans from 'markdown-it-bracketed-spans'
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
            ]
        }),
        Markdown({
            markdownItOptions: {
                breaks: true,
                typographer: true,
                quotes: '«»„“',
            },
            markdownItUses: [
                md => {
                    md.use(markdownItAttrs)
                    md.use(markdownItBracketedSpans)
                    // md.use(markdownItCustomBlock, {})  // will be used later
                }
            ]
        })
    ]
})
