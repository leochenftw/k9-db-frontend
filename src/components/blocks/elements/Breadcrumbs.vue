<template>
<nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li v-for="item in items">
            <router-link :to="item.link">{{item.title}}</router-link>
        </li>
        <li class="is-active"><a aria-current="page">{{title}}</a></li>
    </ul>
</nav>
</template>

<script>
export default {
    name        :   'Breadcrumbs',
    props       :   ['items', 'title']
}
</script>
<style lang="scss" scoped>
.breadcrumb {
    margin-bottom: 3rem;
    a {
        color: #65562D;
    }
}
</style>
