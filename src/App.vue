<template>
<div id="app">
    <Header />
    <router-view />
    <Footer />
    <ModalMessage />
</div>
</template>

<script>
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import ModalMessage from './components/blocks/ModalMessage';

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        ModalMessage
    },
    watch: {
        $route(to, from) {
            this.$bus.$emit('onPageChange');
            NProgress.start();
        }
    },
    mounted() {
        let me = this;
        $(window).unbind('focus').on('focus', function(e) {
            me.get_session();
        });
        me.get_session();
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
        }
    }
}
</script>
<style>
@import 'css/styles.css';
@import '../node_modules/lightbox2/dist/css/lightbox.min.css';

.is-relative {
    position: relative;
}

.is-marginless-vertical {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
</style>
