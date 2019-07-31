<template>
    <a class="thumbnail-holder is-block">
        <figure class="thumbnail">
            <img class="thumbnail__image" :src="image" alt="placeholder" width="218" height="165">
            <figcaption class="thumbnail__viewed">
                <span class="icon"><i class="fas fa-eye"></i></span> {{viewed}}
            </figcaption>
        </figure>
        <div class="thumbnail__member">
            <img src="@/assets/ico-account-lite.svg" /> <span>{{member}}</span>
        </div>
    </a>
</template>

<script>
export default
{
    name    :   'Thumbnail',
    data() {
        return  {
            image   :   require('@/assets/placeholder.png'),
            viewed  :   1024,
            member  :   '王大麻子'
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
