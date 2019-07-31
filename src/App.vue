<template>
<div id="app" :class="[class_name, {'loaded': loaded}]" v-if="site_data">
    <Header :site_data="site_data" />
    <router-view />
    <Footer />
    <ModalMessage />
</div>
</template>

<script>
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import ModalMessage from './components/blocks/ModalMessage';
import slugify from 'slugify';

export default {
    name: 'App',
    metaInfo() {
        return {
            // Children can override the title.
            title: this.pagetitle,
            // Result: My Page Title ← My Site
            // If a child changes the title to "My Other Page Title",
            // it will become: My Other Page Title ← My Site
            titleTemplate: (titleChunk) => {
                return titleChunk ? `${titleChunk} | 我爱工作犬` : '我爱工作犬';
            },
            // Define meta tags here.
            htmlAttrs: {
                lang: 'zh-Hans'
            },
            link: this.meta_links,
            meta: this.meta_items
        }
    },
    components: {
        Header,
        Footer,
        ModalMessage
    },
    data() {
        return {
            pagetitle   :   null,
            loaded      :   false,
            site_data   :   null
        }
    },
    watch: {
        $route(to, from) {
            this.$bus.$emit('onPageChange');
            this.site_data  =   null;
            this.pagetitle  =   null;
            this.loaded     =   false;
            this.get_page_data(to.fullPath);
        }
    },
    computed: {
        class_name() {
            if (this.$route.path == '/index.html') {
                return 'homepage';
            }
            return slugify(this.$route.name, {lower: true});
        },
        meta_links() {
            let links   =   [];
            if (this.site_data && this.site_data.meta && this.site_data.meta.canonical) {
                links.push({rel: 'canonical', href: this.site_data.meta.canonical});
            }
            return links;
        },
        meta_items() {
            let meta    =   [
                {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
            ];
            if (this.site_data && this.site_data.meta) {
                if (this.site_data.meta.description) {
                    meta.push({
                        name    :   'description',
                        content :   this.site_data.meta.description
                    });
                }
                if (this.site_data.meta.keywords) {
                    meta.push({
                        name    :   'keywords',
                        content :   this.site_data.meta.keywords
                    });
                }
                if (this.site_data.meta.robots) {
                    meta.push({
                        name    :   'robots',
                        content :   this.site_data.meta.robots
                    });
                }
                if (this.site_data.meta.social) {
                    this.site_data.meta.social.forEach((o) => {
                        if (o.content) {
                            meta.push(o);
                        }
                    });
                }
            }

            return meta;
        }
    },
    created() {
        let me = this;
        $(window).unbind('focus').on('focus', function(e) {
            me.get_session();
        });
        me.get_session();
        this.get_page_data(this.$route.fullPath);
    },
    mounted() {
        let me = this;
        $(window).unbind('focus').on('focus', function(e) {
            me.get_session();
        });
        me.$bus.$off('triggerSessionUpdate');
        me.$bus.$on('triggerSessionUpdate', this.get_session);
    },
    beforeDestory() {
        this.$bus.$off('triggerSessionUpdate');
    },
    methods: {
        get_session() {
            let me = this;
            axios.get(base_url + endpoints.session).then((resp) => {
                global.csrf = resp.data.csrf;
                me.$bus.$emit('onSessionUpdated', resp.data.member);
            });
        },
        get_page_data(path, seamless) {
            let me  =   this;
            NProgress.start();
            axios.get(
                base_url + me.get_endpath(path)
            ).then((resp) => {
                me.handle_page_data(resp);
            }).catch((error) => {
                axios.get(
                    base_url + 'page-not-found'
                ).catch((error) => {
                    me.handle_page_data(error.response);
                });
            });
        },
        get_endpath(path) {
            path    =   path.ltrim('/').replace(/\/index.html/gi, '');
            return path;
        },
        handle_page_data(resp) {
            if (typeof(resp.data) != 'object') {
                location.reload();
            }
            NProgress.done();
            let me      =   this;

            me.pagetitle    =   resp.data.menu_title;
            me.site_data    =   resp.data;

            me.$nextTick().then(() => {
                me.loaded =   true;
            });
        }
    }
}
</script>
<style>
@import './css/styles.css';
@import '../node_modules/lightbox2/dist/css/lightbox.min.css';

.is-relative {
    position: relative;
}

.is-marginless-vertical {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
</style>
