<template>
<div class="section">
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-half" v-for="item, i in promo">
                <a class="is-block" :href="item.link.url" target="_blank">
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
