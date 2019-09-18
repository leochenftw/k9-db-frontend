<template>
<div class="columns">
    <div class="column is-5">
        <div class="file is-boxed">
            <label class="file-label">
                <input class="file-input" multiple type="file" @change="file_change" :accept="allowed_types" />
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
    <div class="column bulk-uploader__images">
        <div class="columns is-variable is-1 is-mobile is-multiline bulk-uploader__images__existing">
            <div class="column is-4" v-for="(photo, i) in existing">
                <a class="preview-canvas-holder" :style="'background-image: url(' + photo.thumb + ')'" :data-lightbox="$parent.dog_name" :href="photo.url"></a>
                <button class="delete preview-canvas-delete" @click="purge(photo.id, $event)"></button>
            </div>
            <div class="column is-relative is-4" v-for="(file, i) in files">
                <div class="is-block preview-canvas-holder" :style="'background-image: url(' + previews[i].canvas + ')'">
                    <progress :class="['progress is-small', {'is-visible' : previews[i].progress > 0}, {'is-full' : previews[i].progress == 100}]" :value="previews[i].progress" max="100">{{previews[i].progress}}%</progress>
                </div>
                <button class="delete preview-canvas-delete" @click="remove(i, $event)"></button>
            </div>
        </div>
        <p class="help">可接受的文档格式为：{{allowed_types}}。文档可接受的最大尺寸为20MB，最小为50K。</p>
    </div>
</div>
</template>

<script>
export default
{
    name    :   'BulkUploader',
    props   :   ['id', 'title', 'allowed_types', 'field_name', 'endpoint', 'existing'],
    data() {
        return {
            source: null,
            files:[],
            is_uploading: false,
            has_file: false,
            progress: 0,
            timeout: null,
            max_file_count: 9,
            previews: [],
            num_in_queue:   0
        }
    },
    watch: {
        has_file(nv, ov) {
            if (!nv) {
                this.source.file = null;
                // this.$bus.$emit('onQueueRemove', this._uid);
            }
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
        base_url() {
            return base_url.rtrim('/');
        }
    },
    created() {
        this.$bus.$off('onBulkUploadStart');
        this.$bus.$on('onBulkUploadStart', this.do_upload);
    },
    beforeDestroy() {
        this.$bus.$off('onBulkUploadStart');
    },
    methods: {
        file_size(file) {
            if (file && file.size) {
                return file.size.toFilesize();
            }
        },
        file_name(file) {
            return file ? file.name : '';
        },
        preview_image(file, o) {
            let reader  =   new FileReader();

            reader.onload   =   function(e)
            {
                o.canvas =   e.target.result;
            }

            reader.readAsDataURL(file);
        },
        purge(id, e) {
            e.preventDefault();
            this.$parent.remove_from_photos(id);
            let me      =   this,
                data    =   new FormData();
            data.append('photo_id', id);
            axios.post(
                base_url + endpoints.dog + '/' + this.$parent.dog_id + '/delete_photo',
                data
            ).then((resp) => {

            }).catch((error) => {

            });
        },
        remove(i, e) {
            e.preventDefault();
            this.files.splice(i, 1);
            this.previews.splice(i, 1);
        },
        file_change(e) {
            let me  =   this;
            if (e.target.files && e.target.files.length > 0) {
                for (let i = 0; i < e.target.files.length; i++) {
                    if (this.files.length + this.existing.length < this.max_file_count) {
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
            $(e.target).val('');
        },
        do_upload(id) {
            if (!id) return;

            if (this.files.length == 0) {
                this.$parent.exec_queue(id);
                return false;
            }

            if (this.is_uploading) {
                return false;
            }

            this.is_uploading = true;

            let me          =   this,
                i           =   this.existing.length;
            me.num_in_queue =   this.files.length;
            this.files.forEach((o) => {
                let data    =   new FormData(),
                    item    =   me.previews[i],
                    config  =   {
                        onUploadProgress: function(progressEvent) {
                            item.progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                        }
                    };
                data.append('idx', i);
                data.append('photo', o);
                axios.post(
                    base_url + (this.endpoint == 'dog' ? endpoints.dog : endpoints.member) + '/' + id,
                    data,
                    config
                ).then((resp) => {
                    me.num_in_queue--;
                    if (me.num_in_queue == 0) {
                        me.is_uploading =   false;
                        me.$parent.exec_queue(id);
                    }
                }).catch((error) => {
                    me.is_uploading =   false;
                });
                i++;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.preview-canvas-holder {
    display: block;
    position: relative;
    padding-top: 100%;
    background-size: cover;
    background-position: center;
    .progress {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0;
        border-radius: 0;
    }
}

.column {
    position: relative;
    .delete {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
}

.bulk-uploader {
    &__images {
        &__existing {
            .column {
                padding-top: var(--columnGap);
                padding-bottom: var(--columnGap);
            }
        }

        &__uploading {
            max-height: 12rem;
            overflow: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
}
</style>
