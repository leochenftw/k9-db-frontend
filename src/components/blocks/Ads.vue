<template>
    <div class="promo-wrapper">
        <div class="promo container">
            <div class="columns is-marginless">
                <div class="column has-text-right">
                    <img src="@/assets/puppy.png" />
                </div>
                <div class="column">
                    <h2 class="title is-4">{{title}}</h2>
                    <div class="content" v-html="content"></div>
                    <div class="action has-text-centered">
                        <a :href="link.url" target="_blank">{{link.label}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default
{
    name    :   'Ads',
    data() {
        return  {
            title   :   '台湾工作犬训练学校',
            content :   '<p>針對狗狗的個性及主人的需求提供整套完整的訓練課程，讓您的愛犬不再是您的負擔，讓他可以融入社會、融入家庭，成為您生活的伴侶。</p>',
            link    :   {
                label   :   '了解更多',
                url     :   '#'
            }
        };
    }
}
</script>
