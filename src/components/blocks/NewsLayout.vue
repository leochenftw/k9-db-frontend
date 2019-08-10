<template>
<div class="news-list">
    <NewsItem v-if="news.list.length > 0" v-for="item, i in news.list" :item="item" :key="i" />
    <div class="loading-indicator has-text-centered column is-12" v-if="is_loading"></div>
    <div class="column is-12 has-text-centered news-list__footer" v-else>
        <button v-if="!all_loaded" @click.prevent="load_news" :class="['button', {'is-loading' : is_loading}]">加载更多</button>
        <p v-else>- 所有新闻已加载 -</p>
    </div>
</div>
</template>

<script>
import NewsItem from './elements/NewsItem';
export default {
    name        :   'NewsLayout',
    props       :   ['news'],
    components  :   { NewsItem },
    data()
    {
        return {
            page        :   this.$route.query.page ? this.$route.query.page : 0,
            is_loading  :   false,
            all_loaded  :   false
        }
    },
    created() {
        let me  =   this;
        $(window).on('scroll', this.check_button_visibility);
    },
    beforeDestroy() {
        $(window).off('scroll', this.check_button_visibility);
    },
    methods     :   {
        check_button_visibility(e)
        {
            if ($(this.$el).find('.button').length > 0 && $(this.$el).find('.button').visible(true)) {
                this.load_news();
            }
        },
        load_news()
        {
            if (this.is_loading) return false;
            this.is_loading     =   true;
            this.page++;
            axios.get(
                base_url.rtrim('/') + this.$route.path + (this.page > 0 ? ('?page=' + this.page + '&mini=1') : '?mini=1')
            ).then(this.prep).catch((error) => {

            });
        },
        prep(resp)
        {
            this.is_loading     =   false;
            this.all_loaded     =   resp.data.all_loaded;

            let me  =   this;
            resp.data.list.forEach((o) => {
                me.news.list.push(o);
            });

            if (this.all_loaded) {
                $(window).off('scroll', this.check_button_visibility);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
