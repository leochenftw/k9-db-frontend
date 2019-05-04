<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <img src="@/assets/signin-dog.png" />
                </div>
                <div class="column is-4" v-if="recovery">
                    <h1 class="title is-3">重置密码</h1>
                    <p class="subtitle is-6">请输入注册手机号并获取验证码</p>
                    <form class="form-recovery" method="post" @submit="recover">
                        <div class="field">
                            <div class="control has-icons-left">
                                <input name="mobile" required type="text" :class="['input']" placeholder="手机号" v-model="mobile" />
                                <span class="icon is-small is-left">+86</span>
                            </div>
                            <p class="help is-danger" v-if="errors.mobile">请输入手机号码</p>
                        </div>
                        <div class="field">
                            <div class="columns">
                                <div class="column">
                                    <div class="control">
                                        <input required type="text" :class="['input', { 'is-danger' : errors.validation_key }]" placeholder="验证码" v-model="validation_key" />
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
                        <transition name="fade">
                            <div class="field" v-if="member_id">
                                <div class="control has-icons-left has-icons-right">
                                    <input name="password" required placeholder="请输入新密码" :type="show_pass ? 'text' : 'password' " :class="['input', { 'is-danger' : errors.password }]" v-model="password" />
                                    <span class="icon is-small is-left">密码</span>
                                    <span @click="show_pass = !show_pass" class="icon is-small is-right enabled">
                                        <i :class="['fas', { 'fa-eye-slash' : !show_pass, 'fa-eye' : show_pass }]"></i>
                                    </span>
                                </div>
                                <p class="help is-danger" v-if="errors.password">密码不能为空</p>
                            </div>
                        </transition>
                        <div class="field">
                            <p><small><a @click="recovery = false">我想起密码了, 我要直接登录</a></small></p>
                        </div>
                        <div class="field">
                            <button type="submit" :class="['button is-fullwidth is-primary', { 'is-loading' : is_loading }]">提交</button>
                        </div>
                    </form>
                    <div class="column is-12 has-text-centered">
                        <p>没有登陆账号？请点这里<router-link :to="{ name: 'Signup' }">注册</router-link>。</p>
                    </div>
                </div>
                <div class="column is-4" v-else>
                    <h1 class="title is-3">Welcome!</h1>
                    <p class="subtitle is-6">请使用手机号及密码进行登录</p>
                    <form class="form-signin" method="post" @submit="submit">
                        <div class="field">
                            <div class="control has-icons-left">
                                <input name="mobile" required type="text" :class="['input']" placeholder="手机号" v-model="mobile" />
                                <span class="icon is-small is-left">+86</span>
                            </div>
                            <p class="help is-danger" v-if="errors.mobile">请输入手机号码</p>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <input name="password" required :type="show_pass ? 'text' : 'password' " :class="['input', { 'is-danger' : errors.password }]" v-model="password" />
                                <span class="icon is-small is-left">密码</span>
                                <span @click="show_pass = !show_pass" class="icon is-small is-right enabled">
                                    <i :class="['fas', { 'fa-eye-slash' : !show_pass, 'fa-eye' : show_pass }]"></i>
                                </span>
                            </div>
                            <p class="help is-danger" v-if="errors.password">密码不能为空</p>
                        </div>
                        <div class="field">
                            <div class="columns is-marginless">
                                <div class="column">
                                    <label class="checkbox">
                                        <input name="remember" v-model="remember" type="checkbox"> 记住我
                                    </label>
                                </div>
                                <div class="column has-text-right">
                                    <a @click="recovery = true"><span class="ico"><img src="@/assets/ico-forget.svg" /></span> 忘记密码</a>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <button type="submit" :class="['button is-fullwidth is-primary', { 'is-loading' : is_loading }]">登录</button>
                        </div>
                    </form>
                    <div class="column is-12 has-text-centered">
                        <p>没有登陆账号？请点这里<router-link :to="{ name: 'Signup' }">注册</router-link>。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name    :   'Signin',
    data() {
        return  {
            smsing          :   false,
            errors          :   {
                mobile          :   false,
                validation_key  :   false
            },
            validation_key  :   null,
            is_loading      :   false,
            remember        :   true,
            mobile          :   null,
            password        :   null,
            show_pass       :   false,
            retry           :   0,
            recovery        :   false,
            member_id       :   null
        }
    },
    computed    :   {
        retry_in() {
            return '重试 (' + this.retry + ')';
        }
    },
    methods :   {
        recover(e) {
            e.preventDefault();

            this.errors.mobile  =   false;

            if (!this.mobile || this.mobile.trim().length == 0) {
                this.errors.mobile  =   true;
                return false;
            }

            let me      =   this,
                data    =   new FormData($(this.$el).find('.form-signin')[0]);

            data.append('csrf', csrf);
            data.append('member_id', this.member_id);
            data.append('mobile', this.mobile);
            data.append('password', this.password);
            data.append('validation_key', this.validation_key);
            me.is_loading   =   true;

            this.is_loading =   true;
            axios.post(
                base_url + endpoints.recovery,
                data
            ).then((resp) => {
                me.retry            =   0;
                delete localStorage.retry;
                me.$bus.$emit('triggerSessionUpdate');
                me.$bus.$emit('Msgbox', resp.data.message, { label: '前往会员中心', link: '/member' });
            }).catch(this.error_handler);
        },
        submit(e) {
            e.preventDefault();
            let me      =   this,
                data    =   new FormData($(this.$el).find('.form-signin')[0]);

            data.append('csrf', csrf);
            me.is_loading   =   true;

            axios.post(
                base_url + endpoints.signin,
                data
            ).then((resp) => {
                me.is_loading   =   false;
                me.$bus.$emit('triggerSessionUpdate');
                me.$router.push('/member');
            }).catch((error) => {
                me.is_loading   =   false;
                me.$bus.$emit('Msgbox', error.response.data, null, 'danger');
            });
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
            axios.post(
                base_url + endpoints.recovery,
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
        }
    }
}
</script>
