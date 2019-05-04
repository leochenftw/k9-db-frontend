<template >
<form id="member-pass-form" method="post" @submit="submit">
    <fieldset class="field" :disabled="is_loading">
        <div class="field">
            <label cass="label">原始密码</label>
            <div class="control">
                <input type="password" class="input" v-model="cur_pass" />
            </div>
            <p class="help is-danger" v-if="cur_missing">请输入当前密码!</p>
        </div>
        <div class="field">
            <label cass="label">新密码</label>
            <div class="control">
                <input type="password" class="input" v-model="new_pass" />
            </div>
            <p class="help is-danger" v-if="missing_new">请输入新密码</p>
        </div>
        <div class="field">
            <label cass="label">确认新密码</label>
            <div class="control">
                <input type="password" class="input" v-model="repass" />
            </div>
            <p class="help is-danger" v-if="missing_re">请再次输入新密码</p>
            <p class="help is-danger" v-else-if="pass_match === false">密码不匹配. 请重新输入</p>
        </div>
    </fieldset>
    <div class="actions field is-grouped is-grouped-right">
        <p class="control">
            <button type="submit" class="button is-primary">提交</button>
        </p>
    </div>
</form>
</template>

<script>
export default
{
    name        :   'FormPassword',
    data() {
        return  {
            cur_pass    :   null,
            new_pass    :   null,
            repass      :   null,
            is_loading  :   false,
            cur_missing :   false,
            missing_new :   false,
            missing_re  :   false
        };
    },
    computed    :   {
        pass_match() {
            if (this.new_pass && this.repass && this.new_pass.length > 0 && this.repass.length > 0) {
                return this.new_pass == this.repass;
            }

            return null;
        }
    },
    methods     :   {
        submit(e) {
            e.preventDefault();

            if (!this.new_pass && !this.cur_pass && !this.repass) return false;

            this.cur_missing    =   false;
            this.missing_new    =   false;
            this.missing_re     =   false;

            if (this.pass_match === false) {
                return false;
            }

            if (!this.cur_pass || this.cur_pass.length == 0) {
                this.cur_missing    =   true;
                return false;
            }

            if (!this.new_pass || this.new_pass.length == 0) {
                this.missing_new    =   true;
                return false;
            }

            if (!this.repass || this.repass.length == 0) {
                this.missing_re     =   true;
                return false;
            }

            if (this.is_loading) return false;
            this.is_loading =   true;

            let me      =   this,
                data    =   new FormData();
            data.append('cur_pass', this.cur_pass);
            data.append('new_pass', this.new_pass);
            axios.post(
                base_url + endpoints.password + '/update_pass',
                data
            ).then((resp) => {
                me.is_loading   =   false;
                me.cur_pass     =   null;
                me.new_pass     =   null;
                me.repass       =   null;
                this.$bus.$emit('Msgbox', '密码已经更改!', null, 'success');
            }).catch((error) => {
                me.is_loading   =   false;
                this.$bus.$emit('Msgbox', me.translate(error.response.data.message), null, 'danger');
            });
        },
        translate(str) {
            switch (str) {
                case 'Password is too short, it must be 8 or more characters long':
                    str =   '密码长度需要至少8位!';
                    break;
                default:
                    str =   str;
            }

            return str;
        }
    }
}
</script>

<style lang="scss" scoped></style>
