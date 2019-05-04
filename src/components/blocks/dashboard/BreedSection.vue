<template>
<div class="member-breed-section">
    <h2 class="title is-5">繁殖信息 <button v-if="!is_loading && list.length > 0" class="button is-info is-small" @click="$router.push('/member/breed/create');">添加犬只</button></h2>
    <p v-if="is_loading">数据加载中...</p>
    <div v-else-if="list.length == 0" class="member-breed-section__empty-result">
        <h2 class="title is-6">未找到任何繁殖信息</h2>
        <div class="content">
            <router-link :to="{ name: 'DashboardAction', params: { section: 'breed', action: 'create'} }" class="is-block has-text-centered">
                <p class="title is-1"><img src="@/assets/image-holder.png" /></p>
                <p class="subtitle is-7">您还没有发布过繁殖信息，点这里上传您的第一条信息吧~</p>
            </router-link>
        </div>
    </div>
    <div v-else class="member-breed__list columns">
        <div class="column is-3" v-for="dog in list">
            <router-link :to="{ name: 'DashboardTargetedAction', params: { section: 'breed' , action: 'edit', id: dog.id} }">{{dog.title}}</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default
{
    name        :   'BreedSection',
    data() {
        return {
            is_loading  :   true,
            list        :   []
        };
    },
    created() {
        this.get();
    },
    methods     :   {
        get() {
            axios.get(
                base_url + endpoints.dog
            ).then(this.prep);
        },
        prep(resp) {
            this.is_loading =   false;
            this.list       =   resp.data;
        }
    }
}
</script>
