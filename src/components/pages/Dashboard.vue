<template>
<transition name="fade">
    <div class="section" v-if="checked">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <aside class="menu">
                        <ul class="menu-list">
                            <li>
                                <router-link :to="{ path: '/member'}">
                                    <span class="ico"><img src="@/assets/ico-account.svg" /></span>用户信息
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ path: '/member/security'}">
                                    <span class="ico"><img src="@/assets/ico-security.svg" /></span>账户安全
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ path: '/member/breed'}">
                                    <span class="ico"><img src="@/assets/ico-breed.svg" /></span>繁殖信息
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ path: '/member/video'}">
                                    <span class="ico"><img src="@/assets/ico-video.svg" /></span>视频
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ path: '/member/photo'}">
                                    <span class="ico"><img src="@/assets/ico-photo.svg" /></span>照片
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'Signout'}">
                                    <span class="ico"><img src="@/assets/ico-logout.svg" /></span>退出
                                </router-link>
                            </li>
                        </ul>
                    </aside>
                </div>
                <div class="column">
                    <h1 :class="['title is-4', member_type]">
                        <template v-if="member_type == 'normal'"><span class="ico"><img src="@/assets/icon_member_general.svg" /></span>普通会员 <button class="button is-outlined is-success is-small"><span class="icon"><i class="fas fa-arrow-up"></i></span> 成为技术会员</button></template>
                        <template v-else><span class="ico"><img src="@/assets/icon_member_profes.svg" /></span>技术会员</template>
                    </h1>
                    <div class="form-container">
                        <transition name="fade">
                            <FormBasic :member_type="member_type" v-if="$route.fullPath == '/member'" />
                        </transition>
                        <transition name="fade">
                            <FormPassword v-if="$route.fullPath == '/member/security'" />
                        </transition>
                        <transition name="fade">
                            <BreedSection v-if="$route.fullPath == '/member/breed'" />
                        </transition>
                        <transition name="fade">
                            <FormPuppy v-if="is_puppy_form" />
                        </transition>
                        <transition name="fade">
                            <PhotoSection v-if="$route.fullPath == '/member/photo'" />
                        </transition>
                        <transition name="fade">
                            <VideoSection v-if="$route.fullPath == '/member/video'" />
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import FormBasic from '@/components/blocks/dashboard/FormBasic';
import FormPassword from '@/components/blocks/dashboard/FormPassword';
import BreedSection from '@/components/blocks/dashboard/BreedSection';
import FormPuppy from '@/components/blocks/dashboard/FormPuppy';
import PhotoSection from '@/components/blocks/dashboard/PhotoSection';
import VideoSection from '@/components/blocks/dashboard/VideoSection';
export default {
    name        : 'Dashboard',
    components  :   { FormBasic, BreedSection, FormPassword, FormPuppy, PhotoSection, VideoSection },
    data() {
        return {
            member_type :   'normal',
            checked     :   false
        }
    },
    watch   :   {
        $route(to, from) {
            this.check_member();
        }
    },
    computed    :   {
        is_puppy_form() {
            return this.$route.params.section && this.$route.params.section == 'breed' && this.$route.params.action;
        }
    },
    methods :   {
        prep(resp) {
            let me  =   this;
            this.member_type    =   resp.data.type;
            this.checked        =   true;
            this.$nextTick().then(() => {
                me.$bus.$emit('onMembercheckedout', resp);
            });
        },
        error_handler(error) {
            this.$bus.$emit('Msgbox', error.response.data.message, { label: '前往登录页面', link: '/signin'}, 'danger');
        },
        check_member() {
            axios.get(base_url + endpoints.member)
            .then(this.prep).catch(this.error_handler);
        }
    },
    created() {
        this.check_member();
    }
}
</script>
<style lang="scss">
.form-container {
    position: relative;
}

