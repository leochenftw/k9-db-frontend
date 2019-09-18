<template>
<router-link v-if="link" :to="link" class="thumbnail-holder is-block">
    <figure class="thumbnail">
        <img class="thumbnail__image" :src="image" alt="placeholder" width="218" height="165">
        <figcaption class="thumbnail__viewed">
            <span class="icon"><i class="fas fa-eye"></i></span> {{viewed}}
        </figcaption>
    </figure>
    <div class="thumbnail__member">
        <img v-if="show_icon" src="@/assets/ico-account-lite.svg" /> <span>{{title}}</span>
    </div>
</router-link>
<a v-else class="thumbnail-holder is-block">
    <figure class="thumbnail">
        <img class="thumbnail__image" :src="image" alt="placeholder" width="218" height="165">
        <figcaption class="thumbnail__viewed">
            <span class="icon"><i class="fas fa-eye"></i></span> {{viewed}}
        </figcaption>
    </figure>
    <div class="thumbnail__member">
        <img v-if="show_icon" src="@/assets/ico-account-lite.svg" /> <span>{{title}}</span>
    </div>
</a>
</template>

<script>
export default
{
    name    :   'Thumbnail',
    props   :   {
        image   :   {
            type    :   String,
            default :   require('@/assets/placeholder.png')
        },
        viewed  :   {
            type    :   Number,
            default :   1024
        },
        title  :   {
            type    :   String,
            default :   '图片名称'
        },
        link    :   {
            type    :   String,
            default :   undefined
        },
        show_icon   :   {
            type    :   Boolean,
            default :   true
        }
    }
}
</script>
<style lang="scss" scoped>

    .thumbnail-holder {
        .thumbnail {
            display: block;
            border: 1px solid #c1a284;
            padding: 7px;
            margin-bottom: 8px;
            &__image {
                width: 100%;
            }
            &__viewed {
                text-align: right;
                color: #c8ac8f;
            }

            &__member {
                color: #371c12;
                img {
                    transform: translateY(3px);
                }
            }
        }
    }
</style>
