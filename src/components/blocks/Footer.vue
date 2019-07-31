<template>
<footer id="footer" class="footer">
    <div class="container footer-menu">
        <div class="columns">
            <div class="column is-3">
                <p class="title is-5">联系我们</p>
                <ul>
                    <li>
                        <p><strong>工作邮箱</strong></p>
                        <p><a href="mailto:woaigongzuoquan@163.com">woaigongzuoquan@163.com</a></p>
                    </li>
                    <li>
                        <p><strong>联系电话</strong></p>
                        <p><a href="tel:13000000000">13000000000</a></p>
                    </li>
                    <li>
                        <p><strong>微信号</strong></p>
                        <p><a href="#">gongzuoquan_1234</a></p>
                    </li>
                </ul>
            </div>
            <div class="column is-3">
                <p class="title is-5">快速连接</p>
                <ul>
                    <li><a href="#">&gt; 关于我们</a></li>
                    <li><a href="#">&gt; 帮助中心</a></li>
                    <li><a href="#">&gt; 广告投放</a></li>
                    <li><a href="#">&gt; 隐私条款及政策</a></li>
                    <li><a href="#">&gt; 网站地图</a></li>
                </ul>
            </div>
            <div class="column is-3">
                <p class="title is-5">我的账户</p>
                <ul>
                    <li><a href="#">&gt; 登录</a></li>
                    <li><a href="#">&gt; 个人中心</a></li>
                    <li><a href="#">&gt; 我的视频</a></li>
                    <li><a href="#">&gt; 我的照片</a></li>
                    <li><a href="#">&gt; 已发布的繁殖信息</a></li>
                </ul>
            </div>
            <div class="column is-3">
                <p class="title is-5">二维码</p>
                <div class="content">
                    <p>扫描二维码，关注微信公众平台</p>
                    <p>
                        <img src="https://via.placeholder.com/150x150.png" />
                    </p>
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
    props: [],
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
        p, ul, li, a, strong{
            color: #ffffff;
        }
        ul li {
            line-height: 2rem;
        }
        p a {
            padding-left: 1rem;
        }

        .footer-menu{
            background-color: #9b6944;
            padding: 3rem 0;
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
