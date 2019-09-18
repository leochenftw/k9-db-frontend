<template>
<div class="member-photo-entry columns is-mobile" v-if="source">
    <div class="column is-3">
        <!-- <div class="member-photo-entry__thumb" :style="thumb"></div> -->
        {{date_label(source.date)}}
    </div>
    <div class="column">
        <h3 class="title is-5">{{source.title}}</h3>
        <div class="content" v-html="source.description"></div>
        <div class="member-photo-entry__photos columns is-variable is-2 is-multiline is-mobile">
            <div class="column is-4 member-photo-entry__photo" v-for="(photo, i) in source.photos">
                <a :href="photo.url" :data-lightbox="date_label(source.date)"><img :src="photo.thumb.replace(/ /gi, '%20')" /></a>
            </div>
        </div>
        <p class="subtitle is-6" v-if="source.category">标签: <em>{{source.category}}</em></p>
    </div>
    <div class="column is-narrow"><button @click="delete_entry" class="delete"></button></div>
</div>
</template>

<script>
import * as moment from 'moment';
export default
{
    name        :   'PhotoEntry',
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
                    base_url + endpoints.photo + '/' + this.source.id + '/delete'
                );
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.member-photo-entry {
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
}
</style>
