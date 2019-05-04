<template>
<div class="member-photo-section">
    <h2 class="title is-5">犬只照片 <button v-if="photos.length > 0" class="button is-info is-small" @click="show_uploader">添加图片</button></h2>
    <p v-if="is_loading">数据加载中...</p>
    <div v-else-if="photos.length == 0" class="member-photo-section__empty-result">
        <div class="content">
            <a class="is-block has-text-centered" @click="show_uploader">
                <p class="title is-1"><img src="@/assets/image-holder.png" /></p>
                <p class="subtitle is-7">您还没有发布过任何照片，点这里上传您的第一幅照片吧~</p>
            </a>
        </div>
    </div>
    <div v-else class="member-photos">
        <PhotoEntry :key="i" v-for="(item, i) in photos" :source="item" />
    </div>
    <PhotoUploader />
</div>
</template>

<script>
import PhotoUploader from '../elements/PhotoUploader';
import PhotoEntry from '../elements/PhotoEntry';
export default {
    name        :   'PhotoSection',
    components  :   { PhotoUploader, PhotoEntry },
    data()  {
        return {
            is_loading  :   true,
            photos      :   []
        }
    },
    created()   {
        this.load();
    },
    methods :   {
        load() {
            this.is_loading =   true;
            axios.get(
                base_url + endpoints.photo
            ).then(this.prep);
        },
        prep(resp) {
            let me          =   this;
            this.is_loading =   false;
            // this.photos     =   resp.data;
            for (let i = 0; i < resp.data.length; i++) {
                me.photos.push(resp.data[i]);
            }
        },
        show_uploader(e) {
            e.preventDefault();
            this.$bus.$emit('onShowPhotoUploader');
        },
        remove_entry(id) {
            _.remove(this.photos, o => o.id == id);
            this.$set(this.photos, this.photos);
        }
    }
}
</script>
