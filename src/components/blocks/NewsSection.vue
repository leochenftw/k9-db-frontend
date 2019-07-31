<template>
    <div class="section">
        <div class="container">
            <h2 class="title is-4"><span>赛事新闻活动</span> <router-link to="/news">更多</router-link></h2>
            <div class="columns">
                <NewsItemGrid :grid_size="'is-half'" :source="item" :key="key" v-for="item,key in items" />
            </div>
        </div>
    </div>
</template>

<script>
import NewsItemGrid from './elements/NewsItemGrid';
export default
{
    name            :   'NewsSection',
    components      :   { NewsItemGrid },
    data() {
        return  {
            items   :   [
                {
                    title   :   '2018 FCI亚洲杯犬展',
                    date    :   '25/08/2018',
                    image   :   require('@/assets/placeholder.png'),
                    content :   '<p>2018上海FCI亚洲杯犬展的成功申办，是中国历史上首次取得举办辐射全亚洲的犬类专业大赛的机会。它的举办将有效地促进中国犬业与国际平台的交流，让世界更多了解中国宠物行业蓬勃发展的巨大潜力。使全亚洲的爱犬人士有机会认识和了解当今中国不断提升的动物保护理念...</p>',
                    link    :   {
                        url     :   '#',
                        label   :   '阅读'
                    }
                },
                {
                    title   :   '昔日魅力褪色，澳门赛狗场走入历史',
                    date    :   '24/08/2018',
                    image   :   require('@/assets/placeholder.png'),
                    content :   '<p>去年，澳门政府要求赛场运营商澳门逸园赛狗会(Macau [Yat Yuen] Canidrome Company)把该赛场从市中心迁出，为城市重建提供空间。逸园赛狗会上个月证实该赛场将会关闭。</p>',
                    link    :   {
                        url     :   '#',
                        label   :   '阅读'
                    }
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.section {
    h2.title {
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

        a {
            display: block;
            position: absolute;
            right: 1rem;
            font-size: 1rem;
            color: #371c12;
            top: 0.5em;
        }
    }
}
</style>
