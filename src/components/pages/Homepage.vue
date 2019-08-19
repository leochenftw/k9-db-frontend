<template>
<div class="page">
    <Carousel v-if="site_data.carousel" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" :perPage="1"
              :navigationEnabled="true" :loop=true :paginationEnabled="false" class="home-promo-carousel">
        <Slide v-for="item, i in site_data.carousel" :key="i" class="home-promo-carousel__item">
            <!-- <div class="home-promo-carousel__item__bg" :style="'background-image: url(' + item.image.url + ')'"></div> -->
            <img class="home-promo-carousel__item__image" :src="item.image.url" />
            <div class="container">
                <div class="home-promo-carousel__item__content">
                    <div class="home-promo-carousel__item__subtitle title is-6">{{item.subtitle}}</div>
                    <h2 class="home-promo-carousel__item__title title is-2">{{item.title}}</h2>
                    <div class="home-promo-carousel__item__action" v-if="item.link">
                        <router-link class="button is-brown" :target="item.open_in_blank ? '_blank' : '_self'" :to="item.link.url">{{item.link.title}}</router-link>
                    </div>
                </div>
            </div>
            <div class="home-promo-carousel__item__dates" v-if="item.type == 'event'">
                <p v-if="item.dates.start"><span class="date-label">从</span> <span class="date-text">{{item.dates.start}}</span></p>
                <p v-if="item.dates.end"><span class="date-label">至</span> <span class="date-text">{{item.dates.end}}</span></p>
            </div>
        </Slide>
    </Carousel>
    <ThumbnailStripe />
    <ThumbnailStripe :title="'最新视频'" :itemPrePage="5" />
    <Ads v-if="mid_page_ads" :promo="mid_page_ads" />
    <NewsSection v-if="site_data.news" :list="site_data.news" />
    <div class="section">
        <div class="container">
            <PersonnelSection :title="'人才推荐'" :members="site_data.members" more_link="/personnel" />
        </div>
    </div>
    <AdsColumns v-if="bottom_page_ads" :promo="bottom_page_ads" />
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import ThumbnailStripe from '@/components/blocks/ThumbnailStripe';
import Ads from '@/components/blocks/Ads';
import NewsSection from '@/components/blocks/NewsSection';
import AdsColumns from '@/components/blocks/AdsColumns';
import PersonnelSection from '@/components/blocks/PersonnelSection';
export default
{
    name        :   'Homepage',
    props       :   ['site_data'],
    components  :   {
        Carousel,
        Slide,
        ThumbnailStripe,
        Ads,
        NewsSection,
        AdsColumns,
        PersonnelSection
    },
    computed    :   {
        mid_page_ads()
        {
            if (this.site_data && this.site_data.promo) {
                return _.find(this.site_data.promo, o => o.promo_pos == 'page_middle');
            }

            return null;
        },
        bottom_page_ads()
        {
            if (this.site_data && this.site_data.promo) {
                return _.filter(this.site_data.promo, o => o.promo_pos == 'page_bottom');
            }

            return null;
        }
    }
}
</script>
<style lang="scss" scoped>
.home-promo-carousel {
    .VueCarousel-inner {
        margin: 0;
    }

    &__item {
        padding: 0;
        /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#d4bca2+0,e3cfba+100 */
        background: #d4bca2; /* Old browsers */
        background: -moz-linear-gradient(left,  #d4bca2 0%, #e3cfba 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #d4bca2 0%,#e3cfba 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #d4bca2 0%,#e3cfba 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d4bca2', endColorstr='#e3cfba',GradientType=1 ); /* IE6-9 */

        .container {
            min-height: 40vh;
            padding: 160px 0 172px;
        }

        &__bg {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 0;
            top: 0;
            left: 0;
            background-position: center bottom;
            background-repeat: no-repeat;
            background-size: auto 100%;
        }

        &__image {
            position: absolute;
            bottom: 0;
            max-height: 100%;
            width: auto;
            z-index: 0;
            left: 50%;
            transform: translateX(-50%);
        }

        &__content {
            @media screen and (min-width: 769px) {
                padding-right: 40%;
                padding-left: 5%;
            }
            position: relative;
        }

        &__subtitle,
        &__title {
            color: #371c12;
        }

        &__subtitle {
            letter-spacing: 2px;
            position: relative;
            display: inline-block;
            padding-bottom: 5px;
            border-bottom: 1px solid #371c12;
        }

        &__title {
            letter-spacing: 5px;
            margin-bottom: 3rem;
        }

        &__dates {
            position: absolute;
            right: 0;
            top: 0;
            width: 260px;
            height: 260px;
            padding-top: 124px;
            padding-left: 50px;
            background-color: #f05d23;
            border-radius: 50%;
            color: #fff;
            transform: translate(30%, -40%);
            p {
                &:not(:last-child) {
                    margin-bottom: 16px;
                }
                span {
                    display: inline-block;
                    line-height: 1.7;
                    vertical-align: bottom;
                    font-size: 14px;
                    &.date {
                        &-label {
                            margin-right: 0.5rem;
                        }
                        &-text {
                            line-height: 1;
                            font-size: 32px;
                        }
                    }
                }
            }
        }

    }
}
</style>
