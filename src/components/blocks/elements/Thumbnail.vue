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
