<template>
    <div class="promo-wrapper">
        <div class="promo container">
            <div class="promo-body columns">
                <div class="promo-photo column">
                    <img src="@/assets/puppy.png"/>
                </div>
                <div class="promo-content column has-text-centered">
                    <h2 class="title is-4 promo-title"><span>{{title}}</span></h2>
                    <div class="content" v-html="content"></div>
                    <div class="action has-text-centered promo-action">
                        <a class="button is-white" :href="link.url" target="_blank">{{link.label}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Ads',
        data () {
            return {
                title: '台湾工作犬训练学校',
                content: '<p>針對狗狗的個性及主人的需求提供整套完整的訓練課程，讓您的愛犬不再是您的負擔，讓他可以融入社會、融入家庭，成為您生活的伴侶。</p>',
                link: {
                    label: '了解更多',
                    url: '#'
                }
            };
        }
    }
</script>
<style lang="scss" scoped>
    .promo-wrapper {
        margin: 3rem auto;
        background-color: #c1a284;
        .promo {
            &.container {
                max-width: 960px;
            }
            padding: 20px 0;
            &-photo {
                position: relative;
                text-align: center;
                img {
                    display: block;
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }

            &-content {
                .promo {
                    &-title {
                        margin-top: .75rem;
                        font-size: 30px;
                        color: #fff;
                        letter-spacing: 2px;
                        span {
                            display: inline-block;
                            padding-bottom: 8px;
                            border-bottom: 3px solid #fff;
                        }
                    }
                }

                .content {
                    color: #371c12;
                    line-height: 2;
                    padding-left: 3rem;
                    padding-right: 3rem;
                }

                .action {
                    margin-bottom: 1.5rem;
                }
            }
        }
    }
</style>
