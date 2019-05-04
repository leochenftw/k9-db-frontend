<template>
<form id="member-basic-form" method="post" @submit="submit" enctype="multipart/form-data">
    <PortraitUploader :source="portrait" />
    <div class="columns is-mobile is-multiline">
        <div class="column is-4">
            <label class="label">姓名</label>
            <div class="control">
                <input type="text" class="input" v-model="fullname" />
            </div>
        </div>
        <div class="column is-4">
            <label class="label">昵称</label>
            <div class="control">
                <input type="text" class="input" v-model="nickname" />
            </div>
        </div>
        <div class="column is-4">
            <label class="label">手机</label>
            <div class="control">
                <input type="text" class="input" v-model="mobile" />
            </div>
        </div>
        <div class="column is-4">
            <label class="label">身份证号</label>
            <div class="control">
                <input type="text" class="input" v-model="identity" />
            </div>
        </div>
        <div class="column is-4">
            <label class="label">微信号</label>
            <div class="control">
                <input type="text" class="input" v-model="wechat" />
            </div>
        </div>
        <div class="column is-4">
            <label class="label">邮箱</label>
            <div class="control">
                <input type="text" class="input" v-model="email" />
            </div>
        </div>
        <div class="column is-4">
            <label class="label">省份/直辖市</label>
            <div class="select is-fullwidth">
                <select v-model="province">
                    <option value="">- 请选择 -</option>
                    <option :value="item.name" v-for="item in provinces">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="column is-4">
            <label class="label">所在城市</label>
            <div class="select is-fullwidth">
                <select v-model="city" :disabled="cities.length <= 1 ? true : false">
                    <option value="">- 请选择 -</option>
                    <option :value="item.name" v-for="item in cities">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="column is-4">
            <label class="label">所在区/县</label>
            <div class="select is-fullwidth">
                <select v-model="suburb" :disabled="suburbs.length <= 1 ? true : false">
                    <option value="">- 请选择 -</option>
                    <option :value="item" v-for="item in suburbs">{{item}}</option>
                </select>
            </div>
        </div>
        <template v-if="member_type == 'normal'">
            <div class="column is-4">
                <label class="label">公司</label>
                <div class="control">
                    <input type="text" class="input" v-model="company" />
                </div>
            </div>
            <div class="column is-4">
                <label class="label">职称</label>
                <div class="control">
                    <input type="text" class="input" v-model="job_title" />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="column is-4">
                <label class="label">从事职业</label>
                <div class="control">
                    <input type="text" class="input" v-model="occupation" />
                </div>
            </div>
            <div class="column is-4">
                <label class="label">从业年龄</label>
                <div class="control">
                    <input type="number" min="0" max="100" class="input" v-model="years" />
                </div>
            </div>
        </template>
    </div>
    <ToggleUploader
        v-if="member_type == 'normal'"
        :id="'kennel-cert'"
        :source="kennel_cert"
        :title="'犬舍证'"
        :allowed_types="'.pdf,.jpg,.jpeg,.png,.doc,.docx'"
        :field_name="'kennel_cert'"
    />
    <ToggleUploader
        v-if="member_type == 'pro'"
        :id="'resume'"
        :source="resume"
        :title="'个人简历'"
        :allowed_types="'.pdf,.jpg,.jpeg,.png,.doc,.docx'"
        :field_name="'resume'"
    />
    <ToggleUploader
        v-if="member_type == 'pro'"
        :id="'cert'"
        :source="cert"
        :title="'资格证'"
        :allowed_types="'.pdf,.jpg,.jpeg,.png,.doc,.docx'"
        :field_name="'cert'"
    />
    <div class="actions field is-grouped is-grouped-right">
        <p class="help is-danger">以上所有内容均为真实内容，如若造假本人承担主要刑事责任。</p>
        <p class="control">
            <button type="submit" class="button is-primary">保存</button>
        </p>
    </div>
</form>
</template>

