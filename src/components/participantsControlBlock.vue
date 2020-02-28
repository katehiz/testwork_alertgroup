<template>
    <section class="section accordion toggled">
        <header class="section__head">
            <div class="section__title">Участники</div>
            <button type="button" class="section__toggle-btn">
                <img :src="'./src/assets/img/chevron-top.svg'">
            </button>
        </header>

        <main class="section__body">
            <user-form
                    v-for="(user, index) in users"
                    :key="index"
                    v-bind:successRemove="successRemove"
                    v-on:remove="removeUser"
                    v-on:edited="editUser"
                    v-bind:user="user"></user-form>
            <div class="actions">
                <button class="btn btn-secondary" v-on:click="addNewUser">Добавить участника</button>
                <button type="button" class="btn btn-info" v-on:click="resetAddedUsers">Очистить</button>
            </div>
        </main>
    </section>
</template>

<script>
    import userForm from './userForm.vue';
    import {Accordion} from '../assets/js/scripts.js';

    export default {
        name: 'participantsControlBlock',
        components: {
            'user-form': userForm
        },
        props: ['flat'],

        data: function() {
            return {
                users: []
            }
        },
        watch: {
            // обновляем локальное состояние
            flat: 'copyUsersToLocalState'
        },
        computed: {
            successRemove() {
                return this.users.length > 1
            }
        },
		mounted: function() {
            Accordion.init()
        },
        methods: {
            // добавление нового пользователя, объект с пустыми ключами
            addNewUser() {
                let userId = this.users.reduce( (acc, user) => {
                    let id = user.id ? user.id : 1;
                    acc.push(id);
                    return acc;
                }, []);
                userId = Math.max.apply(null, userId) + 1;

                this.users.push({
                    id: userId,
                    name: '',
                    phone: ''
                });
                this.updateGlobalStateUsers();
            },
            editUser(user) {
                console.log(user);
                let userId = user.id;
                // записываем в массив изменения
                let targetIndex = this.users.indexOf( this.users.find((user) =>user.id === userId) );
                this.users[targetIndex] = user;

                this.updateGlobalStateUsers()
            },
            removeUser(userId) {
                let findUser = this.users.find( (user) => user.id === userId );
                let index = this.users.indexOf(findUser);
                if (index !== -1) {
                    this.users.splice(index, 1);
                }
            },
            resetAddedUsers() {
                this.users = this.users.filter( (user) => user.name !== '' );
                this.updateGlobalStateUsers();
            },

            copyUsersToLocalState() {
                this.users = [...this.$props.flat.participants];
            },
            updateGlobalStateUsers() {
                this.$store.commit('updateUsersList', this.users)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .actions {
        display: flex;
        justify-content: space-between;
    }
</style>