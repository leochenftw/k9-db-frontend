<template>
<div class="breed-carousel__item__content section" v-if="item.dog_head">
    <div class="container">
        <div class="columns">
            <figure class="column is-6 has-text-centered">
                <img :src="item.dog_head.url" />
            </figure>
            <div class="column is-5 col-right">
                <h2 class="title is-3">{{item.title}}</h2>
                <div class="content" v-html="item.content"></div>
                <div class="call-to-action" v-if="show_link">
                    <router-link :to="item.link" class="button is-brown">查看详情</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
<router-link :to="item.link" class="breed-carousel__item__content full-image" v-else-if="show_link" :style="'background-image: url(' + item.image.url + ');'">
    <h2 class="title is-3 has-text-centered">{{item.title}}</h2>
</router-link>
<div class="breed-carousel__item__content full-image" v-else :style="'background-image: url(' + item.image.url + ');'">
    <h2 class="title is-3 has-text-centered">{{item.title}}</h2>
</div>
</template>

<script>
export default {
    name        :   'DogHero',
    props       :   ['item', 'show_link']
}
</script>

<style lang="scss" scoped>
.breed-carousel {
    &__item {
        &__content {
            background: #f7f7f7; /* Old browsers */
            background: -moz-linear-gradient(left,  #f7f7f7 15%, #f7f7f7 15%, #d4d1ce 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left,  #f7f7f7 15%,#f7f7f7 15%,#d4d1ce 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right,  #f7f7f7 15%,#f7f7f7 15%,#d4d1ce 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f7f7', endColorstr='#d4d1ce',GradientType=1 ); /* IE6-9 */
            .column {
                &.col-right {
                    padding-top: 48px;
                    .title {
                        margin-bottom: 36px;
                    }

                    .content {
                        margin-bottom: 48px;
                    }
                }
            }

            &.full-image {
                height: 100%;
                display: block;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                position: relative;
                .title {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 480px;
                    padding: 1rem 2rem;
                    background: -moz-linear-gradient(left,  rgba(247,247,247,0) 0%, rgba(247,247,247,0.24) 15%, rgba(212,209,206,0.8) 50%, rgba(247,247,247,0) 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(left,  rgba(247,247,247,0) 0%,rgba(247,247,247,0.24) 15%,rgba(212,209,206,0.8) 50%,rgba(247,247,247,0) 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(to right,  rgba(247,247,247,0) 0%,rgba(247,247,247,0.24) 15%,rgba(212,209,206,0.8) 50%,rgba(247,247,247,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00f7f7f7', endColorstr='#00f7f7f7',GradientType=1 ); /* IE6-9 */
                }
            }
        }
    }
}

div.breed-carousel__item__content.full-image {
    padding-top: 36%;
}
</style>
