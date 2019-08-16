<template>
<router-link :to="item.link" :class="'dog-breed column is-' + col_size" v-if="item">
    <div class="dog-breed__core">
        <figure>
            <img :src="item.thumbnail.url" />
        </figure>
        <h3 class="title is-5">{{item.title}}</h3>
        <p class="subtitle is-7">{{item.english}}</p>
    </div>
</router-link>
</template>

<script>
export default {
    name    :   'BreedTile',
    props   :   ['item'],
    data()
    {
        return {
            col_size   :   3
        }
    },
    created()
    {
        this.$bus.$on('onWindowResize', (width) => {
            if (width <= 1024) {
                if (width <= 768) {
                    this.col_size   =   6;
                } else {
                    this.col_size   =   4;
                }
            } else {
                this.col_size   =   3;
            }
        });
    },
    beforeDestroy()
    {
        this.$bus.$off('onWindowResize');
    }
}
</script>

<style lang="scss" scoped>
.dog-breed {
    &__core {
        padding-bottom: 1.5rem;
        figure {
            display: block;
            img {
                display: block;
            }

            margin-bottom: 1rem;
        }
    }
}
</style>
