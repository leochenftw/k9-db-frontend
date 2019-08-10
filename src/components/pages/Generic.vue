<template>
<main id="main" class="main">
    <section class="section generic">
        <div class="container">
            <Breadcrumbs :items="site_data.ancestors" :title="site_data.title" />
            <h1 class="title is-4"><span>{{site_data.title}}</span></h1>
            <NewsLayout v-if="site_data.news && site_data.news.list" :news="site_data.news" />
        </div>
    </section>
</main>
</template>

<script>
import Breadcrumbs from '../blocks/elements/Breadcrumbs';
import NewsLayout from '../blocks/NewsLayout';
export default {
    name        :   'Generic',
    props       :   ['site_data'],
    components  :   {
        Breadcrumbs,
        NewsLayout
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
