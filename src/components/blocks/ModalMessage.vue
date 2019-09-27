<template>
<div class="modal is-active" v-if="active">
    <div class="modal-background" @mousedown="close"></div>
    <div class="modal-card">
        <div :class="['message', 'is-' + type]">
            <div class="message-header">
                <p>{{title}}</p>
                <button class="delete" aria-label="delete" @click="close"></button>
            </div>
            <div class="message-body" v-html="content"></div>
            <div class="has-text-centered actions">
                <button :class="['button', 'is-' + type]" @click="yes_handler">{{buttons.yes.label}}</button>
                <button class="button" v-if="buttons.no.show" @click="close">{{buttons.no.label}}</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ModalMessage',
    data() {
        return {
            title: '我爱工作犬',
            active: false,
            content: null,
            type: 'success',
            buttons: {
                yes: {
                    label: 'OK',
                    show: true,
                    link: '#'
                },
                no: {
                    label: 'Cancel',
                    show: false,
                    link: '#'
                }
            }
        }
    },
    created() {
        this.$bus.$on('Msgbox', this.show);
    },
    beforeDestroy() {
        this.$bus.$off('Msgbox');
    },
    methods: {
        yes_handler(e) {
            e.preventDefault();
            if (this.buttons.yes.link && this.buttons.yes.link != '#') {
                this.$router.push(this.buttons.yes.link);
            }
            this.close();
        },
        show(message, goto, type, show_cancel, title) {
            if (title) {
                this.title = title;
            }

            if (show_cancel) {
                this.buttons.no.show    =   true;
                this.buttons.no.label   =   show_cancel.label;
            }

            if (type) {
                this.type   =   type;
            }

            this.content = message;
            if (goto) {
                this.buttons.yes.label = goto.label;
                this.buttons.yes.link = goto.link;
            }

            $(window).on('keydown', this.key_listener);
            this.active = true;
        },
        key_listener(e)
        {
            if (e.keyCode == 27 || e.keyCode == 13) {
                this.close();
            }
        },
        close(e) {
            if (e) {
                e.preventDefault();
            }

            this.title = '我爱工作犬';
            this.active = false;
            this.content = null;
            this.type   =   'success';

            this.buttons.yes.label = 'OK';
            this.buttons.yes.show = true;
            this.buttons.yes.link = '#';

            this.buttons.no.label = 'Cancel';
            this.buttons.no.show = false;
            this.buttons.no.link = '#';
            $(window).unbind('keydown', this.key_listener);
        }
    }
}
</script>
<style lang="scss" scoped>
    .actions {
        padding-bottom: 1rem;
    }
</style>
