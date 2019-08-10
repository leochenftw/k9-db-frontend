<template>
<footer id="footer" class="footer">
    <div class="container footer-menu">
        <div class="columns">
            <div class="column is-3">
                <p class="title is-5">联系我们</p>
                <ul>
                    <li>
                        <p><i class="fas fa-paper-plane"></i> <strong>工作邮箱</strong></p>
                        <p><a :href="'mailto:' + site_data.siteconfig.contact.email">{{site_data.siteconfig.contact.email}}</a></p>
                    </li>
                    <li>
                        <p><i class="fas fa-phone-alt"></i> <strong>联系电话</strong></p>
                        <p><a :href="'tel:' + site_data.siteconfig.contact.phone">{{site_data.siteconfig.contact.phone}}</a></p>
                    </li>
                    <li>
                        <p><i class="fab fa-weixin"></i> <strong>微信号</strong></p>
                        <p><a>{{site_data.siteconfig.contact.wechat.official_account}}</a></p>
                    </li>
                </ul>
            </div>
            <div class="column is-3">
                <p class="title is-5">快速连接</p>
                <ul class="footer-menu__menu">
                    <li v-for="item, i in site_data.siteconfig.menu">
                        <router-link :to="item.url"><i class="fas fa-angle-right"></i> {{item.title}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="column is-3">
                <p class="title is-5">我的账户</p>
                <ul class="footer-menu__menu">
                    <li v-if="!site_data.member">
                        <router-link :to="'/signin'">
                            <i class="fas fa-angle-right"></i> 登录
                        </router-link>
                    </li>
                    <li v-else>
                        <router-link :to="'/member'">
                            <i class="fas fa-angle-right"></i> 个人中心
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/member/video'">
                            <i class="fas fa-angle-right"></i> 我的视频
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/member/photo'">
                            <i class="fas fa-angle-right"></i> 我的照片
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/member/breed'">
                            <i class="fas fa-angle-right"></i> 已发布的繁殖信息
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="column is-3" v-if="site_data.siteconfig.contact.wechat.qr_code">
                <p class="title is-5">二维码</p>
                <div class="content">
                    <p>扫描二维码，关注微信公众平台</p>
                    <figure><img :src="site_data.siteconfig.contact.wechat.qr_code.thumb" /></figure>
                </div>
            </div>
        </div>
    </div>
    <div class="closure">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <p>版权声明：如果来函说明本网站提供内容系本人或法人版权所有.<br />本网站在核实后，有权先行撤除，以保护版权拥有者的权益。未经授权禁止链接、复制或建立</p>
                </div>
                <div class="column has-text-right">
                    <p>© {{year}} 北京我爱工作犬网传播文化有限公司 京ICP备16012145号-1</p>
                </div>
            </div>
        </div>
    </div>
</footer>
</template>

<script>
export default {
    name: 'Footer',
    props: ['site_data'],
    components: {},
    watch: {

    },
    computed: {
        year() {
            let d = new Date();

            return d.getFullYear();
        }
    }
}
</script>
<style lang="scss" scoped>
    .footer {
        padding: 0;
        background-color: #9b6944;
        p, strong{
            color: #ffffff;
        }

        ul {
            li {
                line-height: 2rem;
                color: #e6e6e6;
                i {
                    width: 24px;
                }
                a {
                    color: #e6e6e6;
                }
            }

            &.footer-menu__menu {
                li {
                    i {
                        width: 16px;
                    }
                }
            }
        }

        p {
            &.title {
                &:after {
                    margin-top: 0.5em;
                    content: '';
                    display: block;
                    width: 1.5em;
                    height: 2px;
                    background-color: #fff;
                }
            }
            a {
                padding-left: 28px;
                display: inline-block;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        figure {
            max-width: 124px;
            margin: 0;
            img {
                display: block;
            }
        }

        .footer-menu{
            background-color: #9b6944;
            padding: 3rem 0;
            @media screen and (max-width: 1023px) {
                padding: 3rem 1.5rem;
            }
        }

        .closure {
            padding: 24px 0;
            font-size: 12px;
            background-color: #331d14;
            .columns {
                align-items: center;
            }
            p {
                color: #c8ac8f;
            }
        }
    }

</style>
