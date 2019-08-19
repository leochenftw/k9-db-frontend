<template>
<div class="dog-details">
    <div class="columns dog-details__parametres">
        <div class="column is-3">
            <dl class="dog-details__parametres__basic-info">
                <dt>英文</dt>
                <dd>{{site_data.basic_info.english_title}}</dd>
                <dt>别名</dt>
                <dd>{{site_data.basic_info.alias}}</dd>
                <dt>祖先</dt>
                <dd>{{site_data.basic_info.ancestor}}</dd>
                <dt>产地</dt>
                <dd>{{site_data.basic_info.origin}}</dd>
                <dt>原用途</dt>
                <dd>{{site_data.basic_info.original_usages}}</dd>
                <dt>现用途</dt>
                <dd>{{site_data.basic_info.usages}}</dd>
            </dl>
        </div>
        <div class="column is-3">
            <dl class="dog-details__parametres__basic-info">
                <dt>身高</dt>
                <dd>{{site_data.basic_info.height_from}} - {{site_data.basic_info.height_to}}CM</dd>
                <dt>寿命</dt>
                <dd>{{site_data.basic_info.age_from}} - {{site_data.basic_info.age_to}}年</dd>
                <dt>分布</dt>
                <dd>{{site_data.basic_info.distribution}}</dd>
                <dt>体型</dt>
                <dd>{{site_data.basic_info.body_size}}</dd>
                <dt>体重</dt>
                <dd>{{site_data.basic_info.weight_from}} - {{site_data.basic_info.weight_to}}KG</dd>
                <dt>价格</dt>
                <dd>{{site_data.basic_info.price_from}} - {{site_data.basic_info.price_to}}元</dd>
            </dl>
        </div>
        <div class="column is-3">
            <dl class="dog-details__parametres__basic-info scores">
                <template v-for="score, key in site_data.scores.left_col" v-if="score">
                <dt>{{key}}</dt>
                <dd><progress class="progress is-small" :value="score" max="5"></progress><span>{{score}}</span></dd>
                </template>
            </dl>
        </div>
        <div class="column is-3">
            <dl class="dog-details__parametres__basic-info scores">
                <template v-for="score, key in site_data.scores.right_col" v-if="score">
                <dt>{{key}}</dt>
                <dd><progress class="progress is-small" :value="score" max="5"></progress><span>{{score}}</span></dd>
                </template>
            </dl>
        </div>
    </div>
    <div class="dog-details__contents">
        <div class="dog-details__content" v-for="content, i in site_data.contents" v-if="content.content">
            <h2 class="title is-5" v-if="content.title">{{content.title}}</h2>
            <div class="content" v-html="content.content"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name    :   'DogDetailSection',
    props   :   ['site_data']
}
</script>

<style lang="scss" scoped>
.dog-details {
    &__content {
        padding: 2rem 2rem 2.5rem;
        border: 1px solid #f0e2d0;
        margin-bottom: 2rem;
        .title {
            display: inline-block;
            padding-bottom: 0.5em;
            border-bottom: 2px solid #c8ac8f;
        }
    }

    &__parametres {
        &__basic-info {

            dt {
                font-weight: bold;
                float: left;
                clear: left;
                &:after {
                    content: ':';
                    margin-right: 0.5rem;
                }
            }

            &.scores {
                dt {
                    &:after {
                        content: none;
                    }
                    width: 20%;
                }

                dd {
                    display: inline-block;
                    width: 80%;
                    position: relative;
                    .progress {
                        margin: 0;
                        color: #a3673c;
                    }

                    .progress::-webkit-progress-bar {
                        background-color: #f0e2d0;
                    }

                    .progress::-webkit-progress-value {
                        background-color: #a3673c;
                    }

                    .progress::-moz-progress-bar {
                        background-color: #a3673c;
                    }

                    .progress::-ms-fill {
                        background-color: #a3673c;
                    }

                    span {
                        position: absolute;
                        left: 0.35rem;
                        top: 0px;
                        font-size: 10px;
                        color: #fff;
                        line-height: 1;
                    }
                }
            }
        }
    }
}
</style>
