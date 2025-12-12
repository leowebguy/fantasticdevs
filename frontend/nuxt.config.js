/**
 * https://nuxt.com/docs/api/configuration/nuxt-config
 */

const siteName = process.env.NUXT_SITE_NAME;
const baseUrl = process.env.NUXT_BASE_URL;

const defineNuxtConfig = {
    compatibilityDate: '2024-04-03',
    devtools: {
        enabled: true,
        wsUrl: baseUrl?.replace('https://', ''),
        port: 3000,
        https: true
    },
    css: [
        '@/assets/scss/main.scss'
    ],
    app: {
        head: {
            titleTemplate: '%s | ' + siteName,
            title: siteName,
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/android-chrome-192x192.png' },
                { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicons/android-chrome-512x512.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
                // { rel: 'manifest', href: '/favicons/site.webmanifest' },
                { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#222' }
            ],
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'msapplication-TileColor', content: '#fff' },
                { name: 'theme-color', content: '#fff' }
            ]
        }
    },
    modules: [
        '@nuxt/devtools',
        '@nuxt/image',
        '@nuxtjs/turnstile',
        '@nuxt/scripts'
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3000
    },
    runtimeConfig: {
        public: {
            NUXT_ENV: process.env.NUXT_ENV,
            NUXT_SITE_NAME: siteName,
            NUXT_BASE_URL: baseUrl,
            NUXT_CRAFT_URL: process.env.NUXT_CRAFT_URL,
            NUXT_GRAPHQL_TOKEN: process.env.NUXT_GRAPHQL_TOKEN
        }
    },
    vite: {
        plugins: [],
        server: {
            https: true,
            hmr: {
                protocol: 'wss',
                host: baseUrl?.replace('https://', ''),
                port: 3000
            },
            allowedHosts: [
                baseUrl?.replace('https://', '')
            ]
        },
        css: {
            preprocessorOptions: {
                scss: {
                    quietDeps: true,
                    silenceDeprecations: [
                        'color-functions',
                        'global-builtin',
                        'import'
                    ]
                }
            }
        }
    },
    nitro: {
        devServer: {
            watch: ['./server']
        }
    },
    experimental: {
        payloadExtraction: false
    },
    turnstile: {
        siteKey: process.env.NUXT_TURNSTILE_KEY
    }
};

export default defineNuxtConfig;
