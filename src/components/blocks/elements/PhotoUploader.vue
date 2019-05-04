<template>
<div :class="['modal', { 'is-active' : show }]">
    <div class="modal-background" @mousedown="close"></div>
    <form class="modal-card" method="post" @submit="submit">
        <header class="modal-card-head">
            <p class="modal-card-title">上传照片...</p>
            <button v-if="!is_uploading" class="delete" aria-label="close" @click="close"></button>
        </header>
        <div class="modal-card-body">
            <div class="field">
                <textarea :disabled="is_uploading" rows="8" class="textarea" v-model="description" placeholder="照片集描述"></textarea>
            </div>
            <div class="field">
                <div class="columns is-mobile is-multiline is-marginless-vertical">
                    <div class="column is-relative is-4" v-for="(file, i) in files">
                        <div class="is-block preview-canvas-holder" :style="'background-image: url(' + previews[i].canvas + ')'">
                            <progress :class="['progress is-small', {'is-visible' : previews[i].progress > 0}, {'is-full' : previews[i].progress == 100}]" :value="previews[i].progress" max="100">{{previews[i].progress}}%</progress>
                        </div>
                        <button class="delete preview-canvas-delete" @click="remove(i, $event)"></button>
                    </div>
                    <div class="column is-relative is-4" v-if="files.length < max_file_count && !is_uploading">
                        <div class="preview-canvas-holder is-block">
                            <input type="file" multiple accept=".jpg,.jpeg,.png" class="is-hidden" @change="file_change" />
                            <button class="button" @click="browse"><span class="icon"><i class="fas fa-plus"></i></span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field">
                <input :disabled="is_uploading" type="text" class="input" v-model="title" placeholder="照片集标题" />
            </div>
            <div class="field">
                <div class="select is-fullwidth">
                    <select :disabled="is_uploading" v-model="category">
                        <option value="null">- 请选择分类 -</option>
                        <option v-for="item in categories" :value="item">{{item}}</option>
                    </select>
                </div>
            </div>
        </div>
        <footer class="modal-card-foot">
            <button type="submit" :class="['button is-primary', { 'is-loading' : is_uploading }]">提交</button>
            <button v-if="!is_uploading" class="button" @click="close">取消</button>
        </footer>
    </form>
</div>
</template>

<script>
export default {
    name: 'PhotoUploader',
    data() {
        return {
            show            :   false,
            category        :   null,
            is_uploading    :   false,
            description     :   null,
            title           :   null,
            categories      :   [
                '赛场',
                '工作',
                '生活',
                '训练'
            ],
            files           :   [],
            previews        :   [],
            max_file_count  :   9,
            num_in_queue    :   0
        }
    },
    created() {
        let me  =   this;
        this.$bus.$off('onShowPhotoUploader');
        this.$bus.$on('onShowPhotoUploader', () => {
            me.show =   true;
        });
    },
    beforeDestroy() {
        this.$bus.$off('onShowPhotoUploader');
    },
    methods :   {
        preview_image(file, o) {
            let reader  =   new FileReader();

            reader.onload   =   function(e)
            {
                o.canvas =   e.target.result;
            }

            reader.readAsDataURL(file);
        },
        file_change(e) {
            let me  =   this;
            if (e.target.files && e.target.files.length > 0) {
                for (let i = 0; i < e.target.files.length; i++) {
                    if (this.files.length < this.max_file_count) {
                        this.files.push(e.target.files[i]);
                        let canvas  =   { canvas: null, progress: 0 };
                        this.previews.push(canvas);
                        this.preview_image(e.target.files[i], canvas);
                    } else {
                        me.$bus.$emit('Msgbox', '您最多只能上传' + me.max_file_count + '个文件', null, 'danger');
                        return false;
                    }
                }
            }
            $(this.$el).find('input[type="file"]').val('');
        },
        browse(e) {
            e.preventDefault();
            $(this.$el).find('input[type="file"]').click();
        },
        submit(e) {
            e.preventDefault();
            if (this.is_uploading) return false;
            if (this.files.length == 0) {
                this.$bus.$emit('Msgbox', '请选择需要上传的照片!', null, 'danger');
                return false;
            }

            this.is_uploading   =   true;

            let me      =   this,
                data    =   new FormData();

            data.append('description', this.description);

            if (this.title && this.title.trim().length > 0) {
                data.append('title', this.title);
            }

            if (this.category) {
                data.append('category', this.category);
            }

            axios.post(
                base_url + endpoints.photo,
                data
            ).then((resp) => {
                me.upload_image(resp.data);
            }).catch((error) => {
                me.is_uploading =   false;
            });
        },
        upload_image(id) {
            let me          =   this,
                i           =   0;
            me.num_in_queue =   this.files.length;
            this.files.forEach((o) => {
                let data    =   new FormData(),
                    item    =   me.previews[i],
                    config  =   {
                        onUploadProgress: function(progressEvent) {
                            item.progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                        }
                    };
                data.append('id', id);
                data.append('idx', i);
                data.append('image', o);
                axios.post(
                    base_url + endpoints.photo,
                    data,
                    config
                ).then((resp) => {
                    me.num_in_queue--;
                    if (me.num_in_queue == 0) {
                        me.$parent.load();
                        me.is_uploading =   false;
                        me.close();
                    }
                }).catch((error) => {
                    me.is_uploading =   false;
                });
                i++;
            });
        },
        remove(i, e) {
            e.preventDefault();
            this.files.splice(i, 1);
            this.previews.splice(i, 1);
        },
        close(e) {
            if (e) {
                e.preventDefault();
            }

            if (this.is_uploading) return;

            this.show           =   false;
            this.category       =   null;
            this.description    =   null;
            this.title          =   null;
            this.files          =   [];
            this.previews       =   [];
            this.num_in_queue   =   0;
        }
    }
}
</script>
<style lang="scss" scoped>
.preview-canvas {
    &-holder {
        position: relative;
        padding-top: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        background-position: center;
        background-size: cover;
        border-radius: 4px;
        .button {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            border: none;
        }

        .progress {
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 0;
            height: 5px;
        }
    }
    &-delete {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-25%, 25%);
    }
}
</style>
