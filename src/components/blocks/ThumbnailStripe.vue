<template>
<div class="section">
    <div class="thumbnail-stripe latest-photos container">
        <h2 class="title is-4"><span>{{title}}</span></h2>
        <Carousel :perPage="itemPrePage" :mouseDrag=false :navigationEnabled="true" :loop=true :paginationEnabled="false" class="is-flex">
            <Slide v-for="i in 5" :key="i">
                <Thumbnail/>
            </Slide>
        </Carousel>
    </div>
</div>
</template>

<script>
    import Thumbnail from './elements/Thumbnail';
    import {Carousel, Slide} from 'vue-carousel';

    export default {
        name: 'ThumbnailStripe',
        components: {
            Thumbnail,
            Carousel,
            Slide
        },
        props: {
            title: {
                type: String,
                default: '最新照片'
            },
            itemPrePage: {
                type: Number,
                default: 5
            }
        }
    }
</script>
<style lang="scss">
.VueCarousel-inner {
    margin-left: -10px;
    margin-right: -10px;
}

.VueCarousel-slide {
    padding: 10px;
}

.thumbnail-stripe {
    .title {
        margin-bottom: 8px;
        border-bottom: 1px solid #f0e2d0;
        span {
            padding-bottom: 24px;
            display: inline-block;
            position: relative;
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                height: 2px;
                width: 100%;
                background-color: #a3673c;
                left: 0;
            }
        }
    }
}
</style>
