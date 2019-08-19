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
            <DogHero :item="item" :show_link="true" />
        </Slide>
    </Carousel>
    <DogHero :item="site_data" v-if="site_data.pagetype == 'dogpage'" />
    <section class="section generic">
        <div class="container">
            <Breadcrumbs
                :items="site_data.ancestors"
                :title="site_data.title"
                v-if="site_data.pagetype != 'doglistpage'"
            />
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
                <NewsSection v-if="site_data.siblings && site_data.siblings.length > 0" :list="site_data.siblings" :show_no_more="true" />
            </template>
            <template v-else>
                <h1 class="title is-4"><span>{{site_data.title}}</span></h1>
                <NewsLayout v-if="site_data.news && site_data.news.list" :news="site_data.news" />
                <DogBreedSection v-if="site_data.breeds && site_data.breeds.list && site_data.pagetype == 'doglistpage'" :breeds="site_data.breeds" />
                <DogDetailSection v-if="site_data.pagetype == 'dogpage'" :site_data="site_data" />
                <PersonnelSection
                    v-if="site_data.pagetype == 'personnelpage'"
                    :members="site_data.members"
                />
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
import DogBreedSection from '../blocks/DogBreedSection';
import DogHero from '../blocks/elements/DogHero';
import DogDetailSection from '../blocks/DogDetailSection';
import PersonnelSection from '@/components/blocks/PersonnelSection';
export default {
    name        :   'Generic',
    props       :   ['site_data'],
    components  :   {
        Carousel,
        Slide,
        Breadcrumbs,
        NewsLayout,
        NewsSection,
        DogBreedSection,
        DogHero,
        DogDetailSection,
        PersonnelSection
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
</style>
