<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column left-col is-4 is-offset-1">
                    <h1 class="title is-5">欢迎加入我爱工作犬</h1>
                    <form method="post" @submit.prevent="prevented_submit">
                        <fieldset :disabled="is_loading">
                            <div class="field">
                                <div class="control">
                                    <input type="email" placeholder="电子邮箱地址" :class="['input', { 'is-danger' : errors.email }]" v-model="email" />
                                </div>
                                <p class="help is-danger" v-if="errors.email">请输入电子邮箱地址</p>
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
                                <div class="control">
                                    <button ref="captcha" type="submit" :class="['is-primary button is-fullwidth', {'is-loading': is_loading}]">注册</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <p class="has-text-centered">已有账号？直接<router-link :to="{ name: 'Signin' }">登录</router-link>。</p>
                </div>
                <div class="column right-col is-4 is-offset-2">
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
            email           :   'leo.chen@cita.org.nz',
            validation_key  :   null,
            enterframe      :   null,
            retry           :   0,
            errors          :   {
                email       :   false,
                password    :   false
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

        this.$nextTick().then(() => {
            new TencentCaptcha(this.$refs.captcha, this.site_data.appid, this.submit);
        });
    },
    methods :   {
        error_handler(error) {
            this.smsing     =   false;
            this.is_loading =   false;
            this.$bus.$emit('Msgbox', error.response.data.message, null, 'danger');
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
            this.errors.email       =   false;
            this.errors.password    =   false;

            if (!this.email) {
                this.errors.email   =   true;
            }

            if (!this.password) {
                this.errors.password    =   true;
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
        prevented_submit(e)
        {
            e.preventDefault();
        },
        submit(ticket) {
            if (this.is_loading) return false;
            this.is_loading =   true;
            let data    =   new FormData(),
                me      =   this;

            data.append('csrf', csrf);
            data.append('email', this.email);
            data.append('password', this.password);
            data.append('randstr', ticket.randstr);
            data.append('ticket', ticket.ticket);

            axios.post(
                base_url + endpoints.signup,
                data
            ).then((resp) => {
                this.is_loading =   false;
                this.$bus.$emit('Msgbox', resp.data.message, { label: '好的' });
                this.$router.push('/member');
            }).catch((error) => {
                this.$bus.$emit('Msgbox', error.response.data.message, { label: '前往登录', link: '/signin' }, 'danger', {label: '更换邮箱'});
                this.is_loading =   false;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.section {
    .container {
        h1.title {
            color: #371c12;
            margin-bottom: 2rem;
        }
        /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#d0cfcd+0,f6f6f4+100 */
        background: #d0cfcd; /* Old browsers */
        background: -moz-linear-gradient(left,  #d0cfcd 0%, #f6f6f4 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #d0cfcd 0%,#f6f6f4 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #d0cfcd 0%,#f6f6f4 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d0cfcd', endColorstr='#f6f6f4',GradientType=1 ); /* IE6-9 */
        .columns {
            .column {
                &.left-col {
                    padding-top: 4rem;
                    p {
                        color: #c8ac8f;
                        a {
                            color: #371c12;
                            text-decoration: underline;
                        }
                    }
                }

                &.right-col {
                    padding-top: 6rem;
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
