<template>
    <header id="header" class="section header-section">
        <div class="container top-stripe">
            <div class="columns">
                <div class="column"><i class="fab fa-weixin"></i> {{userName}}</div>
                <div class="column is-narrow">
                    <span>欢迎信息</span>
                    <template v-if="!logged">
                        <router-link :to="{ name: 'Signup' }">注册</router-link>
                        <router-link :to="{ name: 'Signin' }">登录</router-link>
                    </template>
                    <template v-else>
                        <router-link :to="{ name: 'Dashboard' }">用户中心</router-link>
                        <router-link :to="{ name: 'Signout' }">退出</router-link>
                    </template>
                </div>
            </div>
        </div>
        <div class="container logo-block">
            <div class="columns">
                <div class="column is-4">
                    <div v-on:click="show_mobile_menu"
                         :class="{'navbar-burger': true, 'burger': true, 'is-active': mobile_menu_is_active, 'is-marginless': true}"
                         data-target="mobile-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="column is-4 has-text-centered">
                    <router-link :to="{ name: 'Homepage' }">
                        <img src="@/assets/logo.png" width="245" height="60" alt="logo"/>
                    </router-link>
                </div>
                <div class="column is-3 is-offset-1 search-box">
                    <SearchField/>
                </div>
            </div>
        </div>
        <nav class="container navbar">
            <div id="mobile-menu"
                 :class="{'navbar-menu': true, 'is-active': mobile_menu_is_active }">
                <router-link class="navbar-item" :to="item.url" :key="key" v-for="item, key in site_data.navigation">
                    {{item.label}}
                </router-link>
            </div>
        </nav>
    </header>
</template>
<script>
    import SearchField from '@/components/blocks/elements/SearchField';

    export default {
        name: 'Header',
        props: ['site_data'],
        components: {
            SearchField
        },
        data () {
            return {
                base_prefix: global.base_prefix,
                mobile_menu_is_active: false,
                logged: this.site_data.session.member ? true : false,
                userName: 'gongzuoquan_1234',
            };
        },
        methods: {
            click_to_close: function (e) {
                let target = $(e.target);
                if (!target.is('.burger') &&
                    target.parents('.burger').length == 0 &&
                    !target.is('.navbar-item') &&
                    target.parents('.navbar-item').length == 0) {

                    this.mobile_menu_is_active = false;
                    $(window).unbind('mousedown', this.click_to_close);
                }
            },
            show_mobile_menu: function (e) {
                e.preventDefault();
                $(window).unbind('mousedown', this.click_to_close).on('mousedown', this.click_to_close);
                this.mobile_menu_is_active = !this.mobile_menu_is_active;
            }
        },
        created () {
            let me = this;
            this.$bus.$off('onSessionUpdated');
            this.$bus.$on('onSessionUpdated', (member) => {
                me.logged = member ? true : false;
            });
        },
        beforeDestroy () {
            this.$bus.$off('onSessionUpdated');
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../scss/config/colours";

    .header-section {
        padding: 0;
        .top-stripe {
            background-color: $primary-brown;
            color: $donkey-brown;
            .columns {
                padding: 0;
                margin: auto 0;
                .column {
                    padding: 0.6rem;
                }
            }
        }
        .logo-block {
            .columns {
                margin: 0;
                .column {
                    padding: 1.1rem;
                }
                .search-box {
                    padding-right: 0;
                    margin: auto 0 auto auto;
                }
            }
        }
        .navbar {
            &-menu {

            }

            &-item {
                justify-content: center;
                flex-basis: 0;
                flex-grow: 1;
                flex-shrink: 1;
                border: 1px solid $primary-text-brown;
                color: $primary-text-brown;
                &:hover,
                &.is-active {
                    background-color: #f0e2d0;
                    color: $donkey-brown;
                    font-weight: bold;
                }
                &:not(:last-child) {
                    border-right: none;
                }
            }
        }
    }

</style>
