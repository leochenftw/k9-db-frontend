<template>
<div class="section">
    <div class="container">
        <h2 class="title is-4"><span>赛事新闻活动</span> <router-link v-if="!show_no_more" to="/news">更多</router-link></h2>
        <div class="columns">
            <NewsItemGrid :grid_size="'is-half'" :source="item" :key="key" v-for="item,key in list" />
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
    props           :   ['list', 'show_no_more']
}
</script>
<style lang="scss" scoped>
.section {
    padding-bottom: 0;
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
