<template>
    <div class="participant">
        <div class="row form-group">
            <div class="col-sm-6">
                <div class="label-box">
                    <label :for="'p-name-' + user.id">Участник договора</label>
                    <span class="required-text">обязательное поле</span>
                </div>
                <div class="input-box">
                    <input type="text" class="form-element" placeholder="Иванов Иван Иванович"
                           v-bind:id="'p-name-' + user.id"
                           v-model="localUser.name">
                </div>
            </div>
            <div class="col-sm-6">
                <div class="label-box">
                    <label :for="'p-phone-' + user.id">Телефон</label>
                    <span class="required-text">обязательное поле</span>
                </div>
                <div class="input-box">
                    <input type="tel" ref="phone" class="form-element" placeholder="+7 900 00-00-000"
                           v-bind:id="'p-phone-' + user.id"
                           v-model="localUser.phone">
                    <button type="button" class="btn remove"
                            v-bind:data-user-id="user.id"
                            v-bind:disabled="successRemove !== true"
                            v-on:click="removeUser(user.id)">x</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Inputmask from 'inputmask';

    export default {
        name: "userForm",
        props: {
            user: {
                type: Object,
                required: true,
                default: () => {}
            },
            successRemove: Boolean
        },
        data(){
            return {
                localUser: Object.assign({}, this.user)
            }
        },
        mounted: function() {
            (() => {
                let im = new Inputmask("+7 999 99-99-999");
                if (!this.$refs.phone) return;
                im.mask(this.$refs.phone);
            })()
        },
        watch: {
            localUser: {
                deep: true,
                handler() {
                    if ( this.localUser !== this.user )
                        this.editUser()
                }
            }
        },
        methods: {
            editUser() {
                this.$emit('edited', Object.assign({}, this.localUser))
            },
            removeUser(userId) {
                this.$emit('remove', userId);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/utils/variables';

    .label-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: $spacer * 0.5;
    label {
        margin-bottom: 0;
    }
    }
    .input-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
    input + button {
        margin-left: 0.5rem;
    }
    }
</style>