<template>
<form id="member-form-puppy" method="post" @submit.prevent="submit">
    <h2 class="title is-5"><a class="button is-info is-small" @click.prevent="$router.go(-1);">返回</a> <template v-if="$route.params.id">编辑</template><template v-else>添加</template>犬只信息</h2>
    <BulkUploader :allowed_types="'.jpg,.jpeg,.png'" :endpoint="'dog'" :existing="dog_photos" />
    <h2 class="title is-5">基本信息</h2>
    <div class="columns is-multiline">
        <div class="column is-3">
            <label class="label">犬名字</label>
            <div class="control">
                <input class="input" type="text" v-model="dog_name" />
            </div>
        </div>
        <div class="column is-3">
            <label class="label">犬性别</label>
            <div class="select is-fullwidth">
                <select v-model="dog_gender">
                    <option value="null">- 请选择 -</option>
                    <option v-for="option in dog_genders" :value="option">{{option}}</option>
                </select>
            </div>
        </div>
        <div class="column is-3">
            <label class="label">犬年龄</label>
            <div class="control">
                <input class="input" type="date" v-model="dog_dob" />
            </div>
        </div>
        <div class="column is-3">
            <label class="label">品种</label>
            <div class="control">
                <input class="input" type="text" v-model="dog_breed" />
            </div>
        </div>
        <div class="column is-half">
            <label class="label">繁殖人</label>
            <div class="control">
                <input class="input" type="text" v-model="breeder" />
            </div>
        </div>
        <div class="column is-half">
            <label class="label">犬主人</label>
            <div class="control">
                <input class="input" type="text" v-model="dog_owner" />
            </div>
        </div>
    </div>
    <h2 class="title is-5">祖谱信息</h2>
    <div class="columns is-multiline">
        <div class="column">
            <div class="field-body">
                <div class="field is-half">
                    <label class="label">母犬</label>
                    <div v-if="!dog_mum" class="control has-condidate">
                        <input class="input" type="text" v-model="dog_mum_serial" @blur="reset_dog_mum_candi" />
                        <a class="candidate" v-if="dog_mum_candi" @click="dog_mum = dog_mum_candi; dog_mum_candi = null; dog_mum_serial = null;">
                            <div class="candidate-serial">芯片序列: {{dog_mum_candi.chip_no}}</div>
                            <div class="candidate-name">犬名: {{dog_mum_candi.title}}</div>
                        </a>
                    </div>
                    <div v-else class="control has-condidate">
                        <div class="candidate-serial">芯片序列: {{dog_mum.chip_no}}</div>
                        <div class="candidate-name">犬名: {{dog_mum.title}}</div>
                        <div class="candidate-action"><button @click.prevent="dog_mum = null;" class="button is-text">重新输入序列</button></div>
                    </div>
                    <p class="help is-danger" v-if="dog_mum_serial && chip_id && (dog_mum_serial == chip_id)">不可以添加自己为母犬!</p>
                    <p class="help" v-else-if="!dog_mum && dog_mum_serial && dog_mum_serial.trim().length > 0 && dog_mum_candi == null">暂无此序列对应的犬只. 继续提交系统将自动生成犬只记录.</p>
                </div>
                <div class="field is-half">
                    <label class="label">父犬</label>
                    <div v-if="!dog_dad" class="control has-condidate">
                        <input class="input" type="text" v-model="dog_dad_serial" @blur="reset_dog_dad_candi" />
                        <a class="candidate" v-if="dog_dad_candi" @click="dog_dad = dog_dad_candi; dog_dad_candi = null; dog_dad_serial = null;">
                            <div class="candidate-serial">芯片序列: {{dog_dad_candi.chip_no}}</div>
                            <div class="candidate-name">犬名: {{dog_dad_candi.title}}</div>
                        </a>
                    </div>
                    <div v-else class="control has-condidate">
                        <div class="candidate-serial">芯片序列: {{dog_dad.chip_no}}</div>
                        <div class="candidate-name">犬名: {{dog_dad.title}}</div>
                        <div class="candidate-action"><button @click.prevent="dog_dad = null;" class="button is-text">重新输入序列</button></div>
                    </div>
                    <p class="help is-danger" v-if="dog_dad_serial && chip_id && (dog_dad_serial == chip_id)">不可以添加自己为父犬!</p>
                    <p class="help" v-else-if="!dog_dad && dog_dad_serial && dog_dad_serial.trim().length > 0 && dog_dad_candi == null">暂无此序列对应的犬只. 继续提交系统将自动生成犬只记录.</p>
                </div>
            </div>
        </div>
    </div>
    <h2 class="title is-5">专业信息</h2>
    <div class="columns is-multiline">
        <div class="column is-3">
            <label class="label">芯片序号</label>
            <div class="control">
                <input class="input" type="text" v-model="chip_id" />
            </div>
        </div>
        <div class="column is-3">
            <label class="label">工作考核头衔</label>
            <div class="control">
                <input class="input" type="text" v-model="dog_title" />
            </div>
        </div>
        <div class="column is-3">
            <label class="label">DNA检测</label>
            <div class="select is-fullwidth">
                <select v-model="dna_tested">
                    <option :value="null">- 请选择 -</option>
                    <option value="是">是</option>
                    <option value="否">否</option>
                </select>
            </div>
        </div>
        <div class="column is-3">
            <label class="label">子嗣</label>
            <div class="control">
                <input class="input" type="text" v-model="has_descendent" />
            </div>
        </div>
    </div>
    <ToggleUploader
        :id="'dog-cert'"
        :source="dog_cert"
        :title="'鉴定证书'"
        :allowed_types="'.jpg,.jpeg,.png'"
        :field_name="'dog_cert'"
        :endpoint="'dog'"
    />
    <ToggleUploader
        :id="'he-inspection'"
        :source="he_inspection"
        :title="'髋肘检测记录'"
        :allowed_types="'.jpg,.jpeg,.png'"
        :field_name="'he_inspection'"
        :endpoint="'dog'"
    />
    <div class="columns">
        <div class="is-12 column">
            <label class="label">获奖记录</label>
            <div class="control">
                <textarea class="textarea" v-model="awards"></textarea>
            </div>
        </div>
    </div>
    <div class="actions field is-grouped is-grouped-right">
        <p class="help is-danger">以上所有内容均为必填内容，如若不知可填“无”。</p>
        <p class="control">
            <button type="submit" class="button is-primary">保存</button>
        </p>
    </div>
