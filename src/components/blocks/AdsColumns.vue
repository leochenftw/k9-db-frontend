<template>
<div class="section">
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-half" v-for="item, i in promo">
                <a class="ads-item is-block" :href="item.link.url" target="_blank">
                    <img :src="item.image.url" :alt="item.image.title" />
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default
{
    name    :   'AdsColumns',
    props   :   ['promo']
}
</script>
<style lang="scss" scoped>
.section {
    padding-top: 0;
    .ads-item {
        img {
            display: block;
        }
    }
}
</style>
