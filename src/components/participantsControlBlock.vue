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
                    v-for="(user, index) in participants"
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
        data: function() {
            return {
                users: []
            }
        },
        computed: {
            participants: function(){
                return this.$store.getters.getUsers;
            },
            successRemove: function() {
                return this.$store.getters.getUsers.length > 1
            }
        },
		mounted: function() {
            Accordion.init();
        },
		watch: {
			// обновляем локальное состояние
            participants: 'copyUsersToLocalState',
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
                this.updateUsersInStorage();
            },
            editUser(user) {
                let userId = user.id;
                let targetIndex = this.users.indexOf( this.users.find((user) =>user.id === userId) );
                if (index == -1) return;
                this.users[targetIndex] = user;
                this.updateUsersInStorage();
            },
            removeUser(userId) {
                let findUser = this.users.find( (user) => user.id === userId );
                let index = this.users.indexOf(findUser);
                if (index == -1) return;
                this.users.splice(index, 1);
                this.updateUsersInStorage();
            },
            resetAddedUsers() {
                this.users = this.users.filter( (user) => user.name !== '' );
                this.updateUsersInStorage();
            },
            copyUsersToLocalState() {
                if (this.participants) {
                    this.users = this.participants;
                }
            },
            updateUsersInStorage() {
                this.$store.dispatch('UPDATE_USERS', this.users);
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