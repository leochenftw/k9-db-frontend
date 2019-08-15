<template>
<main id="main" class="main">
    <Carousel
        v-if="site_data.breed_carousel"
        :autoplay="false"
        :autoplayTimeout="3000"
        :autoplayHoverPause="true"
        :perPage="1"
        :navigationEnabled="true"
        :loop=true :paginationEnabled="false" class="breed-carousel"
        navigationNextLabel="<i class='fas fa-chevron-right'></i>"
        navigationPrevLabel="<i class='fas fa-chevron-left'></i>"
    >
        <Slide v-for="item, i in site_data.breed_carousel" :key="i" class="breed-carousel__item">
            <div class="breed-carousel__item__content section" v-if="item.dog_head">
                <div class="container">
                    <div class="columns">
                        <figure class="column is-6 has-text-centered">
                            <img :src="item.dog_head.url" />
                        </figure>
                        <div class="column is-5 col-right">
                            <h2 class="title is-3">{{item.title}}</h2>
                            <div class="content" v-html="item.content"></div>
                            <div class="call-to-action">
                                <router-link :to="item.link" class="button is-brown">查看详情</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link :to="item.link" class="breed-carousel__item__content full-image" v-else :style="'background-image: url(' + item.image.url + ');'">
                <h2 class="title is-3 has-text-centered">{{item.title}}</h2>
            </router-link>
        </Slide>
    </Carousel>
    <section class="section generic">
        <div class="container">
            <Breadcrumbs :items="site_data.ancestors" :title="site_data.title" />
            <template v-if="site_data.pagetype == 'newitempage'">
                <div class="columns">
                    <div class="column">
                        <article class="newsitem__brief">
                            <h1 class="title is-4"><span>{{site_data.title}}</span></h1>
                            <div class="content">{{site_data.excerpt}}</div>
                            <p class="subtitle is-6">{{site_data.date}}</p>
                        </article>
                    </div>
                    <div class="column">
                        <figure>
                            <img :src="site_data.cover.url" />
                            <figcaption class="has-text-right">{{site_data.cover.copyright}}</figcaption>
                        </figure>
                    </div>
                </div>
                <article class="columns">
                    <div class="column is-offset-1 is-10">
                        <div class="content" v-html="site_data.content"></div>
                    </div>
                </article>
                <NewsSection v-if="site_data.siblings && site_data.siblings.length > 0" :list="site_data.siblings" />
            </template>
            <template v-else>
                <h1 class="title is-4"><span>{{site_data.title}}</span></h1>
                <NewsLayout v-if="site_data.news && site_data.news.list" :news="site_data.news" />
            </template>
        </div>
    </section>
</main>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Breadcrumbs from '../blocks/elements/Breadcrumbs';
import NewsLayout from '../blocks/NewsLayout';
import NewsSection from '../blocks/NewsSection';
export default {
    name        :   'Generic',
    props       :   ['site_data'],
    components  :   {
        Carousel,
        Slide,
        Breadcrumbs,
        NewsLayout,
        NewsSection
    }
}
</script>

<style lang="scss" scoped>

.section {
    &.generic {
        padding-top: 1.5rem;
    }
}

h1.title {
    margin-bottom: 24px;
    border-bottom: 1px solid #f0e2d0;
    position: relative;
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

.breed-carousel {
    &__item {
        background: #f7f7f7; /* Old browsers */
        background: -moz-linear-gradient(left,  #f7f7f7 15%, #f7f7f7 15%, #d4d1ce 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #f7f7f7 15%,#f7f7f7 15%,#d4d1ce 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #f7f7f7 15%,#f7f7f7 15%,#d4d1ce 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f7f7', endColorstr='#d4d1ce',GradientType=1 ); /* IE6-9 */

        &__content {
            .column {
                &.col-right {
                    padding-top: 48px;
                    .title {
                        margin-bottom: 36px;
                    }

                    .content {
                        margin-bottom: 48px;
                    }
                }
            }

            &.full-image {
                height: 100%;
                display: block;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                position: relative;
                .title {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 480px;
                    padding: 1rem 2rem;
                    background: -moz-linear-gradient(left,  rgba(247,247,247,0) 0%, rgba(247,247,247,0.24) 15%, rgba(212,209,206,0.8) 50%, rgba(247,247,247,0) 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(left,  rgba(247,247,247,0) 0%,rgba(247,247,247,0.24) 15%,rgba(212,209,206,0.8) 50%,rgba(247,247,247,0) 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(to right,  rgba(247,247,247,0) 0%,rgba(247,247,247,0.24) 15%,rgba(212,209,206,0.8) 50%,rgba(247,247,247,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00f7f7f7', endColorstr='#00f7f7f7',GradientType=1 ); /* IE6-9 */
                }
            }
        }
    }
}
</style>
