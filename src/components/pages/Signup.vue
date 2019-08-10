<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-4">
                    <h1 class="title is-3">欢迎加入我爱工作犬</h1>
                    <form method="post" @submit="submit">
                        <div class="field">
                            <div class="control">
                                <input type="text" placeholder="用户名" :class="['input', { 'is-danger' : errors.username }]" v-model="username" />
                            </div>
                            <p class="help is-danger" v-if="errors.username">请输入用户名</p>
                        </div>
                        <div class="field">
                            <div class="control has-icons-right">
                                <input :type="show_pass ? 'text' : 'password' " placeholder="密码" :class="['input', { 'is-danger' : errors.password }]" v-model="password" />
                                <span @click="show_pass = !show_pass" class="icon is-small is-right enabled">
                                    <i :class="['fas', { 'fa-eye-slash' : !show_pass, 'fa-eye' : show_pass }]"></i>
                                </span>
                            </div>
                            <p class="help is-danger" v-if="errors.password">密码不能为空</p>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left">
                                <input type="text" :class="['input', { 'is-danger' : errors.mobile }]" placeholder="手机号" v-model="mobile" />
                                <span class="icon is-small is-left">
                                    +86
                                </span>
                            </div>
                            <p class="help is-danger" v-if="errors.mobile">请输入手机号码</p>
                        </div>
                        <div class="field">
                            <div class="columns">
                                <div class="column">
                                    <div class="control">
                                        <input type="text" :class="['input', { 'is-danger' : errors.validation_key }]" placeholder="验证码" v-model="validation_key" />
                                    </div>
                                    <p class="help is-danger" v-if="errors.validation_key">请输入验证码</p>
                                </div>
                                <div class="column is-narrow">
                                    <button :disabled="retry > 0 ? true : false" @click="fetch_validation_key" :class="['button is-primary', { 'is-loading' : smsing }]">
                                        <template v-if="retry <= 0">发送验证码</template>
                                        <template v-else>{{retry_in}}</template>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button type="submit" class="is-primary button is-fullwidth">注册</button>
                            </div>
                        </div>
                    </form>
                    <div class="column is-12 has-text-centered">
                        <p>已有账号？直接<router-link :to="{ name: 'Signin' }">登录</router-link>。</p>
                    </div>
                </div>
                <div class="column is-5 is-offset-3">
                    <img src="@/assets/signup-dog.png" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name    :   'Signup',
    props   :   ['site_data'],
    data() {
        return {
            show_pass       :   false,
            is_loading      :   false,
            smsing          :   false,
            member_id       :   null,
            username        :   'leochenftw',
            password        :   '110119cjj',
            mobile          :   '13122786640',
            validation_key  :   null,
            enterframe      :   null,
            retry           :   0,
            errors          :   {
                username        :   false,
                password        :   false,
                mobile          :   false,
                member_id       :   false,
                validation_key  :   false
            }
        }
    },
    created()
    {
        if (this.site_data && this.site_data.member) {
            return this.$router.replace('/member');
        }
    },
    computed    :   {
        retry_in() {
            return '重试 (' + this.retry + ')';
        }
    },
    mounted()   {
        if (localStorage && localStorage.retry != undefined && localStorage.retry != null) {
            this.retry  =   parseInt(localStorage.retry);
            this.ticking_down();
        }
    },
    methods :   {
        error_handler(error) {
            this.smsing     =   false;
            this.is_loading =   false;
            this.$bus.$emit('Msgbox', error.response.data, null, 'danger');
        },
        ticking_down() {
            let me          =   this;
            if (!this.enterframe) {
                this.enterframe =   setInterval(() => {
                    me.retry--;
                    localStorage.retry  =   me.retry;
                    if (me.retry == 0) {
                        clearInterval(this.enterframe);
                        me.enterframe       =   null;
                        me.retry            =   0;
                        localStorage.retry  =   me.retry;
                    }
                }, 1000);
            }
        },
        validate() {
            this.errors     =   {
                username        :   false,
                password        :   false,
                mobile          :   false,
                member_id       :   false,
                validation_key  :   false
            };

            if (!this.username) {
                this.errors.username        =   true;
            }

            if (!this.password) {
                this.errors.password        =   true;
            }

            if (!this.mobile) {
                this.errors.mobile          =   true;
            }

            if (!this.member_id) {
                this.errors.member_id       =   true;
            }

            if (!this.validation_key) {
                this.errors.validation_key  =   true;
            }

            for (let key in this.errors) {
                if (this.errors[key]) {
                    return false;
                }
            }

            return true;
        },
        fetch_validation_key(e) {
            e.preventDefault();

            this.errors.mobile  =   false;

            if (!this.mobile || this.mobile.trim().length == 0) {
                this.errors.mobile  =   true;
                return false;
            }

            let params  =   new URLSearchParams(),
                me      =   this;
            this.smsing =   true;
            params.append('csrf', csrf);
            params.append('mobile', this.mobile);
            this.is_loading =   true;
            axios.post(
                base_url + endpoints.signup,
                params
            ).then((resp) => {
                me.smsing           =   false;
                me.member_id        =   resp.data.member_id;
                me.retry            =   60;
                localStorage.retry  =   60;
                me.ticking_down();
                me.$bus.$emit('Msgbox', resp.data.message, { label: '好的' });
            }).catch(this.error_handler);
        },
        submit(e) {
            e.preventDefault();
            if (this.validate()) {
                let params  =   new URLSearchParams(),
                    me      =   this;

                params.append('csrf', csrf);
                params.append('username', this.username);
                params.append('password', this.password);
                params.append('mobile', this.mobile);
                params.append('member_id', this.member_id);
                params.append('validation_key', this.validation_key);

                this.is_loading =   true;
                axios.post(
                    base_url + endpoints.signup,
                    params
                ).then((resp) => {
                    me.retry            =   0;
                    delete localStorage.retry;
                    me.$bus.$emit('Msgbox', resp.data.message, { label: '前往会员中心', link: '/member' });
                }).catch(this.error_handler);
            }
        }
    }
}
</script>
