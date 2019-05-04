<template>
<div class="member-video-entry columns is-mobile" v-if="source">
    <div class="column is-3">
        <!-- <div class="member-video-entry__thumb" :style="thumb"></div> -->
        {{date_label(source.date)}}
    </div>
    <div class="column">
        <h3 class="title is-5">{{source.title}}</h3>
        <div class="content" v-if="source.youku_id">
            <div class="iframe-holder">
                <iframe :src="'https://player.youku.com/embed/' + source.youku_id" frameborder=0 allowfullscreen></iframe>
            </div>
        </div>
        <div class="content" v-html="source.description"></div>
        <p class="subtitle is-6" v-if="source.category">标签: <em>{{source.category}}</em></p>
    </div>
    <div class="column is-narrow"><button @click="delete_entry" class="delete"></button></div>
</div>
</template>

<script>
import * as moment from 'moment';
export default
{
    name        :   'VideoEntry',
    props       :   {
        source  :   {
            type    :   Object,
            default :   null
        }
    },
    watch       :   {
        source(nv, ov) {

        }
    },
    data() {
        return {

        }
    },
    computed    :   {
        base_url() {
            return global.base_url.substring(0, global.base_url.length - 1);
        },
        thumb() {
            if (this.source && this.source.thumb) {
                return 'background-image: url(' + base_url + this.source.thumb.replace(/ /gi, '%20') + ')';
            }

            return 'background-image: url(' + require('@/assets/placeholder.png') + ')';
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
.member-video-entry {
    &__thumb {
        border: 1px solid #ccc;
        position: relative;
        padding-top: 100%;
        background-position: center;
        background-size: cover;
    }

    &__photo {
        img {
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    }

    .iframe-holder {
        position: relative;
        padding-top: 56.25%;
        iframe {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
