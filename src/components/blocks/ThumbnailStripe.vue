<template>
    <section class="section">
        <div class="thumbnail-stripe latest-photos container">
            <h2 class="title is-4">{{title}}</h2>
            <Carousel :perPage="itemPrePage" :mouseDrag=false :navigationEnabled="true" :loop=true :paginationEnabled="false" class="is-flex">
                <Slide v-for="i in 5">
                    <Thumbnail/>
                </Slide>
            </Carousel>
        </div>
    </section>
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
<style>
    .latest-photos.thumbnail-stripe {

    }
</style>
