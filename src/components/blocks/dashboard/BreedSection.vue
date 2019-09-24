<template>
<div class="member-breed-section">
    <h2 class="title is-5">犬只管理 <button v-if="!is_loading && list.length > 0" class="button is-info is-small" @click="$router.push('/member/breed/create');">添加犬只</button></h2>
    <p v-if="is_loading">数据加载中...</p>
    <div v-else-if="list.length == 0" class="member-breed-section__empty-result">
        <h2 class="title is-6">未找到任何犬只信息</h2>
        <div class="content">
            <router-link :to="{ name: 'DashboardAction', params: { section: 'breed', action: 'create'} }" class="is-block has-text-centered">
                <p class="title is-1"><img src="@/assets/image-holder.png" /></p>
                <p class="subtitle is-7">您还没有发布过犬只信息，点这里上传您的第一条信息吧~</p>
            </router-link>
        </div>
    </div>
    <div v-else class="member-breed__list">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>犬名字</th>
                    <th>品种</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>繁殖发布</th>
                    <th>幼犬发布</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dog in list">
                    <td>{{dog.title}}</td>
                    <td>{{dog.breed ? dog.breed : '未知'}}</td>
                    <td>{{dog.sex}}</td>
                    <td>{{dog.dob}}</td>
                    <td><span :class="['button is-small', {'is-success': dog.breed_notice}]">{{dog.breed_notice ? '发布中' : '未发布'}}</span></td>
                    <td><span :class="['button is-small', {'is-success': dog.trade_notice}]">{{dog.trade_notice ? '发布中' : '未发布'}}</span></td>
                    <td><router-link :to="{ name: 'DashboardTargetedAction', params: { section: 'breed' , action: 'edit', id: dog.id} }">查看</router-link></td>
                </tr>
            </tbody>
        </table>
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
