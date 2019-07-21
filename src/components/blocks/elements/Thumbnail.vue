<template>
    <a class="thumbnail-holder is-block">
        <figure class="thumbnail">
            <img class="thumbnail__image" :src="image" alt="placeholder" width="218" height="165">
            <figcaption class="thumbnail__viewed">
                <span class="icon"><i class="fas fa-eye"></i></span> {{viewed}}
            </figcaption>
        </figure>
        <div class="thumbnail__member">
            <img src="@/assets/ico-account.svg" /> {{member}}
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
            border: 1px solid #c1a284;
            display: flex;
            justify-content: center;
            flex-direction: column;
            /*padding-top: 0.75rem;*/
            .thumbnail__image {
                margin: auto;
                width: 100%;
                padding: 0.5rem;
            }
            .thumbnail__viewed {
                text-align: right;
                padding:0 0.5rem;
                color: #c1a284;
            }
        }
        .thumbnail__member {
            color: #c1a284;
            padding:0.25rem 0.5rem;
        }
    }
</style>
