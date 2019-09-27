<template>
<div class="personnel-section" v-if="members">
    <h2 class="title is-4" v-if="title"><span>{{title}}</span> <router-link v-if="more_link" :to="more_link">更多</router-link></h2>
    <div class="columns">
        <div class="column" v-for="item, i in members">
            <Thumbnail
                :image="item.portrait ? item.portrait.url : require('@/assets/placeholder.png')"
                :viewed="item.viewed"
                :title="item.nickname"
                :link="item.link"
            />
        </div>
        <div v-if="6 > members.length" class="column" v-for="i in (6 - members.length)">
            <Thumbnail />
        </div>
    </div>
</div>
</template>

<script>
import Thumbnail from './elements/Thumbnail';
export default {
    name        :   'PersonnelSection',
    props       :   ['title', 'more_link', 'members'],
    components  :   { Thumbnail }
}
</script>

<style lang="scss" scoped>
h2.title {
    margin-bottom: 24px;
    border-bottom: 1px solid #f0e2d0;
    position: relative;
    span {
        padding-bottom: 24px;
        display: inline-block;
        position: relative;
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            height: 2px;
            width: 100%;
            background-color: #a3673c;
            left: 0;
        }
    }

    a {
        display: block;
        position: absolute;
        right: 1rem;
        font-size: 1rem;
        color: #371c12;
        top: 0.5em;
    }
}
</style>
