<template>
<div class="dog-breeds">
    <div class="columns">
        <BreedTile v-if="breeds.list.length > 0" v-for="item, i in breeds.list" :item="item" :key="i" />
    </div>
    <div class="loading-indicator has-text-centered column is-12" v-if="is_loading"></div>
    <div class="column is-12 has-text-centered dog-breeds__footer" v-else>
        <button v-if="!all_loaded" @click.prevent="load_breeds" :class="['button', {'is-loading' : is_loading}]">加载更多</button>
        <p v-else>- 所有犬种已加载 -</p>
    </div>
</div>
</template>

<script>
import BreedTile from './elements/BreedTile';
export default {
    name    :   'DogBreedSection',
    props   :   ['breeds'],
    components  :   { BreedTile },
    data()
    {
        return {
            page        :   this.$route.query.page ? this.$route.query.page : 0,
            is_loading  :   false,
            all_loaded  :   this.breeds.all_loaded
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
                this.load_breeds();
            }
        },
        load_breeds()
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
                me.breeds.list.push(o);
            });

            if (this.all_loaded) {
                $(window).off('scroll', this.check_button_visibility);
            }
        }
    }
}
</script>

<style lang="css" scoped>
</style>
