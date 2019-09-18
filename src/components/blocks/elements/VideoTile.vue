<template>
<div class="video-tile">
    <div class="iframe-holder">
        <iframe :src="'https://player.youku.com/embed/' + source.youku_id" frameborder="0" allowfullscreen></iframe>
    </div>
    <h3 class="title is-4">{{source.title}}</h3>
    <p class="subtitle is-7"><em>{{date_label(source.date)}}</em></p>
    <div class="content" v-html="source.description"></div>
</div>
</template>

<script>
import * as moment from 'moment';
export default {
    name        :   'VideoTile',
    props       :   {
        source  :   {
            type    :   Object,
            default :   null
        }
    },
    methods     :   {
        date_label(date) {
            moment.locale('zh-cn');
            return moment(date).format('lll');
        },
        delete_entry(e) {
            e.preventDefault();
            if (confirm('Delete?')) {
                this.$parent.remove_entry(this.source.id);
                axios.delete(
                    base_url + endpoints.video + '/' + this.source.id + '/delete'
                );
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.video-tile {
    border: 1px solid #c1a284;
    padding: 7px;
    height: 100%;
    .title {

    }

    .subtitle {
        margin-bottom: 1em;
    }
}
.iframe-holder {
    position: relative;
    padding-top: 56.25%;
    margin-bottom: 1rem;
    iframe {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
