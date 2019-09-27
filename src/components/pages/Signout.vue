<template>
    <div class="section">
        <div class="container">
            <h1 class="title is-2 has-text-centered">您即将退出登录</h1>
            <div class="content has-text-centered">
                <p>退出后您则需要重新登录.</p>
                <p><button @click="confirm" :class="['button is-large is-danger', { 'is-loading' : is_loading }]">确定</button></p>
                <p><button @click="$router.push('/member')" class="button is-text">不好意思点错了...</button></p>
            </div>
        </div>
    </div>
</template>

<script>
export default
{
    name    :   'Signout',
    props   :   ['site_data'],
    data() {
        return  {
            is_loading  :   false
        }
    },
    methods :   {
        confirm(e)  {
            e.preventDefault();
            let me          =   this,
                data        =   new FormData();

            data.append('csrf', csrf);
            this.is_loading =   true;
            axios.post(
                base_url + endpoints.signout,
                data
            ).then((resp) => {
                me.$bus.$emit('triggerSessionUpdate');
                me.$router.replace('/');
            }).catch((error) => {
                me.is_loading   =   false;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
h1.title {
    display: block !important;
}
</style>
