<template>
<router-link :to="item.link.url" class="newsitem" v-if="item">
    <div :class="['columns', {'is-mobile' : is_mobile}]">
        <div class="column is-2 col-date has-text-centered">
            <span class="date">{{item.day}}</span>
            <span class="month">{{item.month}}月</span>
        </div>
        <div class="column">
            <div class="column__inner">
                <h2 class="title is-5">{{item.title}}</h2>
                <div class="content" v-html="item.content"></div>
                <div class="foot"><strong>{{item.date}}</strong></div>
            </div>
        </div>
        <div class="column is-4">
            <figure>
                <img :src="item.image" :alt="item.title + '\'s image'" />
            </figure>
        </div>
    </div>
</router-link>
</template>

<script>
export default {
    name    :   'NewsItem',
    props   :   ['item'],
    data()
    {
        return {
            is_mobile   :   true
        }
    },
    created()
    {
        this.$bus.$on('onWindowResize', (width) => {
            if (width < 768) {
                this.is_mobile  =   false;
            } else {
                this.is_mobile  =   true;
            }
        });
    },
    beforeDestroy()
    {
        this.$bus.$off('onWindowResize');
    }
}
</script>

<style lang="scss" scoped>
.newsitem {
    color: #6a6b73;
}
.column {
    &s {
        margin: 0 0 1.5rem;
        border: 1px solid #c8ac8f;
    }

    &__inner {
        height: 100%;
        padding: 12px 12px 12px 36px;
        @media screen and (max-width: 767px) {
            padding: 1rem .75rem;
        }
    }

    &.col {
        &-date {
            background-color: #c8ac8f;
            span {
                display: block;
                line-height: 1.2;
                color: #371c12;
                &.date {
                    font-size: 56px;
                }

                &.month {
                    font-size: 24px;
                }
            }
        }
    }

    figure {
        display: block;
        padding-top: 12px;
        padding-right: 12px;
        img {
            width: 100%;
        }

        @media screen and (max-width: 767px) {
            padding: 0 .75rem .75rem;
        }
    }
}
</style>