.cropper {
  &-container {
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    touch-action: none;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      display: block;
      height: 100%;
      image-orientation: 0deg;
      max-height: none !important;
      max-width: none !important;
      min-height: 0 !important;
      min-width: 0 !important;
      width: 100%;
    }
  }

  &-wrap-box,
  &-canvas,
  &-drag-box,
  &-crop-box,
  &-modal {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &-wrap-box,
  &-canvas {
    overflow: hidden;
  }

  &-drag-box {
    background-color: #fff;
    opacity: 0;
  }

  &-modal {
    background-color: #000;
    opacity: .5;
  }

  &-view-box {
    display: block;
    height: 100%;
    // outline-color: rgba(51, 153, 255, 0.75);
    // outline: 1px solid #39f;
    overflow: hidden;
    width: 100%;
    border-radius: 50%;
    border: 1px solid #39f;
  }

  &-dashed {
    border: 0 dashed #eee;
    display: block;
    opacity: .5;
    position: absolute;

    &.dashed-h {
      border-bottom-width: 1px;
      border-top-width: 1px;
      height: calc(100% / 3);
      left: 0;
      top: calc(100% / 3);
      width: 100%;
    }

    &.dashed-v {
      border-left-width: 1px;
      border-right-width: 1px;
      height: 100%;
      left: calc(100% / 3);
      top: 0;
      width: calc(100% / 3);
    }
  }

  &-center {
    display: block;
    height: 0;
    left: 50%;
    opacity: .75;
    position: absolute;
    top: 50%;
    width: 0;

    &:before,
    &:after {
      background-color: #eee;
      content: ' ';
      display: block;
      position: absolute;
    }

    &:before {
      height: 1px;
      left: -3px;
      top: 0;
      width: 7px;
    }

    &:after {
      height: 7px;
      left: 0;
      top: -3px;
      width: 1px;
    }
  }

  &-face,
  &-line,
  &-point {
    display: block;
    height: 100%;
    opacity: .1;
    position: absolute;
    width: 100%;
    border-radius: 50%;
    overflow: hidden;
  }

  &-face {
    background-color: #fff;
    left: 0;
    top: 0;
  }

  &-line {
    background-color: #39f;

    &.line-e {
      cursor: ew-resize;
      right: -3px;
      top: 0;
      width: 5px;
    }

    &.line-n {
      cursor: ns-resize;
      height: 5px;
      left: 0;
      top: -3px;
    }

    &.line-w {
      cursor: ew-resize;
      left: -3px;
      top: 0;
      width: 5px;
    }

    &.line-s {
      bottom: -3px;
      cursor: ns-resize;
      height: 5px;
      left: 0;
    }
  }

  &-point {
    background-color: #39f;
    height: 5px;
    opacity: .75;
    width: 5px;

    &.point-e {
      cursor: ew-resize;
      margin-top: -3px;
      right: -3px;
      top: 50%;
    }

    &.point-n {
      cursor: ns-resize;
      left: 50%;
      margin-left: -3px;
      top: -3px;
    }

    &.point-w {
      cursor: ew-resize;
      left: -3px;
      margin-top: -3px;
      top: 50%;
    }

    &.point-s {
      bottom: -3px;
      cursor: s-resize;
      left: 50%;
      margin-left: -3px;
    }

    &.point-ne {
      cursor: nesw-resize;
      right: -3px;
      top: -3px;
    }

    &.point-nw {
      cursor: nwse-resize;
      left: -3px;
      top: -3px;
    }

    &.point-sw {
      bottom: -3px;
      cursor: nesw-resize;
      left: -3px;
    }

    &.point-se {
      bottom: -3px;
      cursor: nwse-resize;
      height: 20px;
      opacity: 1;
      right: -3px;
      width: 20px;

      @media (min-width: 768px) {
        height: 15px;
        width: 15px;
      }

      @media (min-width: 992px) {
        height: 10px;
        width: 10px;
      }

      @media (min-width: 1200px) {
        height: 5px;
        opacity: .75;
        width: 5px;
      }
    }

    &.point-se:before {
      background-color: #39f;
      bottom: -50%;
      content: ' ';
      display: block;
      height: 200%;
      opacity: 0;
      position: absolute;
      right: -50%;
      width: 200%;
    }
  }

  &-invisible {
    opacity: 0;
  }

  &-bg {
    background-image: url('../../assets/bg.png');
  }

  &-hide {
    display: block;
    height: 0;
    position: absolute;
    width: 0;
  }

  &-hidden {
    display: none !important;
  }

  &-move {
    cursor: move;
  }

  &-crop {
    cursor: crosshair;
  }

  &-disabled &-drag-box,
  &-disabled &-face,
  &-disabled &-line,
  &-disabled &-point {
    cursor: not-allowed;
  }
}
</style>
