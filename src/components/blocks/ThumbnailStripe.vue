<template>
    <section class="section">
        <div class="thumbnail-stripe container">
            <h2 class="title is-4">{{title}}</h2>
            <div class="columns">
                <div class="column" v-for="i in 4">
                    <Thumbnail />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Thumbnail from './elements/Thumbnail';
export default
{
    name        :   'ThumbnailStripe',
    components  :   { Thumbnail },
    props       :   {
        title   :   {
            type    :   String,
            default :   '最新照片'
        }
    }
}
</script>
