<template>
<div class="columns is-mobile">
    <div class="column is-2">
        <label class="label">{{title}}</label>
        <div class="field nowrap">
            <label :for="id">无</label>
            <input type="checkbox" :id="id" :name="id" class="switch is-rounded" v-model="has_file">
            <label :for="id">有</label>
        </div>
    </div>
    <div class="column" v-if="has_file">
        <label class="label">&nbsp;</label>
        <div class="columns">
            <div class="column is-narrow">
                <div class="file is-boxed">
                    <label class="file-label">
                        <input :data-name="field_name" class="file-input" type="file" @change="file_change" :accept="allowed_types">
                        <span class="file-cta">
                            <span class="file-icon">
                                <img src="@/assets/ico-upload.svg" />
                            </span>
                            <span class="file-label">
                                将文件拖拽至此上传
                            </span>
                            <span class="file-label sub">
                                或选择一个文档上传
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div class="column">
                <h2 class="title is-6">上传{{title}}</h2>
                <div class="columns is-variable is-1">
                    <div class="column is-narrow">
                        <img v-if="file_type" :src="file_type" />
                    </div>
                    <div class="column">
                        <div class="columns is-marginless">
                            <div class="column">{{file_name}}</div>
                            <a target="_blank" class="column is-3 has-text-right" :href="source.link" v-if="source && source.link">打开 <i class="fas fa-external-link-alt"></i></a>
                            <div v-else class="column is-3 has-text-right">{{file_size}}</div>
                        </div>
                        <progress :class="['progress is-small', {'is-visible' : progress > 0}, {'is-full' : progress == 100}]" :value="progress" max="100">{{progress}}%</progress>
                    </div>
                </div>
                <p class="help">可接受的文档格式为：{{allowed_types}}。文档可接受的最大尺寸为20MB，最小为50K。</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ToggleUploader',
    props: ['id', 'source', 'title', 'allowed_types', 'field_name', 'endpoint'],
    data() {
        return {
            is_loading: false,
            has_file: false,
            progress: 0,
            timeout: null
        }
    },
    watch: {
        has_file(nv, ov) {
            if (!nv) {
                this.source.file = null;
                this.$bus.$emit('onQueueRemove', this._uid);
            }

            this.source.delete =   !nv;
        },
        source(nv, ov) {
            let me = this;
            return me.has_file = me.source ? (me.source.file || (me.source.label && me.source.link) ? true : false) : false;
        },
        progress(nv, ov) {
            let me  =   this;
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            if (nv == 100) {
                this.timeout = setTimeout(function () {
                    me.progress = 0;
                }, 1000);
            }
        }
    },
    computed: {
        file_type() {
            if (this.source.file && this.source.file.type) {
                return this.source.file.type.indexOf('image/') == 0 ? require('@/assets/ico-image.svg') : require('@/assets/ico-word.svg');
            }

            if (this.source.ext) {
                if (this.source.ext == 'png' || this.source.ext == 'jpg' || this.source.ext == 'jpeg') {
                    return require('@/assets/ico-image.svg');
                } else {
                    return require('@/assets/ico-word.svg');
                }
            }

            return null;
        },
        file_size() {
            if (this.source.file && this.source.file.size) {
                return this.source.file.size.toFilesize();
            }
        },
        file_name() {
            return this.source.file ? this.source.file.name : (this.source.label && this.source.ext ? this.source.label + '.' + this.source.ext : '');
        }
    },
    methods: {
        file_change(e) {
            if (e.target.files.length > 0) {
                this.source.file = e.target.files[0];
                this.$bus.$emit('onQueueInsert', this);
            } else {
                this.source.file = null;
                this.$bus.$emit('onQueueRemove', this._uid);
            }
        },
        do_upload(id) {

            if (!this.source.file) {
                if (this.$parent.exec_queue) {
                    this.$parent.exec_queue(id);
                } else {
                    this.$bus.$emit('onFileUploaded');
                }
                return false;
            }

            if (this.is_loading) {
                return false;
            }

            this.is_loading = true;

            let me = this,
                data = new FormData(),
                config = {
                    onUploadProgress: function(progressEvent) {
                        me.progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    }
                };

            data.append('csrf', csrf);
            if (this.source.file) {
                data.append(this.field_name, this.source.file);
            }

            axios.post(
                base_url + (this.endpoint == 'dog' ? endpoints.dog : endpoints.member) + (id ? '/' + id : ''),
                data,
                config
            ).then((resp) => {
                me.is_loading = false;
                if (me.$parent.exec_queue) {
                    me.$parent.exec_queue(id);
                } else {
                    me.$bus.$emit('onFileUploaded');
                }
            }).catch((error) => {
                me.is_loading = false;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .progress {
        opacity: 0;
        transition: opacity 1s;
        transition-delay: 1s;
        &.is-visible {
            transition-delay: 0s;
            transition-duration: 0.3s;
            opacity: 1;
            &.is-full {
                opacity: 0;
            }
        }
    }
</style>
