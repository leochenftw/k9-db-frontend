<template>
    <Thumbnail
        :image="dog.cover ? dog.cover.thumb : require('@/assets/placeholder-sq.png')"
        :title="dog.title ? dog.title : '无标题'"
        :show_icon="show_icon"
    />
</template>

<script>
import Thumbnail from './Thumbnail';
export default {
    name        :   'DogTile',
    props       :   ['dog', 'show_icon'],
    components  :   { Thumbnail }
}
</script>

<style lang="scss" scoped>
</style>
