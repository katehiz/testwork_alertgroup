<template>
    <div>
        <button type="button" class="btn btn-secondary" v-on:click="loadRandomObject">Загрузить</button>
        <button type="button" class="btn btn-primary" v-on:click="saveObject">Отправить</button>
    </div>
</template>

<script>
    export default {
        name: 'actions-block',
        methods: {
            loadRandomObject() {
                this.$store.dispatch('loadObject');
            },
            saveObject() {
                this.$store.dispatch('saveObject');
            }
        }
    }
</script>

<style></style>