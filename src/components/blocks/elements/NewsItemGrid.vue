<template>
    <router-link :to="source.link.url" v-if="source" :class="['newsitem column', grid_size]">
        <div class="columns is-variable is-1">
            <figure class="column">
                <img :src="source.image" :alt="source.title" />
            </figure>
            <div class="column">
                <h3 class="newsitem__title title is-5">{{source.title}}</h3>
                <p class="newsitem__subtitle subtitle is-7">{{source.date}}</p>
                <div class="newsitem__content content" v-html="source.content"></div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default
{
    name    :   'NewsItemGrid',
    props   :   [ 'source', 'grid_size' ]
}
</script>
<style lang="scss" scoped>
.newsitem {
    div.column {
        .newsitem {
            &__title {
                margin-top: 12px;
            }
            &__title,
            &__content {
                color: #6a6b73;
                font-size: 14px;
            }

            &__subtitle {
                margin-bottom: 0.5rem;
            }
        }
    }
}
</style>
