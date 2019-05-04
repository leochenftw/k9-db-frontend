<template>
<form method="post" class="search-field">
    <div class="control">
        <input class="input" type="text" placeholder="搜索任何你需要的信息...." />
    </div>
    <button type="submit" :class="['button', { 'is-loading' : is_loading }]">
        <span class="icon"><i class="fas fa-search"></i></span>
    </button>
</form>
</template>

<script>
export default {
    name: 'SearchField',
    data() {
        return {
            is_loading  :   false
        };
    }
}
</script>
<style lang="scss" scoped>
.search-field {
    position: relative;
    .input {
        padding-right: 44px;
    }
    .button {
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>
