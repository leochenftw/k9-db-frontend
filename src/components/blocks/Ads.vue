<template>
<a :href="promo.link.url" class="promo-wrapper" target="_blank">
    <div class="promo container">
        <div class="promo-body columns">
            <div class="promo-photo column">
                <!-- <img src="@/assets/puppy.png"/> -->
                <img :src="promo.image.url" />
            </div>
            <div class="promo-content column has-text-centered">
                <h2 class="title is-4 promo-title"><span>{{promo.title}}</span></h2>
                <div class="content" v-html="promo.content"></div>
                <div class="action has-text-centered promo-action" v-if="promo.link && promo.link.url">
                    <span class="button is-white">{{promo.link.title}}</span>
                </div>
            </div>
        </div>
    </div>
</a>
</template>

<script>
export default {
    name    :   'Ads',
    props   :   ['promo']
}
</script>
<style lang="scss" scoped>
    .promo-wrapper {
        display: block;
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
                    right: 10%;
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
