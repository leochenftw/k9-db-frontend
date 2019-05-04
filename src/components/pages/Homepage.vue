<template>
    <div class="page">
        <carousel :perPage="1">
            <slide>
                Slide 1 Content
            </slide>
            <slide>
                Slide 2 Content
            </slide>
        </carousel>
        <ThumbnailStripe />
        <ThumbnailStripe :title="'最新视频'" />
        <Ads />
        <NewsSection />
        <ThumbnailStripe :title="'人才推荐'" />
        <AdsColumns />
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import ThumbnailStripe from '@/components/blocks/ThumbnailStripe';
import Ads from '@/components/blocks/Ads';
import NewsSection from '@/components/blocks/NewsSection';
import AdsColumns from '@/components/blocks/AdsColumns';
export default
{
    name        :   'Homepage',
    components  :   {
        Carousel,
        Slide,
        ThumbnailStripe,
        Ads,
        NewsSection,
        AdsColumns
    }
}
</script>
