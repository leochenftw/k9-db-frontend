<template>
<div :class="['modal', { 'is-active' : show }]">
    <div class="modal-background" @mousedown="close"></div>
    <form class="modal-card" method="post" @submit="submit">
        <header class="modal-card-head">
            <p class="modal-card-title">上传视频...</p>
            <button v-if="!is_uploading" class="delete" aria-label="close" @click="close"></button>
        </header>
        <div class="modal-card-body">
            <div class="field" v-if="!youku_id">
                <label class="label">优酷视频链接</label>
                <div class="control">
                    <input type="text" placeholder="例: http://v.youku.com/v_show..." class="input" v-model="youku_url" />
                </div>
                <p v-if="iframe_error" class="help is-danger">{{iframe_error}}</p>
            </div>
            <div class="field" v-else-if="iframe_loaded">
                <div class="control">
                    <button @click.prevent="youku_url = null;" class="button is-danger">换一个视频</button>
                </div>
            </div>
            <div class="field" v-else>
                <p>...拉取优酷视频中</p>
            </div>
            <div class="field" v-if="youku_id">
                <div class="control iframe-holder">
                    <iframe @load="iframe_ready" :src="'https://player.youku.com/embed/' + youku_id" frameborder=0 allowfullscreen></iframe>
                </div>
            </div>
            <div class="field">
                <input :disabled="is_uploading" type="text" class="input" v-model="title" placeholder="视频标题" />
            </div>
            <div class="field">
                <div class="select is-fullwidth">
                    <select :disabled="is_uploading" v-model="category">
                        <option value="null">- 请选择分类 -</option>
                        <option v-for="item in categories" :value="item">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="field">
                <textarea :disabled="is_uploading" rows="8" class="textarea" v-model="description" placeholder="视频描述"></textarea>
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
    name: 'VideoUploader',
    data() {
        return {
            show            :   false,
            category        :   null,
            is_uploading    :   false,
            description     :   null,
            title           :   null,
            iframe_loaded   :   false,
            iframe_error    :   null,
            categories      :   [
                '赛场',
                '工作',
                '生活',
                '训练'
            ],
            youku_url       :   null
        }
    },
    created() {
        let me  =   this;
        this.$bus.$off('onShowVideoUploader');
        this.$bus.$on('onShowVideoUploader', () => {
            me.show =   true;
        });
    },
    beforeDestroy() {
        this.$bus.$off('onShowVideoUploader');
    },
    computed    :   {
        youku_id() {
            this.iframe_loaded  =   false;
            this.iframe_error   =   null;
            if (this.youku_url) {
                if (this.youku_url.trim().length > 0) {
                    let first_filter    =   this.youku_url.split('id_');
                    if (first_filter.length > 1) {
                        let second_filter   =   first_filter[1].split('.html');
                        if (second_filter.length > 1) {
                            return second_filter[0];
                        }
                    }
                    this.iframe_error   =   '非优酷链接, 或链接格式错误';
                }
            }
            return null;
        }
    },
    methods     :   {
        iframe_ready(e) {
            this.iframe_loaded  =   true;
        },
        submit(e) {
            e.preventDefault();
            if (!this.youku_id) {
                this.$bus.$emit('Msgbox', '请先添加优酷视频链接!', null, 'danger');
                return false;
            }

            if (this.is_uploading) return false;

            this.is_uploading   =   true;

            let me      =   this,
                data    =   new FormData();

            data.append('youku_id', this.youku_id);
            data.append('description', this.description);

            if (this.title && this.title.trim().length > 0) {
                data.append('title', this.title);
            }

            if (this.category) {
                data.append('category', this.category);
            }

            axios.post(
                base_url + endpoints.video,
                data
            ).then((resp) => {
                me.is_uploading =   false;
                me.$parent.load();
                me.close();
            }).catch((error) => {
                me.is_uploading =   false;
            });
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
            this.youku_url      =   null;
        }
    }
}
</script>
<style lang="scss" scoped>
.field {
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
