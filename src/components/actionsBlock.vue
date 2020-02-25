<template>
    <div>
        <button type="button" class="btn btn-secondary" v-on:click="loadRandomObject">Загрузить</button>
        <button type="button" class="btn btn-primary">Отправить</button>
    </div>
</template>

<script>
    export default {
        name: 'actions-block',
        methods: {
            loadRandomObject() {
                this.$store.dispatch('loadObject');
            }
        }
    }
</script>

<style></style>