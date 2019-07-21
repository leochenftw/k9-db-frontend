<template>
    <div class="page">
        <carousel :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1"
                  :navigationEnabled="true" :loop=true :paginationEnabled="false" class="slide-items">
            <slide>
                <div class="slide-item">
                    <div class="slide-title">最新赛事新闻</div>
                    <div class="slide-content">第三届希望杯是展护卫去大赛在山西售出召开</div>
                    <div class="slide-action button">
                        查看详情
                    </div>
                </div>
            </slide>
            <slide>
                <div class="slide-item">
                    <div class="slide-title">最新赛事新闻2</div>
                    <div class="slide-content">第三届希望杯是展护卫去大赛在山西售出召开</div>
                    <div class="slide-action button">
                        查看详情2
                    </div>
                </div>
            </slide>
        </carousel>
        <ThumbnailStripe />
        <ThumbnailStripe :title="'最新视频'" :itemPrePage="4" />
        <Ads />
        <NewsSection />
        <ThumbnailStripe :title="'人才推荐'" :itemPrePage="5" />
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
