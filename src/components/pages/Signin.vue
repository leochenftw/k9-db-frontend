<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-6 left-col">
                    <img src="@/assets/signin-dog.png" />
                </div>
                <div class="column right-col is-4 is-offset-1" v-if="recovery">
                    <h1 class="title is-3">免密码登录</h1>
                    <p class="subtitle is-6">请输入邮箱地址获取登录凭证</p>
                    <form v-if="!retry" class="form-recovery" method="post" @submit.prevent="fake_recover">
                        <fieldset :disabled="is_loading">
                            <div class="field">
                                <div class="control">
                                    <input name="email" required type="text" :class="['input']" placeholder="电子邮箱地址" v-model="email" />
                                </div>
                                <p class="help is-danger" v-if="errors.email">请输入电子邮箱地址</p>
                            </div>
                            <div class="field">
                                <p class="has-text-right"><small><a @click.prevent="recovery = false">我还是使用密码登录吧...</a></small></p>
                            </div>
                            <div class="field">
                                <button ref="captcha" type="submit" :class="['button is-fullwidth is-primary', { 'is-loading' : is_loading }]">获取凭证</button>
                            </div>
                        </fieldset>
                    </form>
                    <p class="has-text-centered" v-else>{{retry}}秒后重试...</p>
                    <div class="column is-12 has-text-centered">
                        <p>没有登陆账号？请点这里<router-link :to="{ name: 'Signup' }">注册</router-link>。</p>
                    </div>
                </div>
                <div class="column right-col is-4 is-offset-1" v-else>
                    <h1 class="title is-3">帐号登录</h1>
                    <p class="subtitle is-6">请使用电子邮箱及密码进行登录</p>
                    <form class="form-signin" method="post" @submit="submit">
                        <fieldset :disabled="is_loading">
                            <div class="field">
                                <div class="control">
                                    <input name="email" required type="email" :class="['input']" placeholder="电子邮箱地址" v-model="email" />
                                </div>
                                <p class="help is-danger" v-if="errors.email">请输入邮箱地址</p>
                            </div>
                            <div class="field">
                                <div class="control has-icons-right">
                                    <input name="password" required :type="show_pass ? 'text' : 'password' " :class="['input', { 'is-danger' : errors.password }]" v-model="password" placeholder="密码" />
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
                                        <a class="forgot-pass" @click="recovery = true"><span class="ico"><img src="@/assets/ico-forget.svg" /></span> 免密码登录</a>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <button type="submit" :class="['button is-fullwidth is-primary', { 'is-loading' : is_loading }]">登录</button>
                            </div>
                        </fieldset>
                    </form>
                    <p class="has-text-centered">没有登陆账号？请点这里<router-link :to="{ name: 'Signup' }">注册</router-link>。</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name    :   'Signin',
    props   :   ['site_data'],
    data() {
        return  {
            smsing          :   false,
            email           :   null,
            errors          :   {
                email       :   false,
                password    :   false,
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
    watch : {
        recovery(nv, ov) {
            if (nv) {
                this.$nextTick().then(() => {
                    new TencentCaptcha(this.$refs.captcha, this.site_data.appid, this.recover);
                });
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
    methods :   {
        fake_recover(e)
        {
            if (e) {
                e.preventDefault();
            }
        },
        recover(ticket) {
            if (this.is_loading) return false;
            this.errors.email  =   false;
            if (!this.email || this.email.trim().length == 0) {
                this.errors.email  =   true;
                return false;
            }

            this.is_loading =   true;

            let me      =   this,
                data    =   new FormData();

            data.append('csrf', csrf);
            data.append('email', this.email);
            data.append('randstr', ticket.randstr);
            data.append('ticket', ticket.ticket);

            axios.post(
                base_url + endpoints.recovery,
                data
            ).then((resp) => {
                me.is_loading       =   false;
                me.retry            =   60;
                localStorage.retry  =   60;
                me.ticking_down();
                me.$bus.$emit('Msgbox', resp.data.message, { label: '好的' });
            }).catch(this.error_handler);
        },
        submit(e) {
            e.preventDefault();
            if (this.is_loading) return false;
            this.is_loading   =   true;

            let me      =   this,
                data    =   new FormData();

            data.append('csrf', csrf);
            data.append('email', this.email);
            data.append('password', this.password);

            axios.post(
                base_url + endpoints.signin,
                data
            ).then((resp) => {
                delete localStorage.retry;
                me.is_loading   =   false;
                me.$bus.$emit('triggerSessionUpdate');
                me.$router.push('/member');
            }).catch((error) => {
                me.is_loading   =   false;
                me.$bus.$emit('Msgbox', error.response.data.message, null, 'danger');
            });
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
<style lang="scss" scoped>
.section {
    .container {
        background-color: #fafafa;
        h1.title {
            color: #371c12;
            margin-bottom: 2rem;
        }
        .columns {
            &.is-marginless {
                .column {
                    padding: 0;
                }
            }
            .column {
                &.right-col {
                    padding-top: 4rem;
                    p {
                        color: #c8ac8f;
                        a {
                            color: #371c12;
                            text-decoration: underline;
                        }
                    }
                    .forgot-pass {
                        color: #c8ac8f;
                    }
                    span {
                        &.ico {
                            transform: translateY(2px);
                            display: inline-block;
                            margin-right: 0.25em;
                        }
                    }
                }

                &.left-col {
                    padding-bottom: 0;
                }

                img {
                    display: block;
                }

                form {
                    margin-bottom: 1rem;
                    .button {
                        &.is-primary {
                            background-color: #371c12;
                            border-radius: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