<script>
import PortraitUploader from '../elements/PortraitUploader';
import ToggleUploader from '../elements/ToggleUploader';
export default {
    name: 'FormBasic',
    props: {
        member_type: {
            type: String,
            default: 'normal'
        }
    },
    components: {
        PortraitUploader,
        ToggleUploader
    },
    data() {
        return {
            provinces: require('@/config/China'),
            fullname: null,
            nickname: null,
            mobile: null,
            wechat: null,
            email: null,
            identity: null,
            province: '',
            city: '',
            suburb: '',
            occupation: null,
            years: null,
            company: null,
            job_title: null,
            portrait: null,
            upload_queue: [],
            kennel_cert: {
                label   :   null,
                link    :   null,
                file    :   null,
                ext     :   null,
                delete  :   false
            },
            resume: {
                label   :   null,
                link    :   null,
                file    :   null,
                ext     :   null,
                delete  :   false
            },
            cert: {
                label   :   null,
                link    :   null,
                file    :   null,
                ext     :   null,
                delete  :   false
            }
        }
    },
    watch: {
        province(newVal, oldVal) {
            this.city = '';
            this.suburb = '';
        },
        city(newVal, oldVal) {
            this.suburb = '';
        }
    },
    computed: {
        cities() {
            if (!this.province || this.province.length == 0) {
                this.city = '';
                return [];
            }

            let cities = _.find(this.provinces, o => o.name == this.province).city;
            if (cities.length == 1) {
                this.city = cities[0].name;
            }

            return cities;
        },
        suburbs() {
            if (!this.city || this.city.length == 0) {
                this.suburb = '';
                return [];
            }

            let suburbs = _.find(this.cities, o => o.name == this.city).area;
            if (suburbs.length == 1) {
                this.suburb = suburbs[0];
            }

            return suburbs;
        }
    },
    created()   {
        this.$bus.$off('onQueueRemove');
        this.$bus.$on('onQueueRemove', this.remove_from_queue);
        this.$bus.$off('onQueueInsert');
        this.$bus.$on('onQueueInsert', this.add_to_queue);
        this.$bus.$off('onMembercheckedout');
        this.$bus.$off('onFileUploaded');
        this.$bus.$on('onMembercheckedout', this.prep);
        this.$bus.$on('onFileUploaded', this.exec_queue);
    },
    beforeDestroy() {
        this.$bus.$off('onQueueInsert');
        this.$bus.$off('onMembercheckedout');
        this.$bus.$off('onFileUploaded');
    },
    methods :   {
        remove_from_queue(uid) {
            _.remove(this.upload_queue, o => o._uid == uid);
        },
        add_to_queue(item) {
            let test    =   _.find(this.upload_queue, o => o._uid == item._uid);
            if (!test) {
                this.upload_queue.push(item);
            }
        },
        exec_queue() {
            if (this.upload_queue.length > 0) {
                let item    =   this.upload_queue.shift();
                item.do_upload();
            } else {
                this.save_data();
            }
        },
        prep(resp) {
            let me          =   this;

            this.fullname   =   resp.data.fullname;
            this.nickname   =   resp.data.nickname;
            this.mobile     =   resp.data.mobile;
            this.identity   =   resp.data.identity;
            this.wechat     =   resp.data.wechat;
            this.email      =   resp.data.email;
            this.province   =   resp.data.province;
            this.portrait   =   resp.data.portrait;

            if (resp.data.type == 'normal') {
                this.company    =   resp.data.company;
                this.job_title  =   resp.data.job_title;
                if (resp.data.kennel_cert) {
                    this.kennel_cert    =   resp.data.kennel_cert;
                } else if (this.kennel_cert) {
                    this.kennel_cert.label  =   null;
                    this.kennel_cert.link   =   null;
                    this.kennel_cert.file   =   null;
                    this.kennel_cert.delete =   false;
                    this.kennel_cert.ext    =   null;
                }
            } else {
                this.occupation =   resp.data.occupation;
                this.years      =   resp.data.years;
                if (resp.data.resume) {
                    this.resume =   resp.data.resume;
                } else if (this.resume) {
                    this.resume.label   =   null;
                    this.resume.link    =   null;
                    this.resume.file    =   null;
                    this.resume.delete  =   false;
                    this.resume.ext     =   null;
                }

                if (resp.data.cert) {
                    this.cert   =   resp.data.cert;
                } else if (this.cert) {
                    this.cert.label     =   null;
                    this.cert.link      =   null;
                    this.cert.file      =   null;
                    this.cert.delete    =   false;
                    this.cert.ext       =   null;
                }
            }

            this.$nextTick().then(() => {
                me.city     =   resp.data.city;
                me.$nextTick().then(() => {
                    me.suburb   =   resp.data.suburb;
                });
            });
        },
        submit(e) {
            e.preventDefault();
            this.upload_portrait();
        },
        save_data() {
            let data    =   new FormData(),
                me      =   this;
            data.append('csrf', csrf);
            data.append('fullname', this.fullname);
            data.append('nickname', this.nickname);
            data.append('mobile', this.mobile);
            data.append('identity', this.identity);
            data.append('wechat', this.wechat);
            data.append('email', this.email);

            if (this.province) {
                data.append('province', this.province);
            }

            if (this.city) {
                data.append('city', this.city);
            }

            if (this.suburb) {
                data.append('suburb', this.suburb);
            }


            if (this.member_type == 'normal') {
                data.append('company', this.company);
                data.append('jobtitle', this.job_title);
            } else {
                data.append('occupation', this.occupation);
                data.append('years', this.years);
            }

            if (this.kennel_cert.delete)  {
                data.append('delete_kennel', true);
            }

            if (this.resume.delete)  {
                data.append('delete_resume', true);
            }

            if (this.cert.delete)  {
                data.append('delete_cert', true);
            }

            axios.post(
                base_url + endpoints.member,
                data
            ).then((resp) => {
                me.prep(resp);
                me.$bus.$emit('Msgbox', '会员信息已更新!');
            }).catch((error) => {

            });
        },
        upload_portrait() {
            this.$bus.$emit('uploadPortrait');
        }
    }
}
</script>