</form>
</template>

<script>
import BulkUploader from '@/components/blocks/elements/BulkUploader';
import ToggleUploader from '@/components/blocks/elements/ToggleUploader';
export default
{
    name        :   'FormPuppy',
    components  :   { BulkUploader, ToggleUploader },
    data()  {
        return  {
            is_loading      :   false,
            dog_id          :   this.$route.params.id,
            dog_name        :   null,
            dog_dob         :   null,
            dog_gender      :   null,
            dog_breed       :   null,
            breeder         :   null,
            dog_mum         :   null,
            dog_mum_serial  :   null,
            dog_mum_candi   :   null,
            dog_dad         :   null,
            dog_dad_serial  :   null,
            dog_dad_candi   :   null,
            dog_owner       :   null,
            chip_id         :   null,
            dog_title       :   null,
            dna_tested      :   null,
            has_descendent  :   false,
            awards          :   null,
            upload_queue    :   [],
            dog_cert        :   {
                                    label   :   null,
                                    link    :   null,
                                    file    :   null
                                },
            he_inspection   :   {
                                    label   :   null,
                                    link    :   null,
                                    file    :   null
                                },
            dog_genders     :   ['母', '公'],
            dog_photos      :   [],
            dog_breeds      :   require('@/config/breeds')
        }
    },
    created()   {
        this.$bus.$off('onQueueRemove');
        this.$bus.$on('onQueueRemove', this.remove_from_queue);
        this.$bus.$off('onQueueInsert');
        this.$bus.$on('onQueueInsert', this.add_to_queue);
        this.$bus.$off('onFileUploaded');
        this.$bus.$on('onFileUploaded', this.exec_queue);
        this.get();
    },
    beforeDestroy() {
        this.$bus.$off('onQueueRemove');
        this.$bus.$off('onQueueInsert');
        this.$bus.$off('onFileUploaded');
    },
    watch       :   {
        dog_mum_serial(nv, ov) {
            if (nv && nv.trim().length > 2) {
                this.lookup(nv, 'dog_mum');
            }
        },
        dog_dad_serial(nv, ov) {
            if (nv && nv.trim().length > 2) {
                this.lookup(nv, 'dog_dad');
            }
        }
    },
    methods     :   {
        reset_dog_mum_candi(e) {
            let me  =   this;
            setTimeout(function () {
                me.dog_mum_candi  =   null;
            }, 100);
        },
        reset_dog_dad_candi(e) {
            let me  =   this;
            setTimeout(function () {
                me.dog_dad_candi  =   null;
            }, 100);
        },
        lookup(serial, target) {
            let me      =   this,
                data    =   new FormData();

            data.append('serial', serial);
            if (target == 'dog_mum') {
                data.append('sex', '母');
            } else {
                data.append('sex', '公');
            }

            if (this.dog_id) {
                data.append('exclude', this.dog_id);
            }

            axios.post(
                base_url + endpoints.doglookup,
                data
            ).then((resp) => {
                me[target + '_candi']  =   resp.data;
            });
        },
        remove_from_queue(uid) {
            _.remove(this.upload_queue, o => o._uid == uid);
        },
        add_to_queue(item) {
            let test    =   _.find(this.upload_queue, o => o._uid == item._uid);
            if (!test) {
                this.upload_queue.push(item);
            }
        },
        remove_from_photos(id) {
            _.remove(this.dog_photos, o => o.id == id);
            this.$set(this.dog_photos, this.dog_photos);
        },
        exec_queue(id) {
            if (this.upload_queue.length > 0) {
                let item    =   this.upload_queue.shift();
                item.do_upload(id);
            } else {
                this.prompt_completion();
            }
        },
        prompt_completion() {
            if (!this.$route.params.id) {
                this.$router.push('/member/breed');
            } else {
                this.$bus.$emit('Msgbox', '犬只信息已更新!');
            }
        },
        prep(resp) {
            this.dog_id         =   resp.data.id;
            this.dog_name       =   resp.data.title;
            this.awards         =   resp.data.content;
            this.dog_dob        =   resp.data.dob;
            this.dog_gender     =   resp.data.sex;
            this.dog_breed      =   resp.data.breed;
            this.breeder        =   resp.data.breeder;
            this.dog_owner      =   resp.data.owned_by;
            this.chip_id        =   resp.data.chip_no;
            this.dog_title      =   resp.data.job_title;
            if (resp.data.dna && resp.data.dna.length > 0) {
                this.dna_tested     =   resp.data.dna;
            } else {
                this.dna_tested     =   null;
            }

            if (resp.data.cert_copy) {
                this.dog_cert   =   resp.data.cert_copy;
            } else {
                this.dog_cert   =   {
                                        label   :   null,
                                        link    :   null,
                                        file    :   null
                                    };
            }

            if (resp.data.he_insp) {
                this.he_inspection  =   resp.data.he_insp;
            } else {
                this.he_inspection  =   {
                                            label   :   null,
                                            link    :   null,
                                            file    :   null
                                        };
            }

            if (resp.data.photos) {
                this.dog_photos =   resp.data.photos;
            }

            if (resp.data.dog_mum) {
                this.dog_mum    =   resp.data.dog_mum;
            }

            if (resp.data.dog_dad) {
                this.dog_dad    =   resp.data.dog_dad;
            }
        },
        get() {
            if (this.dog_id) {
                axios.get(
                    base_url + endpoints.dog + '/' + this.dog_id
                ).then(this.prep);
            }
        },
        submit(e) {
            if (e) {
                e.preventDefault();
            }

            if (this.is_loading) return false;
            this.is_loading =   false;

            let me      =   this,
                data    =   new FormData();

            data.append('Title', this.dog_name);
            data.append('Sex', this.dog_gender);
            data.append('DoB', this.dog_dob);
            data.append('ChipsSerial', this.chip_id);
            data.append('Content', this.awards);
            // data.append('CertNumber', this.);
            data.append('JobTitle', this.dog_title);
            data.append('DNA', this.dna_tested);
            // data.append('ReproTest', this.);
            data.append('Breeder', this.breeder);
            data.append('OwnedBy', this.dog_owner);
            data.append('Breed', this.dog_breed);

            if (this.dog_mum) {
                data.append('dog_mum', JSON.stringify({
                    id : this.dog_mum.id
                }));
            } else if (this.dog_mum_serial) {
                data.append('dog_mum', JSON.stringify({
                    serial : this.dog_mum_serial
                }));
            }

            if (this.dog_dad) {
                data.append('dog_dad', JSON.stringify({
                    id : this.dog_dad.id
                }));
            } else if (this.dog_dad_serial) {
                data.append('dog_dad', JSON.stringify({
                    serial : this.dog_dad_serial
                }));
            }


            if (this.dog_cert.delete)  {
                data.append('delete_dog_cert', true);
            }

            if (this.he_inspection.delete)  {
                data.append('delete_he_inspection', true);
            }

            axios.post(
                base_url + endpoints.dog + (this.dog_id ? ('/' + this.dog_id) : ''),
                data
            ).then((resp) => {
                me.$bus.$emit('onBulkUploadStart', resp.data.id);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.control {
    &.has-condidate {
        position: relative;
    }
}

.field-body {
    .field {
        &.is-half {
            width: 50%;
        }
    }
}
</style>
