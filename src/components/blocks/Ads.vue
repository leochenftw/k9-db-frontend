<template>
    <div class="promo-wrapper">
        <div class="promo">
            <div class="promo-body">
                <div class="promo-photo">
                    <img src="@/assets/puppy.png"/>
                </div>
                <div class="promo-content">
                    <h2 class="title is-4 promo-title">{{title}}</h2>
                    <div class="content" v-html="content"></div>
                    <div class="action has-text-centered promo-action button">
                        <a :href="link.url" target="_blank">{{link.label}}</a>
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
    .promo-wrapper .promo {
        background-color: #c1a284;
        .promo-body {
            display: flex;
            max-width: 960px;
            margin: auto;
            padding: 0.75rem;
            .promo-photo img{
                max-width: unset;

            }
            .promo-content {
                padding: 2rem 8rem;
                text-align: center;
                .promo-title {
                    color: #fff;
                    display: inline-block;
                    position: relative;
                    &:after {
                        position: absolute;
                        content: '';
                        height: 3px;
                        bottom: -8px;
                        margin: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        background: #fff;
                    }
                }
                .content {

                }
                .promo-action{
                    padding: 1rem 1.25rem;
                }
            }
        }

    }
</style>
