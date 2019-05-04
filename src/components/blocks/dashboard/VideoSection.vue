<template>
<div class="member-video-section">
    <h2 class="title is-5">犬只视频 <button v-if="videos.length > 0" class="button is-info is-small" @click="show_uploader">添加视频</button></h2>
    <p v-if="is_loading">数据加载中...</p>
    <div v-else-if="videos.length == 0" class="member-video-section__empty-result">
        <div class="content">
            <a class="is-block has-text-centered" @click="show_uploader">
                <p class="title is-1"><img src="@/assets/image-holder.png" /></p>
                <p class="subtitle is-7">您还没有发布过任何视频，点这里上传您的第一个视频吧~</p>
            </a>
        </div>
    </div>
    <div v-else class="member-videos">
        <VideoEntry :key="i" v-for="(item, i) in videos" :source="item" />
    </div>
    <VideoUploader />
</div>
</template>

<script>
import VideoUploader from '../elements/VideoUploader';
import VideoEntry from '../elements/VideoEntry';
export default {
    name        :   'VideoSection',
    components  :   { VideoUploader, VideoEntry },
    data()  {
        return {
            is_loading  :   true,
            videos      :   []
        }
    },
    created()   {
        this.load();
    },
    methods :   {
        load() {
            this.is_loading =   true;
            axios.get(
                base_url + endpoints.video
            ).then(this.prep);
        },
        prep(resp) {
            let me          =   this;
            this.is_loading =   false;
            me.videos       =   resp.data;
            // for (let i = 0; i < resp.data.length; i++) {
            //     me.videos.push(resp.data[i]);
            // }
        },
        show_uploader(e) {
            e.preventDefault();
            this.$bus.$emit('onShowVideoUploader');
        },
        remove_entry(id) {
            _.remove(this.videos, o => o.id == id);
            this.$set(this.videos, this.videos);
        }
    }
}
</script>
