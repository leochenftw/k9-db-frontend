<template>
<div class="personnel-details">
    <h1 class="title is-4" v-if="details.type == 'pro'">
        <span><img :src="require('@/assets/icon_member_profes.svg')" /></span> 技术会员
    </h1>
    <h1 class="title is-4" v-else>
        <span><img :src="require('@/assets/icon_member_profes.svg')" /></span> 普通会员
    </h1>
    <div class="columns is-mobile">
        <div class="column is-2">
            <figure v-if="details.portrait">
                <img :src="details.portrait.cropped.url" />
            </figure>
        </div>
        <div class="column" v-if="details.type == 'pro'">
            <p class="title is-4" v-if="details.nickname">{{details.nickname}}</p>
            <p class="title is-4" v-else>{{details.fullname}}</p>
            <ul class="personnel-details__breakdown columns is-mobile is-multiline">
                <li class="column is-3" v-if="details.city">
                    <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                    <template v-if="details.province == details.city">
                        {{details.city}}
                    </template>
                    <template v-else>
                        {{details.province}} {{details.city}}
                    </template>
                </li>
                <li class="column is-3" v-if="details.occupation">
                    <span class="icon"><i class="fas fa-id-card-alt"></i></span> {{details.occupation}}
                </li>
                <li class="column is-3" v-if="details.mobile">
                    <span class="icon"><i class="fas fa-phone-alt"></i></span> {{details.mobile}}
                </li>
                <li class="column is-3" v-if="details.resume">
                    <a :href="details.resume.link" download><span class="icon"><i class="fas fa-download"></i></span> 下载简历</a>
                </li>
                <li class="column is-3">
                    <span class="icon"><i class="fas fa-stamp"></i></span> 资质认证: <template v-if="details.cert">是</template><template v-else>否</template>
                </li>
                <li class="column is-3" v-if="details.years">
                    <span class="icon"><i class="fas fa-hourglass-half"></i></span> {{details.years}}年从业资格
                </li>
                <li class="column is-3" v-else><span class="icon"><i class="fas fa-hourglass-half"></i></span> 暂无业龄信息</li>
                <li class="column is-3" v-if="details.wechat">
                    <span class="icon"><i class="fab fa-weixin"></i></span> {{details.wechat}}
                </li>
            </ul>
        </div>
    </div>
    <div class="tabs is-large">
        <ul>
            <li :class="{'is-active' : current_tab == 'puppy'}"><a @click.prevent="current_tab = 'puppy'">幼犬信息</a></li>
            <li :class="{'is-active' : current_tab == 'breed'}"><a @click.prevent="current_tab = 'breed'">繁殖信息</a></li>
            <li :class="{'is-active' : current_tab == 'photo'}"><a @click.prevent="current_tab = 'photo'">照片展示</a></li>
            <li :class="{'is-active' : current_tab == 'video'}"><a @click.prevent="current_tab = 'video'">视频展示</a></li>
        </ul>
    </div>
    <div v-if="current_tab == 'puppy'" class="columns">
        <div class="column is-one-fifth" v-for="item, i in details.dogs">
            <DogTile :dog="item" :key="i" />
        </div>
    </div>
    <div v-if="current_tab == 'photo'" class="columns">
        <div class="column is-one-fifth" v-for="item, i in details.photos">
            <DogTile :show_icon="false" :dog="item" :key="i" />
        </div>
    </div>
    <div v-if="current_tab == 'video'" class="columns">
        <div class="column is-half" v-for="item, i in details.videos">
            <VideoTile :key="i" :source="item" />
        </div>
    </div>
</div>
</template>

<script>

import DogTile from './elements/DogTile';
import VideoTile from './elements/VideoTile';
export default {
    name        :   'MemberDetails',
    props       :   ['details'],
    components  :   { DogTile, VideoTile },
    data() {
        return {
            current_tab :   'puppy'
        }
    }
}
</script>

<style lang="scss" scoped>
.personnel-details {
    &__breakdown {
        li {
            color: #371c12;
            a {
                color: #371c12;
            }
            .icon {
                color: #9b6944;
            }
        }
    }

    .tabs {
        ul {
            border-bottom: 1px solid #f0e2d0;
            li {
                a {
                    color: #a3673c;
                    &:hover {
                        border-bottom-color: #a3673c;
                    }
                }

                &.is-active {
                    a {
                        color: #a3673c;
                        font-weight: bold;
                        border-bottom-color: #a3673c;
                    }
                }
            }
        }
    }
}
</style>
