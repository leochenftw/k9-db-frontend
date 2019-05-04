<template>
<div class="field">
    <div class="columns">
        <div class="file is-boxed column is-4">
            <div class="file-portrait-holder">
                <img v-if="canvas" class="file-portrait" :src="canvas" />
                <img v-else class="file-portrait" src="@/assets/default-portrait.png" />
            </div>
            <label class="file-label">
                <input class="file-input" type="file" name="portrait" @change="change">
            </label>
        </div>
        <div class="column">
            <div class="content">
                <p><button v-if="canvas" @click="delete_portrait" style="margin-right: 0.5em;" class="button is-danger">删除头像</button> <button @click="choose_image" class="button is-primary">选择头像</button></p>
                <p>可接受的图片格式为：jpg，png，可接受的最大尺寸为8MB，最小为50K。头像照片必须为本人正面照片。</p>
                <p><button @click="do_upload" :class="['button is-primary', { 'is-loading' : is_loading }]"><template v-if="source">保存更改</template><template v-else>上传头像</template></button></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Cropper from 'cropperjs';
export default {
    name    :   'PortraitUploader',
    props   :   ['source'],
    data() {
        return {
            id                  :   null,
            cropper             :   null,
            file                :   null,
            canvas              :   null,
            is_loading          :   false,
            container_x         :   0,
            container_y         :   0,
            container_width     :   0,
            container_height    :   0,
            cropper_x           :   0,
            cropper_y           :   0,
            cropper_width       :   0,
            cropper_height      :   0
        }
    },
    computed    :   {

    },
    watch   :   {
        source(nv, ov) {
            if (nv && nv.file && nv.file.link) {
                let me              =   this;
                me.id               =   nv.file.id;
                me.canvas           =   nv.file.link;
                me.container_x      =   parseInt(nv.container_x) * -1;
                me.container_y      =   parseInt(nv.container_y) * -1;
                me.container_width  =   parseInt(nv.container_width);
                me.container_height =   parseInt(nv.container_height);
                me.cropper_x        =   nv.cropper_x;
                me.cropper_y        =   nv.cropper_y;
                me.cropper_width    =   nv.cropper_width;
                me.cropper_height   =   nv.cropper_height;

                me.$nextTick().then(() => {
                    me.init_cropper();
                });
            }
        },
        file(nv, ov) {
            if (nv) {
                let reader  =   new FileReader(),
                    me      =   this;

                this.id     =   null;

                reader.onload   =   function(e)
                {
                    me.canvas           =   e.target.result;
                    me.container_x      =   0;
                    me.container_y      =   0;
                    me.container_width  =   0;
                    me.container_height =   0;
                    me.cropper_x        =   0;
                    me.cropper_y        =   0;
                    me.cropper_width    =   0;
                    me.cropper_height   =   0;
                    me.$nextTick().then(() => {
                        me.init_cropper();
                    });
                }

                reader.readAsDataURL(nv);
            }
        }
    },
    methods :   {
        delete_portrait(e) {
            if (e) {
                e.preventDefault();
            }
            this.id     =   null;
            this.canvas =   null;
            this.file   =   null;
            let me      =   this;
            this.$nextTick().then(() => {
                me.container_x      =   0;
                me.container_y      =   0;
                me.container_width  =   0;
                me.container_height =   0;
                me.cropper_x        =   0;
                me.cropper_y        =   0;
                me.cropper_width    =   0;
                me.cropper_height   =   0;
                me.init_cropper();
            });
        },
        change(e) {
            let input   =   e.target,
                me      =   this;

            if (input.files && input.files.length > 0) {
                if (input.files[0].type != 'image/png' && input.files[0].type != 'image/jpeg') {
                    this.file   =   null;
                    me.$bus.$emit('Msgbox', '仅支持png和jpg格式', null, 'danger');
                } else {
                    this.file   =   input.files[0];
                }
            }
        },
        choose_image(e) {
            e.preventDefault();
            $(this.$el).find('.file-input').click();
        },
        init_cropper() {
            let me  =   this;
            if (me.cropper) {
                me.cropper.destroy();
            }

            me.cropper = new Cropper($('.file-portrait')[0], {
                viewMode: 3,
                aspectRatio: 1,
                zoomable: true,
                cropBoxResizable: false,
                cropBoxMovable: false,
                guides: false,
                center: false,
                dragMode: 'move',
                autoCrop: false,
                autoCropArea: 1,
                toggleDragModeOnDblclick: false,
                minContainerWidth: $(me.$el).find('.file-portrait-holder').width(),
                minContainerHeight: $(me.$el).find('.file-portrait-holder').width(),
                crop(e)
                {
                    let x   =   Math.round(me.cropper.getCanvasData().left * -1),
                        y   =   Math.round(me.cropper.getCanvasData().top * -1),
                        w   =   Math.round(me.cropper.getCanvasData().width),
                        h   =   Math.round(me.cropper.getCanvasData().height),
                        cx  =   Math.round(me.cropper.getCropBoxData().left),
                        cy  =   Math.round(me.cropper.getCropBoxData().top),
                        cw  =   Math.round(me.cropper.getCropBoxData().width),
                        ch  =   Math.round(me.cropper.getCropBoxData().height);

                    me.container_x      =   x;
                    me.container_y      =   y;
                    me.container_width  =   w;
                    me.container_height =   h;
                    me.cropper_x        =   cx;
                    me.cropper_y        =   cy;
                    me.cropper_width    =   cw;
                    me.cropper_height   =   ch;
                },
                ready()
                {
                    me.cropper.setCanvasData({
                        left    :   parseInt(me.container_x),
                        top     :   parseInt(me.container_y),
                        width   :   parseInt(me.container_width),
                        height  :   parseInt(me.container_height)
                    });
                    me.cropper.crop();
                }
            });
        },
        has_changed()
        {
            if (this.file) {
                return true;
            }

            console.log({
                left    :   this.container_x,
                top     :   this.container_y,
                width   :   parseInt(this.container_width),
                height  :   parseInt(this.container_height)
            });

            if (this.source && this.container_x == this.source.container_x * -1 &&
                this.container_y == this.source.container_y * -1 &&
                this.container_width == this.source.container_width &&
                this.container_height == this.source.container_height &&
                this.cropper_x == this.source.cropper_x &&
                this.cropper_y == this.source.cropper_y &&
                this.cropper_width == this.source.cropper_width &&
                this.cropper_height == this.source.cropper_height
            ) {
                return false;
            }

            return true;
        },
        do_upload(e) {
            if (e) {
                e.preventDefault();
            }

            if (!this.has_changed()) {
                if (!e) {
                    this.$bus.$emit('onFileUploaded');
                }
                return false;
            }

            if (!this.file && !this.id) {
                if (!e) {
                    this.$bus.$emit('onFileUploaded');
                }
                return false;
            }

            if (this.is_loading) {
                return false;
            }

            this.is_loading =   true;

            let me      =   this,
                data    =   new FormData();

            data.append('csrf', csrf);
            if (this.file) {
                data.append('portrait', me.file);
            }

            data.append('portrait_data', JSON.stringify({
                id                  :   me.id,
                container_x         :   me.container_x,
                container_y         :   me.container_y,
                container_width     :   me.container_width,
                container_height    :   me.container_height,
                cropper_x           :   me.cropper_x,
                cropper_y           :   me.cropper_y,
                cropper_width       :   me.cropper_width,
                cropper_height      :   me.cropper_height
            }));

            axios.post(
                base_url + endpoints.member,
                data
            ).then((resp) => {
                me.is_loading   =   false;
                me.file         =   null;
                if (!e) {
                    me.$bus.$emit('onFileUploaded');
                }
            }).catch((error) => {
                me.is_loading   =   false;
            });
        }
    },
    created() {
        let me  =   this;
        this.$bus.$off('uploadPortrait');
        this.$bus.$on('uploadPortrait', this.do_upload);
    },
    mounted() {
        this.init_cropper();
    },
    beforeDestroy() {
        this.$bus.$off('uploadPortrait');
    }
}
</script>
<style lang="scss" scoped>

.file {
    &-label {
        display: none;
    }

    &-portrait-holder {
        background-color: #ccc;
        position: relative;
        padding-top: 100%;
        overflow: hidden;
    }

    &-portrait {
        opacity: 0;
        visibility: hidden;
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

</style>
