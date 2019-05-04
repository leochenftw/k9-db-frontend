<template>
    <div class="section">
        <div class="container">
            <div class="columns is-gapless">
                <div class="column">
                    <h2 class="title is-3">赛事新闻活动</h2>
                </div>
                <div class="column has-text-right">
                    <router-link to="/news">更多</router-link>
                </div>
            </div>
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
