<template>
<div class="dog-details">
    <div class="dog-details__contents">
        <div class="dog-details__content" v-for="content, i in site_data.contents" v-if="content.content">
            <h2 class="title is-5" v-if="content.title">{{content.title}}</h2>
            <div class="content" v-html="content.content"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name    :   'DogDetailSection',
    props   :   ['site_data']
}
</script>

<style lang="scss" scoped>
.dog-details {
    &__content {
        padding: 2rem 2rem 2.5rem;
        border: 1px solid #f0e2d0;
        margin-bottom: 2rem;
        .title {
            display: inline-block;
            padding-bottom: 0.5em;
            border-bottom: 2px solid #c8ac8f;
        }
    }
}
</style>
