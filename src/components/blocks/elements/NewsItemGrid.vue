<template>
    <div v-if="source" :class="['newsitem column', grid_size]">
        <div class="columns is-variable is-1">
            <figure class="column">
                <img :src="source.image" :alt="source.title" />
            </figure>
            <div class="column">
                <h3 class="newsitem_title title is-5">{{source.title}}</h3>
                <p class="newsitem_subtitle subtitle is-7">{{source.date}}</p>
                <div class="newsitem_content content" v-html="source.content"></div>
                <div class="newsitem_action">
                    <router-link :to="source.link.url">{{source.link.label}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default
{
    name    :   'NewsItemGrid',
    props   :   [ 'source', 'grid_size' ]
}
</script>
